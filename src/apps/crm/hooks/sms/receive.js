import generateCode from '../../../../core/utils/generate_code'
import { contactActivity } from '../../services/activities'
import SMSCampaign from '../../models/sms_campaign'
import Enrollment from '../../models/enrollment'
import { getContact } from '../utils'
import { twiml } from 'twilio'

const receive = async (req, { sms, phone_number }) => {

  const response = new twiml.MessagingResponse()

  if(!req.session.code) {

    const campaign = await SMSCampaign.query(qb => {
      qb.where('phone_number_id', phone_number.get('id'))
      qb.where('term', sms.get('body').toLowerCase())
    }).fetch({
      transacting: req.trx
    })

    if(!campaign) return null

    const contact = await getContact(req, {
      team_id: campaign.get('team_id'),
      number: sms.related('from').get('number')
    })

    await contactActivity(req, {
      team_id: campaign.get('team_id'),
      contact,
      program_id: campaign.get('program_id'),
      type: 'workflow',
      story: 'triggered an incoming sms workflow',
      // object: sms
    })

    const code = await generateCode(req, {
      table: 'crm_enrollments'
    })

    const enrollment = await Enrollment.forge({
      team_id: campaign.get('team_id'),
      sms_campaign_id: campaign.get('id'),
      contact_id: contact.get('id'),
      code,
      actions: []
    }).save(null, {
      transacting: req.trx
    })

    req.session.code = code

    response.redirect({
      method: 'POST'
    }, `${process.env.TWIML_HOST}/sms/crm/enrollments/${enrollment.get('code')}`)

  } else {

    const enrollment = await Enrollment.query(qb => {
      qb.where('code', req.session.code)
    }).fetch({
      withRelated: ['sms_campaign'],
      transacting: req.trx
    })

    response.redirect({
      method: 'POST'
    }, `${process.env.TWIML_HOST}/sms/crm/enrollments/${enrollment.get('code')}`)

  }

  return response.toString()

}

export default receive
