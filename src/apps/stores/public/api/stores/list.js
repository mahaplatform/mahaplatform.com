import Store from '@apps/stores/models/store'

const listRoute = async (req, res) => {

  const stores = await Store.fetchAll({
    transacting: req.trx
  })

  await res.status(200).respond(stores, (req, store) => ({
    code: store.get('code'),
    title: store.get('title')
  }))

}

export default listRoute
