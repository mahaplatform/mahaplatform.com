import { sendSMS } from '@apps/maha/services/smses'
import { getNext } from '../utils'

const messageStep = async (req, { config, enrollment, program, state, step, tokens }) => {

  await program.load(['phone_number'], {
    transacting: req.trx
  })

  await enrollment.load(['phone_number'], {
    transacting: req.trx
  })

  const sms = await sendSMS(req, {
    from: program.related('phone_number').get('number'),
    to: enrollment.related('phone_number').get('number'),
    body: step.message,
    asset_ids: step.asset_ids,
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
    next: getNext(req, { config, state })
  }

}

export default messageStep
