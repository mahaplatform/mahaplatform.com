import { getClient } from '../../services/google'
import addrparser from 'address-rfc2822'
import _ from 'lodash'

const parseEmail = (address) => {
  const aprts = addrparser.parse(address)[0]
  return {
    rfc822: address,
    name: aprts.phrase,
    address: aprts.address
  }
}

const getValue = (name, value) => {
  if(_.includes(['Date','Subject'], name)) return value
  if(_.includes(['To','Cc','Bcc'], name)) return value.split(', ').map(parseEmail)
  return parseEmail(value)
}

const getBodyParts = (message) => {

  const parts = message.data.payload.parts || [message.data.payload]

  const bodyPart = parts.find(part => {
    return part.mimeType === 'multipart/alternative'
  })

  return bodyPart ? bodyPart.parts : parts

}

const getAttachments = (message) => {
  if(!message.data.payload.parts) return []
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

const list = (type) => async (req, profile) => {

  const client = await getClient(req, profile, 'gmail')

  const pageToken = _.get(req, 'query.$page.next')

  const email = req.query.email

  const label = type === 'sent' ? 'to' : 'from'

  const result = await client.users.messages.list({
    labelIds: type === 'sent' ? ['SENT'] : [],
    pageToken,
    userId: 'me',
    q: email ? `${label}:"${email}"` : null,
    maxResults: 100
  })

  const messages = result.data.messages || []

  const records = await Promise.map(messages, async (entry) => {

    const message = await client.users.messages.get({
      format: 'full',
      userId: 'me',
      id: entry.id
    })

    const details = message.data.payload.headers.reduce((details, header) => {
      const { name, value } = header
      if(!_.includes(['Date','From','To','Cc','Bcc','Subject'], name)) return details
      return {
        ...details,
        [name.toLowerCase()]: getValue(name, value)
      }
    }, {})

    const bodyParts = getBodyParts(message)

    return {
      id: entry.id,
      ...details,
      html: getPart(bodyParts, 'text/html'),
      text: getPart(bodyParts, 'text/plain'),
      attachments: getAttachments(message)
    }

  })

  records.pagination = {
    skip: pageToken ? 1 : 0,
    next: result.data.nextPageToken || null
  }

  return records

}

export default list
