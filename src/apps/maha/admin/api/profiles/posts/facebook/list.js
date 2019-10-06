import { getClient } from '../../services/facebook'
import _ from 'lodash'

const list = async (req, profile) => {

  const client = await getClient(req, profile)

  const cursor = _.get(req, 'query.$page.next')

  const query = cursor ? `?after=${cursor}` : ''

  const result = await client.api(`${profile.get('profile_id')}/posts${query}`, {
    fields: ['id','attachments','link','message'],
    limit: 100
  })

  const records = result.data.map(result => ({
    id: result.id,
    attachments: result.attachments,
    link: result.link,
    message: result.message
  }))

  records.pagination = {
    skip: cursor ? 1 : 0,
    next: result.paging ? result.paging.cursors.after : null
  }

  return records

}

export default list
