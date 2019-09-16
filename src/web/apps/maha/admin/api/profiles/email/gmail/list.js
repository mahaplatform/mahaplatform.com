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


  const records = await Promise.map(result.data.messages, async entry => {

    const message = await client.users.messages.get({
      format: 'metadata',
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
