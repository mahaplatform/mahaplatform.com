import SMSBlacklist from '@apps/maha/models/sms_blacklist'

const optinHook = async (req, { from, phone_number, sms, twilio }) => {

  const blacklist = await SMSBlacklist.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('from_number_id', sms.related('to').get('id'))
    qb.where('to_number_id',  sms.related('from').get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(!blacklist) return

  await blacklist.destroy({
    transacting: req.trx
  })

}

export default optinHook
