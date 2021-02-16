import SMSBlacklist from '@apps/maha/models/sms_blacklist'

const optoutHook = async (req, { from, phone_number, sms, twilio }) => {

  if(_.includes(['stop','stopall','unsubscribe','cancel','end','quit'], sms.get('body').toLowerCase())) {
    await SMSBlacklist.forge({
      team_id: req.team.get('id'),
      from_number_id: sms.related('to').get('id'),
      to_number_id: sms.related('from').get('id')
    }).save(null, {
      transacting: req.trx
    })
  }

}

export default optoutHook
