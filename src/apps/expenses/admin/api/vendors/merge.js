import socket from '../../../../../core/services/routes/emitter'

const mergeRoute = async (req, res) => {

  await Promise.map(['reimbursement','expense','check'], async (type) => {
    await req.trx(`expenses_${type}s`).where({
      vendor_id: req.params.id
    }).update({
      vendor_id: req.body.vendor_id
    })
  })

  await req.trx('expenses_vendors').where({
    id: req.params.id
  }).del()

  await socket.refresh(req, [
    '/admin/expenses/vendors'
  ])

  res.status(200).respond(true)

}

export default mergeRoute
