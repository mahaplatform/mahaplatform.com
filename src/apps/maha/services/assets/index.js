import formatObjectForTransport from '@core/utils/format_object_for_transport'
import { getScreenshot } from '@core/services/screenshot'
import AssetSerializer from '@apps/maha/serializers/asset_serializer'
import ProcessAssetQueue from '@apps/maha/queues/process_asset_queue'
import ScanAssetQueue from '@apps/maha/queues/scan_asset_queue'
import Clamscan from '@core/services/clamscan'
import socket from '@core/services/emitter'
import { simpleParser } from 'mailparser'
import Source from '@apps/maha/models/source'
import Asset from '@apps/maha/models/asset'
import request from 'request-promise'
import { exec } from 'child_process'
import fileType from 'file-type'
import * as local from './local'
import { Duplex } from 'stream'
import mime from 'mime-types'
import * as aws from './aws'
import crypto from 'crypto'
import sharp from 'sharp'
import path from 'path'
import _ from 'lodash'
import Url from 'url'
import fs from 'fs'

const simpleParserAsync = Promise.promisify(simpleParser)

const execAsync = Promise.promisify(exec)

export const checkUploadedFile = async (req) => {
  const chunkFilename = _getChunkFilename(req.query.resumableIdentifier, req.query.resumableChunkNumber)
  const exists = await _chunkExists(chunkFilename)
  if(!exists) return false
  const asset = await Asset.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('original_file_name', req.query.resumableFilename)
    qb.where('file_size', req.query.resumableTotalSize)
  }).fetch({
    transacting: req.trx
  })
  return asset
}

export const uploadChunk = async (req) => {
  const identifier = _cleanIdentifier(req.body.resumableIdentifier)
  const chunkFilename = _getChunkFilename(identifier, req.body.resumableChunkNumber)
  fs.renameSync(req.files['file'].path, chunkFilename)
  const filedata = fs.readFileSync(chunkFilename)
  await _saveChunk(filedata, chunkFilename, 'application/octet-stream')
  const chunks = await _listChunks()
  const chunkArray = [...Array(parseInt(req.body.resumableTotalChunks))]
  const completed = chunkArray.reduce((completed, chunk, index) => {
    return completed ? _.includes(chunks, _getChunkFilename(identifier, index + 1)) : false
  }, true)
  if(!completed) return null
  const asset = await Asset.forge({
    team_id: req.team.get('id'),
    user_id: req.user ? req.user.get('id') : null,
    source_id: 1,
    original_file_name: req.body.resumableFilename,
    file_name: _getNormalizedFileName(req.body.resumableFilename),
    content_type: req.body.resumableType,
    file_size: req.body.resumableTotalSize,
    chunks_total: req.body.resumableTotalChunks,
    status: 'chunked'
  }).save(null, {
    transacting: req.trx
  })
  if(!asset) throw new Error('Unable to create asset')
  await assembleAsset(req, asset)
  return asset
}

export const createAssetFromUrl = async (req, params) => {
  const { url, team_id, user_id } = params
  const response = await request.get({
    url,
    resolveWithFullResponse: true,
    encoding: null,
    strictSSL: false
  }).promise().then(response => response.toJSON())
  const parsed = Url.parse(url)
  const source = await Source.where({
    text: params.source || 'web'
  }).fetch({
    transacting: req.trx
  })
  return await createAsset(req, {
    team_id: (req.team) ? req.team.get('id') : team_id,
    user_id: (req.user) ? req.user.get('id') : user_id,
    source_id: source.get('id'),
    file_size: response.headers['content-length'],
    file_name: path.basename(parsed.pathname),
    file_data: response.body,
    content_type: response.headers['content-type']
  }, req.trx)
}

