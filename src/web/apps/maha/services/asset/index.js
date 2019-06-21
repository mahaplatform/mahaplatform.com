import formatObjectForTransport from '../../../../core/utils/format_object_for_transport'
import AssembleAssetQueue from '../../queues/assemble_asset_queue'
import AssetSerializer from '../../serializers/asset_serializer'
import ProcessAssetQueue from '../../queues/process_asset_queue'
import socket from '../../../../core/services/emitter'
import { simpleParser } from 'mailparser'
import Source from '../../models/source'
import request from 'request-promise'
import { exec } from 'child_process'
import Asset from '../../models/asset'
import * as local from './local'
import { Duplex } from 'stream'
import webshot from 'webshot'
import mime from 'mime-types'
import * as aws from './aws'
import sharp from 'sharp'
import path from 'path'
import _ from 'lodash'
import Url from 'url'
import fs from 'fs'

const backend = process.env.ASSET_STORAGE === 's3' ? aws : local

const simpleParserAsync = Promise.promisify(simpleParser)

const execAsync = Promise.promisify(exec)

export const checkUploadedFile = async (req, trx) => {
  const chunkFilename = _getChunkFilename(req.query.resumableIdentifier, req.query.resumableChunkNumber)
  return await _chunkExists(chunkFilename)
}

export const uploadChunk = async (req, trx) => {
  const identifier = _cleanIdentifier(req.body.resumableIdentifier)
  const chunkFilename = _getChunkFilename(identifier, req.body.resumableChunkNumber)
  fs.renameSync(req.files['file'].path, chunkFilename)
  const filedata = fs.readFileSync(chunkFilename)
  await _saveFile(filedata, chunkFilename, 'application/octet-stream')
  await _unlinkChunk(chunkFilename)
  const chunks = await _listChunks()
  const chunkArray = [...Array(parseInt(req.body.resumableTotalChunks))]
  const completed = chunkArray.reduce((completed, chunk, index) => {
    return completed ? _.includes(chunks, _getChunkFilename(identifier, index + 1)) : false
  }, true)
  if(!completed) return 'partly_done'
  const asset = await Asset.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: 1,
    original_file_name: req.body.resumableFilename,
    file_name: _getNormalizedFileName(req.body.resumableFilename),
    content_type: req.body.resumableType,
    file_size: req.body.resumableTotalSize,
    chunks_total: req.body.resumableTotalChunks,
    status: 'chunked'
  }).save(null, { transacting: trx })
  if(!asset) throw new Error('Unable to create asset')
  await AssembleAssetQueue.enqueue(req, asset.get('id'))
  return AssetSerializer(req, asset)
}

export const createAssetFromUrl = async (req, trx, url, team_id, user_id) => {
  const response = await request.get({
    url,
    resolveWithFullResponse: true,
    encoding: null
  }).promise().then(response => response.toJSON())
  const parsed = Url.parse(url)
  const source = await Source.where({
    text: 'web'
  }).fetch({
    transacting: trx
  })
  const asset = await createAsset({
    team_id: (req.team) ? req.team.get('id') : team_id,
    user_id: (req.team) ? req.user.get('id') : user_id,
    source_id: source.get('id'),
    file_size: response.headers['content-length'],
    file_name: path.basename(parsed.pathname),
    file_data: response.body,
    content_type: response.headers['content-type']
  }, trx)
  return asset
}

export const assembleAsset = async (id, trx) => {
  const asset = await Asset.where({ id }).fetch({
    transacting: trx
  })
  if(!asset) throw new Error('Unable to find asset' )
  const fileData = await _getAssembledData(asset)
  const normalizedData = await _getNormalizedData(asset, fileData)
  await _saveFile(normalizedData, `assets/${asset.get('id')}/${asset.get('file_name')}`, asset.get('content_type'))
  await _deleteChunks(asset)
  await asset.save({
    status: asset.get('has_preview') ? 'assembled' : 'processed'
  }, {
    transacting: trx
  })
  if(asset.get('has_preview')) await ProcessAssetQueue.enqueue(null, asset.get('id'))
  await socket.in(`/admin/assets/${asset.get('id')}`).emit('message', {
    target: `/admin/assets/${asset.get('id')}`,
    action: 'refresh',
    data: formatObjectForTransport(AssetSerializer(null, asset))
  })
}

