import Store from '../../../models/store'

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

  res.status(200).respond(store, {
    fields: [
      'title',
      'permalink'
    ]
  })

}

export default editRoute