export const assembleAsset = async (req, asset) => {
  const fileData = await _getAssembledData(asset)
  const normalizedData = await _getNormalizedData(asset, fileData)
  await _saveFile(normalizedData, `assets/${asset.get('id')}/${asset.get('file_name')}`, asset.get('content_type'))
  await _deleteChunks(asset)
  const metadata = await _getMetadata(asset.get('content_type'), normalizedData)
  await _saveAsset(req, asset, {
    fingerprint: _getFingerprint(normalizedData),
    status: asset.get('has_preview') ? 'assembled' : 'processed',
    ...metadata
  })
  if(asset.get('has_preview')) await ProcessAssetQueue.enqueue(req, {
    id: asset.get('id')
  })
  await ScanAssetQueue.enqueue(req, {
    id: asset.get('id')
  })
}

export const processAsset = async (req, id) => {
  const asset = await _fetchAsset(req,  id)
  const fileData = await getAssetData(asset)
  await _processAsset(req, fileData, asset)
}

export const createAsset = async (req, params) => {
  const data = {
    team_id: params.team_id,
    user_id: params.user_id,
    source_id: params.source_id,
    source_identifier: params.source_identifier,
    source_url: params.source_url,
    original_file_name: params.file_name,
    file_name: _getNormalizedFileName(params.file_name),
    fingerprint: _getFingerprint(params.file_data),
    content_type: params.content_type || _getFileType(params.file_data, params.file_name),
    file_size: !_.isNil(params.file_size) ? params.file_size : _getFilesize(params.file_data),
    chunks_total: 1,
    status: params.file_data && params.file_data.length > 0 ? 'assembled' : 'processed'
  }
  const metadata = await _getMetadata(data.content_type, params.file_data)
  const asset = await Asset.forge({
    ...data,
    ...metadata
  }).save(null, {
    transacting: req.trx
  })
  if(!params.file_data || params.file_data.length === 0) return asset
  await _saveFiledata(req, asset, params.file_data)
  return asset
}

export const renameAsset = async (req, asset, params) => {
  await _saveAsset(req, asset, {
    original_file_name: params.file_name
  })
}

export const updateAsset = async (req, asset, params) => {
  if(!params.file_data || params.file_data.length === 0) return asset
  await _saveAsset(req, asset, {
    file_size: params.file_size || _getFilesize(params.file_data),
    chunks_total: 1,
    status: 'assembled'
  })
  await _saveFiledata(req, asset, params.file_data)
  return asset
}

export const deleteAsset = async (req, asset) => {
  const files = [`assets/${asset.get('id')}/${asset.get('file_name')}`]
  if(asset.get('has_preview')) files.push(`assets/${asset.get('id')}/preview.jpg`)
  await _deleteFiles(files)
  await asset.destroy({
    transacting: req.trx
  })
}

export const getAssetData = async (asset, format = 'buffer') => {
  const key = `assets/${asset.get('id')}/${asset.get('file_name')}`
  const data = await aws.readFile(key)
  if(format === 'stream') return _bufferToStream(data)
  if(format === 'string') return data.toString('utf-8')
  return data
}

export const getPDFData = async (asset) => {
  const data = await aws.readFile(asset.get('key'))
  if(asset.get('extension') === 'pdf') return data
  return await _convertOfficeFormat(data, 'pdf')
}

export const scanAsset = async (req, id) => {
  const clamscan = await Clamscan
  const asset = await _fetchAsset(req, id)
  const filePath = _getTmpPath()
  const fileData = await getAssetData(asset)
  fs.writeFileSync(filePath, fileData)
  const scan = await clamscan.is_infected(filePath)
  const { is_infected, viruses } = scan.is_infected
  fs.unlinkSync(filePath)
  await _saveAsset(req, asset, { is_infected, viruses })
}

const _refreshAsset = async (req, asset) => {
  await socket.in(`/admin/assets/${asset.get('id')}`).emit('message', {
    target: `/admin/assets/${asset.get('id')}`,
    action: 'refresh',
    data: formatObjectForTransport(AssetSerializer(null, asset))
  })
}

const _fetchAsset = async (req, id) => {
  const asset = await Asset.query(qb => {
    qb.where('id', id)
  }).fetch({
    transacting: req.trx
  })
  if(!asset) throw new Error('Unable to find asset' )
  return asset
}

