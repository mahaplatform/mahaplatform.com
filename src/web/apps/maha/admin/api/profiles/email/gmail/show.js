import { getClient } from './utils'
import _ from 'lodash'

const getBodyParts = (message) => {

  const bodyPart = message.data.payload.parts.find(part => {
    return part.mimeType === 'multipart/alternative'
  })

  return bodyPart ? bodyPart.parts : message.data.payload.parts

}

const getAttachments = (message) => {
  return message.data.payload.parts.filter(part => {
    return part.filename.length > 0
  }).map(part => ({
    filename: part.filename,
    body: part.body.attachmentId
  }))
}

const getPart = (bodyParts, mimeType) => {

  const part = bodyParts.find(part => {
    return part.mimeType === mimeType
  })

  return part ? Buffer.from(part.body.data, 'base64').toString() : null

}

const show = async (req, profile) => {

  const gmail = await getClient(req, profile)

  const message = await gmail.users.messages.get({
    format: 'full',
    userId: 'me',
    id: req.params.id
  })

  const details = message.data.payload.headers.reduce((details, header) => {
    const { name, value } = header
    if(!_.includes(['Date','From','To','Subject'], name)) return details
    return {
      ...details,
      [name.toLowerCase()]: value
    }
  }, {})

  const bodyParts = getBodyParts(message)

  return {
    ...details,
    html: getPart(bodyParts, 'text/html'),
    text: getPart(bodyParts, 'text/plain'),
    attachments: getAttachments(message)
  }

}

export default show
