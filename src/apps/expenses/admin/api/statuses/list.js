import Status from '../../../models/status'

const listRoute = async (req, res) => {

  const statuses = await Status.scope().query(qb => {
    qb.orderBy('id', 'asc')
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(statuses, {
    fields: ['id','text']
  })

}

export default listRoute
