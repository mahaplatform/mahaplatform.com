import { getClient } from '../../services/microsoft'
import _ from 'lodash'

const list = (type) => async (req, profile) => {

  const client = await getClient(req, profile)

  const skiptoken = _.get(req, 'query.$page.next')

  const skip = skiptoken ? `$skip=${skiptoken}` : null

  const folder = type === 'sent' ? 'SentItems' : 'Inbox'

  const label = type === 'sent' ? 'to' : 'from'

  const filter = req.query.email ? ` and ${label}/emailAddress/address eq '${req.query.email}'` : ''

  const query = [
    ...skip ? [skip] : [],
    '$top=100',
    '$orderby=receivedDateTime desc',
    `$filter=receivedDateTime ge 1900-01-01T00:00:00Z${filter}`
  ].join('&')

  const url = `/me/mailFolders('${folder}')/messages?${query}`

  const result = await client.api(url).get()

  const records = result.value.map(entry => ({
    id: entry.id,
    from: entry.from.emailAddress,
    date: entry.sentDateTime,
    subject: entry.subject,
    to: entry.toRecipients.map(address => address.emailAddress),
    cc: entry.ccRecipients.map(address => address.emailAddress),
    bcc: entry.bccRecipients.map(address => address.emailAddress),
    has_attachments: entry.hasAttachments
  }))

  records.pagination = {
    skip: skiptoken ? 1 : 0,
    next: result['@odata.nextLink'] ? result['@odata.nextLink'].match(/skip=(.*)/)[1] : null
  }

  return records

}

export default list