const _saveAsset = async (req, asset, params) => {
  await asset.save(params, {
    patch: true,
    transacting: req.trx
  })
}

const _saveFiledata = async (req, asset, file_data) => {
  const normalizedData = await _getNormalizedData(asset, file_data)
  await _saveFile(normalizedData, `assets/${asset.get('id')}/${asset.get('file_name')}`, asset.get('content_type'))
  if(asset.get('has_preview')) {
    await ProcessAssetQueue.enqueue(req, {
      id: asset.get('id')
    })
  } else {
    await _saveAsset(req, asset, {
      status: 'processed'
    })
  }
  await ScanAssetQueue.enqueue(req, {
    id: asset.get('id')
  })
}

const _processAsset = async (req, data, asset) => {
  if(asset.get('file_name').substr(0,2) !== '._' && asset.get('has_preview')) {
    const previewData = await _getPreviewData(asset, data, 'jpg')
    await _saveFile(previewData, `assets/${asset.get('id')}/preview.jpg`, 'image/jpeg')
  }
  await _saveAsset(req, asset, {
    status: 'processed'
  })
  await _refreshAsset(req, asset)
}

const _getMetadata = async (content_type, data) => {
  if(!content_type.match(/(jpeg|jpg|gif|png)/)) return {}
  const metadata = await sharp(data).metadata()
  return {
    width: metadata.width,
    height: metadata.height
  }
}

const _getNormalizedData = async (asset, fileData) => {
  const content_type = asset.get('content_type') || ''
  const isImage = content_type.match(/(jpeg|jpg|gif|png)/) && content_type !== 'image/gif'
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
  return await local.listFiles('tmp')
}

const _saveChunk = async (filedata, filepath, content_type) => {
  return await local.saveFile(filedata, filepath, content_type)
}

const _saveFile = async (filedata, filepath, content_type) => {
  return await aws.saveFile(filedata, filepath, content_type)
}

const _deleteFiles = async (files) => {
  return await aws.deleteFiles(files)
}

const _getTmpPath = () => {
  const random = _.random(100000000, 999999999).toString(36)
  return path.join('tmp', random)
}

const _getFileType = (file_data, file_name) => {
  if(file_data && typeof file_data !== 'string') {
    const type = fileType(file_data)
    return type ? type.mime : 'text/plain'
  } else {
    return mime.lookup(file_name) || 'text/plain'
  }
}

const _getFingerprint = (data) => {
  if(!data) return null
  return crypto.createHash('md5').update(data).digest('hex')
}

const _getFilesize = (fileData) => {
  const filePath = _getTmpPath()
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
    return await local.readFile(path.join('tmp', `${asset.get('identifier')}.${index + 1}`))
  })
}

const _deleteChunks = async (asset) => {
  const totalChunks = parseInt(asset.get('chunks_total'))
  const chunkArray = [...Array(parseInt(totalChunks))]
  const filepaths = chunkArray.map((i, index) => {
    return _getChunkFilename(asset.get('identifier'), index + 1)
  })
  local.deleteFiles(filepaths)
}

const _bufferToStream = (buffer) => {
  let stream = new Duplex()
  stream.push(buffer)
  stream.push(null)
  return stream
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
  const outDir = path.join('tmp')
  const filePath = _getTmpPath()
  const previewPath = `${filePath}.preview.${format}`
  fs.writeFileSync(filePath, filedata)
  await execAsync(`soffice --convert-to preview.${format} --outdir ${outDir} ${filePath}`)
  const previewData = new Buffer(fs.readFileSync(previewPath), 'binary')
  fs.unlinkSync(filePath)
  fs.unlinkSync(previewPath)
  return previewData
}

const _convertHtml = async (html) => {
  return await getScreenshot({ html })
}

const _cleanIdentifier = identifier => {
  return identifier.replace(/^0-9A-Za-z_-/img, '')
}

const _getChunkFilename = (identifier, chunkNumber, ) => {
  return path.join('tmp', `${_cleanIdentifier(identifier)}.${chunkNumber}`)
}