export const processAsset = async (id, trx) => {
  const asset = await Asset.where({ id }).fetch({
    transacting: trx
  })
  if(!asset) throw new Error('Unable to find asset' )
  const fileData = await getAssetData(asset)
  const previewData = await _getPreviewData(asset, fileData, 'jpg')
  await _saveFile(previewData, `assets/${asset.get('id')}/preview.jpg`, 'image/jpeg')
  await asset.save({
    status: 'processed'
  }, {
    transacting: trx
  })
  await socket.in(`/admin/assets/${asset.get('id')}`).emit('message', {
    target: `/admin/assets/${asset.get('id')}`,
    action: 'refresh',
    data: formatObjectForTransport(AssetSerializer(null, asset))
  })
}

export const getAsset = async (id, trx) => {
  const asset = await Asset.where({ id }).fetch({ transacting: trx })
  if(!asset) throw new Error('Unable to find asset' )
  return await getAssetData(asset)
}

export const createAsset = async (params, trx) => {
  const asset = await Asset.forge({
    team_id: params.team_id,
    user_id: params.user_id,
    source_id: params.source_id,
    source_identifier: params.source_identifier,
    source_url: params.source_url,
    original_file_name: params.file_name,
    file_name: _getNormalizedFileName(params.file_name),
    content_type: params.content_type || _getContentType(params.file_name),
    file_size: params.file_size !== null ? params.file_size : _getFilesize(params.file_data),
    chunks_total: 1,
    status: 'assembled'
  }).save(null, {
    transacting: trx
  })
  if(params.file_data) {
    await _saveFildata(asset, params.file_data)
  }
  await asset.save({
    status: 'processed'
  }, {
    transacting: trx
  })
  return asset
}

export const updateAsset = async (req, asset, params) => {
  await asset.save({
    file_size: params.file_size || _getFilesize(params.file_data),
    chunks_total: 1,
    status: 'assembled'
  }, {
    patch: true,
    transacting: req.trx
  })
  if(params.file_data) {
    await _saveFildata(asset, params.file_data)
  }
  await asset.save({
    status: 'processed'
  }, {
    transacting: req.trx
  })
  return asset
}

export const deleteAsset = async (asset, trx) => {
  const files = [`assets/${asset.get('id')}/${asset.get('file_name')}`]
  if(asset.get('has_preview')) files.push(`assets/${asset.get('id')}/preview.jpg`)
  await _deleteFiles(files)
  await asset.destroy({ transacting: trx })
}

export const getAssetData = async (asset, format = 'buffer') => {
  const key = `assets/${asset.get('id')}/${asset.get('file_name')}`
  const data = await backend.readFile(key)
  if(format === 'stream') return _bufferToStream(data)
  if(format === 'string') return data.toString('utf-8')
  return data
}

const _saveFildata = async (asset, file_data) => {
  const normalizedData = await _getNormalizedData(asset, file_data)
  await _saveFile(normalizedData, `assets/${asset.get('id')}/${asset.get('file_name')}`, asset.get('content_type'))
  if(asset.get('content_type').match(/image/) !== null) return
  if(asset.get('content_type').match(/octet/) !== null) return
  const previewData = await _getPreviewData(asset, normalizedData, 'jpg')
  await _saveFile(previewData, `assets/${asset.get('id')}/preview.jpg`, 'image/jpeg')
}

const _getNormalizedData = async (asset, fileData) => {
  const content_type = asset.get('content_type')
  const isImage = content_type.match(/image/) && content_type !== 'image/gif'
  return isImage ? await _rotateImage(fileData) : fileData
}

const _rotateImage = async (data) => {
  return await sharp(data).withMetadata().rotate().toBuffer()
}

const _chunkExists = async (filepath) => {
  const chunks = await _listChunks()
  return _.includes(chunks, filepath)
}

const _listChunks = async () => {
  return await backend.listFiles('tmp')
}

const _saveFile = async (filedata, filepath, content_type) => {
  return await backend.saveFile(filedata, filepath, content_type)
}

