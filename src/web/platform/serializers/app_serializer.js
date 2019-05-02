import { serializer } from 'maha'

const appSerializer = serializer((req, trx, result) => {

  return {

    id: result.get('id'),

    ...result.get('data'),

    installed: result.get('installed')

  }

})

export default appSerializer
