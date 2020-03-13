import client from '../../../../../core/services/twilio'
import Asset from '../../../../maha/models/asset'
import Contact from '../../../models/contact'
import ejs from 'ejs'

const message = async (req, { config, enrollment }) => {

  await enrollment.load(['sms_campaign.program.phone_number'], {
    transacting: req.trx
  })

  const contact = await Contact.query(qb => {
    qb.select(req.trx.raw('crm_contacts.*,crm_contact_primaries.*'))
    qb.leftJoin('crm_contact_primaries', 'crm_contact_primaries.contact_id', 'crm_contacts.id')
    qb.where('crm_contacts.id', enrollment.get('contact_id'))
  }).fetch({
    transacting: req.trx
  })

  const message = ejs.render(config.message, {
    contact: {
      full_name: contact.get('full_name'),
      first_name: contact.get('full_name'),
      last_name: contact.get('full_name')
    }
  })

  const mediaUrl = config.asset_ids ? await Asset.where(qb => {
    qb.whereIn('id', config.asset_ids)
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray().map(asset => {
    return asset.get('signed_url')
  })) : null

  await client.messages.create({
    body: message,
    from: enrollment.related('sms_campaign').related('program').related('phone_number').get('number'),
    to: contact.get('phone'),
    ...mediaUrl ? { mediaUrl } : {}
  })

  return {}

}

export default message
