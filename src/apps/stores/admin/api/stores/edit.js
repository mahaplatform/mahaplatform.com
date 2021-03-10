import Store from '@apps/stores/models/store'

const editRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  await res.status(200).respond(store, (req, store) => ({
    title: store.get('title'),
    permalink: store.get('permalink'),
    program: {
      id: store.related('program').get('id'),
      title: store.related('program').get('title')
    },
    contact_config: store.get('contact_config')
  }))

}

export default editRoute
