import SMS from '../../models/sms'

export const updateSMS = async (req, { num_media, price, sid, status }) => {

  const sms = await SMS.query(qb => {
    qb.where('sid', sid)
  }).fetch({
    transacting: req.trx
  })

  await sms.save({
    num_media,
    price,
    status
  }, {
    patch: true,
    transacting: req.trx
  })

}
