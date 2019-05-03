import serializer from '../../../core/objects/serializer'

const vendorSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  name: result.get('name'),

  full_address: result.get('full_address'),

  address_1: result.get('address_1'),

  address_2: result.get('address_2'),

  city: result.get('city'),

  state: result.get('state'),

  zip: result.get('zip'),

  integration: result.get('integration'),

  items_count: result.get('items_count'),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default vendorSerializer
