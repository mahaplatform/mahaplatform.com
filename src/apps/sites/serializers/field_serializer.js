import { serializer } from 'maha'
import Type from '../models/type'

const fieldSerializer = serializer(async (req, trx, result) => ({

  id: result.get('id'),

  label: result.get('label'),

  code: result.get('code'),

  name: result.get('name'),

  instructions: result.get('instructions'),

  type: result.get('type'),

  config: await config(req, trx, result),

  is_required: result.get('is_required'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

const config = async (req, trx, result) => {

  const config = result.get('config')


  const lookupData = (result.get('type') === 'lookup') ? await getEndpoint(req, trx, result, config.type) : {}

  return {
    label: result.get('label'),
    name: `values.${result.get('code')}`,
    type: result.get('type'),
    type_id: result.get('type_id'),
    ...lookupData
  }

}

const getEndpoint = async (req, trx, result, name) => {

  const type = await Type.where({ name }).fetch({ transacting: trx })

  return {
    endpoint: `/api/admin/sites/sites/${result.get('site_id')}/types/${type.get('id')}/items`,
    value: 'id',
    text: 'title',
    multiple: true
  }

}


export default fieldSerializer
