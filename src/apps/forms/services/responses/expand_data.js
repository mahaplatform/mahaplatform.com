import AgreementSerializer from '@apps/maha/serializers/agreement_serializer'
import AssetSerializer from '@apps/maha/serializers/asset_serializer'
import Agreement from '@apps/maha/models/agreement'
import Asset from '@apps/maha/models/asset'

const expandFiles = async(req, value) => {
  return await Promise.mapSeries(value, async (asset_id) => {
    const asset = await Asset.query(qb => {
      qb.where('id', asset_id)
    }).fetch({
      transacting: req.trx
    })
    return AssetSerializer(req, asset)
  })
}

const expandSignature = async(req, value) => {
  const agreement = await Agreement.query(qb => {
    qb.where('id', value)
  }).fetch({
    withRelated: ['signed'],
    transacting: req.trx
  })
  return AgreementSerializer(req, agreement)
}

const expandValue = async(req, { fields, data, key }) => {
  const value = data[key]
  if(!value) return null
  const field = fields.find(field => {
    return field.code === key
  })
  if(!field) return value
  if(field.type === 'signaturefield') {
    return await expandSignature(req, value)
  }
  if(field.type === 'filefield') {
    return await expandFiles(req, value)
  }
  return value
}

const expandData = async(req, { fields, data }) => {
  return await Promise.reduce(Object.keys(data), async (expanded, key) => ({
    ...expanded,
    [key]: await expandValue(req, { fields, data, key })
  }), {})
}

export default expandData
