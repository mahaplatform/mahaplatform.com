import Asset from '../../models/asset'
import Field from '../../models/field'
import Link from '../../models/link'
import _ from 'lodash'

const getValue = async (req, { field, value }) => {

  if(!value) return null

  if(field.get('type') === 'moneyfield') {
    return value.toFixed(2)
  }

  if(field.get('type') === 'videofield') {

    const link = await Link.where({
      id: value
    }).fetch({
      withRelated: ['service'],
      transacting: req.trx
    })

    if(!link) return null

    return {
      id: link.get('id'),
      title: link.get('title'),
      text: link.get('text'),
      service: link.related('service').get('text'),
      url: link.get('url'),
      width: link.get('video_width'),
      height: link.get('video_height')
    }

  }

  if(_.includes(['filefield','imagefield'], field.get('type'))) {

    const asset = await Asset.where({
      id: value
    }).fetch({
      transacting: req.trx
    })

    if(!asset) return null

    return {
      id: asset.get('id'),
      content_type: asset.get('content_type'),
      file_name: asset.get('file_name'),
      file_size: asset.get('file_size'),
      path: asset.get('path'),
      url: asset.get('signed_url')
    }

  }

  return value

}


const expandValues = async (req, parent_type, parent_id, data, withNames = true) => {

  const fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', parent_type)
    if(parent_id) qb.where('parent_id', parent_id)
  }).fetchAll({
    transacting: req.trx
  })

  const fieldMap = fields.toArray().reduce((map, field) => ({
    ...map,
    [field.get('code')]: field
  }), {})

  return await Promise.reduce(Object.keys(data), async (values, code) => {

    if(!fieldMap[code]) return values

    const field = fieldMap[code]

    const key = withNames ? fieldMap[code].get('name').token : code

    const value = await Promise.map(data[code], async(value) => {
      return await getValue(req, {
        field,
        value
      })
    })

    const multiple = _.includes(['checkboxes','checkboxgroup'], field.get('type')) || field.get('config').multiple === true

    return {
      ...values,
      [key]: multiple ? value : value[0]
    }

  }, {})

}

export default expandValues
