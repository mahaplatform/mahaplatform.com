import Call from '../../models/call'

const updateCall = async (req, { duration, price, sid, status }) => {

  const call = await Call.query(qb => {
    qb.where('sid', sid)
  }).fetch({
    transacting: req.trx
  })

  await call.save({
    duration,
    price,
    status
  }, {
    patch: true,
    transacting: req.trx
  })

}

export default updateCall
