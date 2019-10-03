import Type from '../models/type'

const fieldSerializer = async (req, result) => ({
  id: result.get('id'),
  label: result.get('label'),
  code: result.get('code'),
  name: result.get('name'),
  instructions: result.get('instructions'),
  type: result.get('type'),
  config: await config(req, result),
  is_required: result.get('is_required'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const config = async (req, result) => {

  const config = result.get('config')

  const lookupData = (result.get('type') === 'lookup') ? await getEndpoint(req, result, config.type) : {}

  return {
    label: result.get('label'),
    name: `values.${result.get('code')}`,
    type: result.get('type'),
    type_id: result.get('type_id'),
    ...lookupData
  }

}

const getEndpoint = async (req, result, name) => {

  const type = await Type.query(qb => {
    qb.where('name', name)
  }).fetch({
    transacting: req.trx
  })

  return {
    endpoint: `/api/admin/sites/sites/${result.get('site_id')}/types/${type.get('id')}/items`,
    value: 'id',
    text: 'title',
    multiple: true
  }

}


export default fieldSerializer
