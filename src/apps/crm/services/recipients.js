import { toFilter } from '../../../core/utils/criteria'
import Recipient from '../models/recipient'
import Field from '../../maha/models/field'

const getFilter = ({ filter, criteria }) => {
  if(filter) return filter
  if(criteria) return toFilter(criteria, null)
  return null
}

export const getRecipients = async (req, params) => {

  const { type, purpose, program_id, page } = params

  const filter = getFilter(params)

  req.fields = await Field.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('parent_type', 'crm_programs')
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const recipient = Recipient.scope(qb => {
    qb.select(req.trx.raw('distinct on (crm_recipients.contact_id,crm_recipients.email_address_id,crm_recipients.phone_number_id,crm_recipients.mailing_address_id,crm_contacts.last_name) crm_recipients.*'))
    qb.innerJoin('crm_contacts','crm_contacts.id','crm_recipients.contact_id')
    qb.leftJoin('crm_email_addresses', 'crm_email_addresses.contact_id', 'crm_recipients.email_address_id')
    qb.leftJoin('crm_phone_numbers', 'crm_phone_numbers.contact_id', 'crm_recipients.phone_number_id')
    qb.leftJoin('crm_mailing_addresses', 'crm_mailing_addresses.contact_id', 'crm_recipients.mailing_address_id')
    qb.leftJoin('crm_contacts_organizations', 'crm_contacts_organizations.contact_id', 'crm_recipients.contact_id')
    qb.leftJoin('crm_taggings', 'crm_taggings.contact_id', 'crm_recipients.contact_id')
    qb.leftJoin('crm_subscriptions', 'crm_subscriptions.contact_id', 'crm_recipients.contact_id')
    qb.leftJoin('crm_interests', 'crm_interests.contact_id', 'crm_recipients.contact_id')
    qb.leftJoin('crm_responses', 'crm_responses.contact_id', 'crm_recipients.contact_id')
    qb.where('crm_contacts.team_id', req.team.get('id'))
    if(!filter || filter.$and.length === 0) qb.whereRaw('false')
    qb.where('type', type)
    qb.where('purpose', purpose)
    if(purpose === 'marketing') {
      qb.where('program_id', program_id)
    }
    qb.where('crm_recipients.team_id', req.team.get('id'))
    qb.orderBy('crm_contacts.last_name','asc')
  }).filter({
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name',
      birthday: 'crm_contacts.birthday',
      spouse: 'crm_contacts.spouse',
      email: 'crm_email_addresses.address',
      phone: 'crm_phone_numbers.number',
      organization_id: 'crm_contacts_organizations.organization_id',
      street_1: 'crm_mailing_addresses.address->>\'street_1\'',
      city: 'crm_mailing_addresses.address->>\'city\'',
      state_province: 'crm_mailing_addresses.address->>\'state_province\'',
      postal_code: 'crm_mailing_addresses.address->>\'postal_code\'',
      county: 'crm_mailing_addresses.address->>\'county\'',
      tag_id: 'crm_taggings.tag_id',
      list_id: 'crm_subscriptions.list_id',
      topic_id: 'crm_interests.topic_id',
      form_id: 'crm_responses.form_id'
    },
    filter,
    filterParams: ['first_name','last_name','email','phone','tag_id','birthday','spouse','street_1','city','state_province','postal_code','county','organization_id','tag_id','list_id','topic_id','form_id']
  })

  if(page) {
    return await recipient.fetchPage({
      page,
      withRelated: ['contact.photo','email_address','mailing_address','phone_number'],
      transacting: req.trx
    })
  }

  return await recipient.fetchAll({
    withRelated: ['contact.photo','email_address','mailing_address','phone_number'],
    transacting: req.trx
  })

}
