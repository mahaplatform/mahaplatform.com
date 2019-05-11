import { getIndex } from './utils'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const q = _.get(req, 'query.$filter.q') || '*'

  const index = await getIndex()

  const suggestions = await new Promise((resolve, reject) => {
    let suggestions = []
    index.match({
      beginsWith: q,
      threshold: 1
    }).on('data', (data) => {
      suggestions.push(data)
    }).on('end', () => {
      resolve(suggestions)
    })
  })

  const query = suggestions.map(suggestion => ({
    AND: {
      'title': [suggestion]
    }
  }))

  const result = await new Promise((resolve, reject) => {
    let records = []
    index.search({
      query
    }).on('data', (data) => {
      records.push(data)
    }).on('end', () => {
      resolve(records.map(record => record.document))
    })
  })

  const records = result.reduce((records, record) => {
    const app = _.find(req.apps, { code: record.app })
    if(!app) return records
    return [
      ...records,
      {
        ...record,
        app
      }
    ]
  }).sort((a,b) => {
    if(a.title > b.title) return 1
    if(a.title < b.title) return -1
    return 0
  })
  res.status(200).respond({
    records,
    total: records.length,
    all: records.length,
    limit: 1000,
    skip: 0
  })

}

export default listRoute
