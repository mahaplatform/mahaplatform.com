import SMS from '../../models/sms'

const updateSMS = async (req, { num_media, price, sid, status, error_code }) => {

  const sms = await SMS.query(qb => {
    qb.where('sid', sid)
  }).fetch({
    transacting: req.trx
  })

  await sms.save({
    num_media,
    price,
    status,
    error_code
  }, {
    patch: true,
    transacting: req.trx
  })

}

export default updateSMS
