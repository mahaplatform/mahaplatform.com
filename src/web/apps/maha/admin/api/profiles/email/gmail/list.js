import { getClient } from './utils'
import _ from 'lodash'

const list = (type) => async (req, profile) => {

  const gmail = await getClient(req, profile)

  const pageToken = _.get(req, 'query.$page.next')

  const email = req.query.email

  const label = type === 'sent' ? 'to' : 'from'

  const result = await gmail.users.messages.list({
    labelIds: type === 'sent' ? ['SENT'] : [],
    pageToken,
    userId: 'me',
    q: email ? `${label}:"${email}"` : null,
    maxResults: 100
  })

  const records = await Promise.map(result.data.messages, async entry => {
    const message = await gmail.users.messages.get({
      format: 'metadata',
      userId: 'me',
      id: entry.id
    })
    const details = message.data.payload.headers.reduce((details, header) => {
      const { name, value } = header
      if(!_.includes(['Date','From','To','Cc','Bcc','Subject'], name)) return details
      return {
        ...details,
        [name.toLowerCase()]: value
      }
    }, {})
    return {
      id: entry.id,
      ...details
    }
  })

  records.pagination = {
    skip: pageToken ? 1 : 0,
    next: result.data.nextPageToken || null
  }

  return records

}

export default list
