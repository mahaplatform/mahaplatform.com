import { sendSMS } from '@apps/maha/services/smses'

const question = async (req, { config, enrollment, program, state, step, tokens }) => {

  await program.load(['phone_number'], {
    transacting: req.trx
  })

  await enrollment.load(['phone_number'], {
    transacting: req.trx
  })

  const sms = await sendSMS(req, {
    from: program.related('phone_number').get('number'),
    to: enrollment.related('phone_number').get('number'),
    body: step.config.message,
    asset_ids: step.config.asset_ids,
    data: tokens,
    queue: false
  })

  await sms.save({
    program_id: program.get('id'),
    phone_number_id: enrollment.related('phone_number').get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

  return {
    action: {
      sms_id: sms.get('id')
    },
    session: {
      action: 'answer'
    },
    wait: true
  }

}

export default question
