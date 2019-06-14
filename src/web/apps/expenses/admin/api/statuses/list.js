import Status from '../../../models/status'

const listRoute = async (req, res) => {

  const statuses = await Status.query(qb => {
    qb.orderBy('id', 'asc')
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  const serializer =  (req, status) => ({
    id: status.get('id'),
    text: status.get('text')
  })

  res.status(200).respond(statuses, serializer)

}

export default listRoute
