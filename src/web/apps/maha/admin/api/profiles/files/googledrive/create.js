import { createAsset } from '../../../../../services/assets'
import { getClient } from '../../services/google'
import Source from '../../../../../models/source'
import mime from 'mime-types'

const _getMime = (type) => {
  if(type === 'application/vnd.google-apps.spreadsheet') {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  } else if(type === 'application/vnd.google-apps.document') {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  } else if(type === 'application/vnd.google-apps.presentation') {
    return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  } else if(type === 'application/vnd.google-apps.drawing') {
    return 'image/jpeg'
  } else {
    return type
  }
}

const _withExt = (filename, type) => {
  const matches = filename.match(/(.*)\.(.*)/)
  const basename = (matches === null) ? filename : matches[1]
  return `${basename}.${_getExt(type)}`
}

const _getExt = (type) => {
  if(type === 'application/vnd.google-apps.spreadsheet') {
    return 'xlsx'
  } else if(type === 'application/vnd.google-apps.document') {
    return 'docx'
  } else if(type === 'application/vnd.google-apps.presentation') {
    return 'pptx'
  } else if(type === 'application/vnd.google-apps.drawing') {
    return 'jpg'
  } else {
    return mime.extension(type)
  }
}

const createRoute = async (req, profile) => {

  const client = await getClient(req, profile, 'drive')

  const meta = await client.files.get({
    fileId: req.body.id,
    fields: 'id, name, mimeType, webViewLink'
  })

  const _export = async (fileId, mime_type) => {
    return await client.files.export({
      fileId,
      mimeType: _getMime(mime_type)
    }, {
      responseType: 'buffer'
    })
  }

  const _get = async (fileId) => {
    return await client.files.get({
      fileId,
      alt: 'media'
    }, {
      responseType: 'buffer'
    })
  }

  const file = meta.data.mimeType.match(/google/) ? await _export(req.body.id, meta.data.mimeType) : await _get(req.body.id)

  const source = await Source.where({
    text: 'googledrive'
  }).fetch({
    transacting: req.trx
  })

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    source_identifier: req.body.id,
    source_url: meta.data.mimeType.match(/google/) ? meta.data.webViewLink : null,
    file_name: _withExt(meta.data.name, meta.data.mimeType),
    file_data: file.data,
    content_type: file.headers['content-type']
  })

  return asset

}

export default createRoute
