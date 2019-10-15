import Category from '../../../models/category'

const editRoute = async (req, res) => {

  const category = await Category.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!category) return res.status(404).respond({
    code: 404,
    message: 'Unable to load category'
  })

  res.status(200).respond(category, {
    fields: [
      'id',
      'title'
    ]
  })

}

export default editRoute
