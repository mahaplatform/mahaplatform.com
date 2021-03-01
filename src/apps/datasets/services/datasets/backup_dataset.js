import Record from '@apps/datasets/models/record'
import Type from '@apps/datasets/models/type'
import Asset from '@apps/maha/models/asset'
import Field from '@apps/maha/models/field'
import { zip } from '@core/services/zip'
import Excel from 'exceljs'

const getValue = async (req, { type, code, config, map, values }) => {

  const value = values[code]

  if(!value) return [null]

  if(value.length === 0) return value

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

    const related = await Record.query(qb => {
      qb.whereIn('id', ids)
    }).fetchAll({
      transacting: req.trx
    })

    const title = map[config.datasource.type_id].find(field => {
      return field.get('name') === config.datasource.text
    })

    const records = related.map(record => {
      return record.get('values')[title.get('code')]
    }).filter(record => {
      return record !== null
    })

    return [records.join(',')]

  }

  return [value]

}

const getData = async (req, { records, fields, map }) => {

  return await Promise.mapSeries(records, async (record) => {

    return await Promise.reduce(fields, async (data, field) => {

      return [
        ...data,
        ...await getValue(req, {
          type: field.get('type'),
          code: field.get('code'),
          config: field.get('config'),
          map,
          values: record.get('values')
        }) || ''
      ]

    }, [record.get('id')]).then(expanded => {
      return expanded.map(record => record || '')
    })

  })

}

const getHeader = (field) => {

  if(field.get('type') === 'addressfield') return [
    `${field.get('name')}_street_1`,
    `${field.get('name')}_street_2`,
    `${field.get('name')}_city`,
    `${field.get('name')}_province`,
    `${field.get('name')}_postalcode`
  ]

  return [field.get('name').value]

}

const getHeaders = async (req, { fields }) => {

  return await Promise.reduce(fields, async (headers, field) => [
    ...headers,
    ...getHeader(field)
  ], ['id'])

}

const getFiles = async (req, { map, types }) => {

  return await Promise.reduce(types, async (matrix, type) => {

    const records = await Record.query(qb => {
      qb.select('datasets_records.*','maha_version_versions.active_value as values','maha_version_versions.status')
      qb.joinRaw('inner join maha_version_versions on maha_version_versions.versionable_type=\'datasets_records\' and maha_version_versions.versionable_id=datasets_records.id and maha_version_versions.key=\'values\'')
      qb.where('datasets_records.team_id', req.team.get('id'))
      qb.where('datasets_records.type_id', type.get('id'))
      qb.whereNull('deleted_at')
    }).fetchAll({
      transacting: req.trx
    }).then(result => result.toArray())

    return [
      ...matrix,
      {
        name: type.get('title').toLowerCase().replace(' ', '_'),
        headers: await getHeaders(req, {
          fields: map[type.get('id')]
        }),
        rows: await getData(req, {
          fields: map[type.get('id')],
          map,
          records
        })
      }
    ]

  }, [])

}

const backupDataset = async (req, { dataset_id, type_ids, format }) => {

  const types = await Type.query(qb => {
    qb.where('dataset_id', dataset_id)
    qb.whereIn('id', type_ids)
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const map = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'datasets_types')
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

  const data = await getFiles(req, {
    map,
    types
  })

  if(format === 'excel') {
    const workbook = new Excel.Workbook()
    data.map(filedata => {
      const worksheet = workbook.addWorksheet(filedata.name)
      worksheet.addRow(filedata.headers)
      filedata.rows.map(row => worksheet.addRow(row))
    })
    return await workbook.xlsx.writeBuffer()
  }

  if(format === 'excelzip') {
    return await zip({
      files: await Promise.mapSeries(data, async filedata => {
        const workbook = new Excel.Workbook()
        const worksheet = workbook.addWorksheet(filedata.name)
        worksheet.addRow(filedata.headers)
        filedata.rows.map(row => worksheet.addRow(row))
        return {
          name: `${filedata.name}.xlsx`,
          data: await workbook.xlsx.writeBuffer()
        }
      })
    })
  }

  if(format === 'csvzip') {
    return await zip({
      files: data.map(filedata => ({
        name: `${filedata.name}.csv`,
        data: [
          filedata.headers,
          ...filedata.rows.map(row => {
            return row.map(cell => {
              return `"${`${cell}`.replace(/"/g, '""')}"`
            }).join(',')
          })
        ].join('\n')+'\n'
      }))
    })
  }

}

export default backupDataset
