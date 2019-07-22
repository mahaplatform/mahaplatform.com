import Asset from '../../../../maha/models/asset'
import Field from '../../../../maha/models/field'
import Site from '../../../models/site'
import Type from '../../../models/type'
import Item from '../../../models/item'
import archiver from 'archiver'
import moment from 'moment'

const backupRoute = async (req, res) => {

  const site = await Site.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  const types = await Type.query(qb => {
    qb.where('site_id', req.params.id)
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const map = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'sites_types')
    qb.orderBy(['parent_id','delta'])
  }).fetchAll({
    transacting: req.trx
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
    }).fetchAll({
      transacting: req.trx
    }).then(result => result.toArray())

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
        ] : ['','','','','']

        if(type === 'imagefield') {

          if(!value[0]) return ['']

          const asset = await Asset.where('id', value[0]).fetch({
            transacting: req.trx
          })

          return [asset.get('url')]

        }

        if(type === 'lookup') {

          const ids = value.filter(id => id !== null)

          if(ids.length === 0) return [null]

          const related = await Item.query(qb => {
            qb.whereIn('id', ids)
          }).fetchAll({
            transacting: req.trx
          })

          const title = map[config.datasource.type_id].find(field => {
            return field.get('name') === config.datasource.text
          })

          const items = related.map(item => {
            return item.get('values')[title.get('code')]
          }).filter(item => {
            return item !== null
          })

          return [items.join(',')]

        }

        return value

      }

      const expanded = await Promise.reduce(fields, async (data, field) => {
        const type = field.get('type')
        const config = field.get('config')
        const value = await getValue(type, field.get('code'), config, values)
        return [
          ...data,
          ...value || ''
        ]
      }, [item.get('id')])

      return expanded.map(item => item || '')

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

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.on('error', function(err) {
    res.status(500).send({ error: err.message })
  })

  res.attachment(`${sitename}-backup-${timestamp}.zip`)

  archive.pipe(res)

  matrix.map(sheet => archive.append(sheet.data.map(row => {
    return row.map(cell => `"${cell}"`).join(',')
  }).join('\n'), {
    name: `${sheet.name}.csv`
  }))

  archive.finalize()

}

export default backupRoute
