import Site from '../../../models/site'
import Type from '../../../models/type'
import Item from '../../../models/item'
import { Field, Route  } from 'maha'
import archiver from 'archiver'
import moment from 'moment'

const handler = async (req, res, trx) => {

  const site = await Site.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({ transacting: trx })

  const types = await Type.query(qb => {
    qb.where('site_id', req.params.id)
  }).fetchAll({ transacting: trx }).then(result => result.toArray())

  const map = await Field.query(qb => {
    qb.where('parent_type', 'sites_types')
    qb.orderBy(['parent_id','delta'])
  }).fetchAll({
    transacting: trx
  }).then(fields => fields.reduce((map, field) => ({
    ...map,
    [field.get('parent_id')]: [
      ...map[field.get('parent_id')] || [],
      field
    ]
  }), {}))

  const matrix = await Promise.reduce(types, async (matrix, type) => {

    const items = await Item.query(qb => {
      qb.where('type_id', type.get('id'))
    }).fetchAll({ transacting: trx }).then(result => result.toArray())

    const fields = map[type.get('id')]

    const getHeader = (field) => {

      if(field.get('type') === 'addressfield') return [
        `${field.get('name')}_street_1`,
        `${field.get('name')}_street_2`,
        `${field.get('name')}_city`,
        `${field.get('name')}_province`,
        `${field.get('name')}_postalcode`
      ]

      return [field.get('name')]

    }

    const headers = await Promise.reduce(fields, async (headers, field) => [
      ...headers,
      ...getHeader(field)
    ], ['id'])

    const data = await Promise.mapSeries(items, async (item) => {

      const values = item.get('values')

      const getValue = async (type, code, config, values) => {

        const value = values[code]

        if(type === 'addressfield') return value[0] ? [
          value[0].street1,
          value[0].street2,
          value[0].city,
          value[0].province,
          value[0].postalcode
        ] : [null,null,null,null]

        if(type === 'lookup') {

          const related = await Item.query(qb => {
            qb.whereIn('id', value)
          }).fetchAll({ transacting: trx })

          const title = map[config.datasource.type_id].find(field => {
            return field.get('name') === config.datasource.text
          })

          const items = related.map(item => item.get('values')[title.get('code')])

          return [items.join(',')]

        }

        return value

      }

      return await Promise.reduce(fields, async (data, field) => {

        const type = field.get('type')

        const config = field.get('config')

        const value = await getValue(type, field.get('code'), config, values)

        return [
          ...data,
          ...value
        ]

      }, [item.get('id')])

    })


    return [
      ...matrix,
      {
        name: type.get('title').toLowerCase().replace(' ', '_'),
        data: [
          headers,
          ...data
        ]
      }
    ]

  }, [])

  const sitename = site.get('title').toLowerCase().replace(' ', '_')

  const timestamp = moment().format('YYYYMMDDhhmmss')

  const filename = `${sitename}-backup-${timestamp}.zip`

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.on('error', function(err) {
    res.status(500).send({ error: err.message })
  })

  res.attachment(filename)

  archive.pipe(res)

  matrix.map(sheet => {

    const data = sheet.data.map(row => row.join(',')).join('\n')

    const name = `${sheet.name}.csv`

    archive.append(data, { name })

  })

  archive.finalize()

}

const createRoute = new Route({
  method: 'get',
  path: '/backup',
  handler
})

export default createRoute
