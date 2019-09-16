import { getClient } from '../../services/box'
import mime from 'mime-types'
import path from 'path'
import _ from 'lodash'

const _getContentType = (name) => {
  const ext = path.extname(name)
  const type = mime.lookup(ext)
  return type || 'text/plain'
}

const listRoute = async (req, profile) => {

  const client = await getClient(req, profile)

  const fields = 'name,modified_at,size,url,permissions,sync_state'

  const _list = async (offset) => {

    const result = await client.folders.getItems(0, {
      fields,
      offset,
      limit: 20
    })

    const next = result.offset + result.limit

    return {
      entries: result.entries,
      next: ((next - 1) < result.total_count) ? next : null
    }

  }

  const _search = async (query, next) => {

    const result = await client.search.query(query, {
      fields,
      offset: 0,
      limit: 20
    })

    return {
      entries: result.entries
    }

  }

  const q = _.get(req.query, '$filter.q')

  const next = _.get(req, 'query.$page.next')

  const result = q ? await _search(q, next) : await _list(next)

  const records = result.entries.map(entry => {

    const content_type = _getContentType(entry.name)

    return {
      id: entry.id,
      type: entry.type,
      name: entry.name,
      thumbnail: content_type.match(/image/) ? `/admin/box/preview?path=${entry.id}`: null,
      content_type
    }

  })

  records.pagination = {
    next: result.next,
    skip: next ? 1 : 0
  }

  return records

}

export default listRoute