const _deleteFiles = async (files) => {
  return await backend.deleteFiles(files)
}

const _getContentType = (file_name) => {
  return mime.lookup(file_name)
}

const _getFilesize = (fileData) => {
  const random = _.random(100000000, 999999999).toString(36)
  const filePath = path.join('tmp', random)
  fs.writeFileSync(filePath, fileData)
  const fileStats = fs.statSync(filePath)
  fs.unlinkSync(filePath)
  return fileStats.size
}

export const _getNormalizedFileName = (filename) => {
  const matches = filename.toLowerCase().match(/^(.*)\.([^?]*)\??(.*)$/)
  const basename = matches && matches[1] ? matches[1] : filename.toLowerCase()
  const extension = matches && matches[1] ? matches[2] : null
  const rewritten = basename.replace(/[^0-9a-zA-Z-\s_.]/img, '').replace(/[\W_]/img, '-').replace(/-{2,}/g, '-')
  return rewritten + (extension ? `.${extension}` : '')
}

const _getAssembledData = async (asset) => {
  const chunks = await _getChunks(asset)
  return Buffer.concat(chunks)
}

const _getChunks = async (asset) => {
  const totalChunks = parseInt(asset.get('chunks_total'))
  const chunkArray = [...Array(parseInt(totalChunks))]
  return await Promise.mapSeries(chunkArray, async (item, index) => {
    return await backend.readFile(path.join('tmp', `${asset.get('identifier')}.${index + 1}`))
  })
}

const _deleteChunks = async (asset) => {
  const totalChunks = parseInt(asset.get('chunks_total'))
  const chunkArray = [...Array(parseInt(totalChunks))]
  const filepaths = chunkArray.map((i, index) => {
    return _getChunkFilename(asset.get('identifier'), index + 1)
  })
  backend.deleteFiles(filepaths)
}

const _bufferToStream = (buffer) => {
  let stream = new Duplex()
  stream.push(buffer)
  stream.push(null)
  return stream
}

const _unlinkChunk = async (filepath) => {
  fs.unlinkSync(filepath)
}

const _getPreviewData = async (asset, fileData, ext) => {
  if(asset.get('extension') === 'xlsx') {
    const pdfData = await _convertOfficeFormat(fileData, 'pdf')
    return await _convertOfficeFormat(pdfData, 'jpg')
  }
  if(asset.get('content_type') === 'message/rfc822') {
    const email = await simpleParserAsync(fileData)
    const emailData = email.html || email.textAsHtml
    return _convertHtml(emailData)
  }
  if(asset.get('content_type') === 'text/html') {
    return _convertHtml(fileData)
  }
  return await _convertOfficeFormat(fileData, 'jpg')
}

const _convertOfficeFormat = async (filedata, format) => {
  const random = _.random(100000000, 999999999).toString(36)
  const outDir = path.join('.', 'tmp')
  const filePath = path.join(outDir, random)
  const previewPath = path.join(outDir, `${random}.preview.${format}`)
  fs.writeFileSync(filePath, filedata)
  await execAsync(`soffice --convert-to preview.${format} --outdir ${outDir} ${filePath}`)
  const previewData = new Buffer(fs.readFileSync(previewPath), 'binary')
  fs.unlinkSync(filePath)
  fs.unlinkSync(previewPath)
  return previewData
}

const _convertHtml = async (html) => {
  return await new Promise((resolve, reject) => {
    const ws = webshot(html, {
      siteType:'html',
      streamType: 'jpg',
      defaultWhiteBackground: true,
      shotSize: {
        width: 'window',
        height: 'all'
      }
    })
    const buffer = []
    ws.on('data', data => buffer.push(data))
    ws.on('error', err => reject(new Error(err)))
    ws.on('end', () => resolve(Buffer.concat(buffer)))
  })
}

const _cleanIdentifier = identifier => {
  return identifier.replace(/^0-9A-Za-z_-/img, '')
}

const _getChunkFilename = (identifier, chunkNumber, ) => {
  return path.join('tmp', `${_cleanIdentifier(identifier)}.${chunkNumber}`)
}
