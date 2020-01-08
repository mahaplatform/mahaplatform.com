import googlecontacts from '../../../../maha/admin/api/profiles/contacts/googlecontacts/list'
import constantcontact from '../../../../maha/admin/api/profiles/lists/constantcontact/members'
import mailchimp from '../../../../maha/admin/api/profiles/lists/mailchimp/members'
import outlook from '../../../../maha/admin/api/profiles/contacts/outlook/list'
import ImportSerializer from '../../../../maha/serializers/import_serializer'
import ImportItem from '../../../../maha/models/import_item'
import Profile from '../../../../maha/models/profile'
import Import from '../../../../maha/models/import'
import _ from 'lodash'

const getList = (service) => {
  if(service === 'constantcontact') return constantcontact
  if(service === 'googlecontacts') return googlecontacts
  if(service === 'mailchimp') return mailchimp
  if(service === 'outlook') return outlook
}

const loadMembers = async(req, list, profile) => {
  const members = await list(req, profile)
  const { next, limit, skip, total } = members.pagination
  if(!_.isNil(next)) {
    req.query = {
      $page: {
        next
      }
    }
    return [
      ...members,
      ...await loadMembers(req, list, profile)
    ]
  } else if(!_.isNil(limit) && (skip + limit) < total) {
    req.query = {
      $page: {
        skip: skip + limit
      }
    }
    return [
      ...members,
      ...await loadMembers(req, list, profile)
    ]
  } else {
    return members
  }
}

const getContacts = async (req, profile) => {
  const service = profile.related('source').get('text')
  const list = getList(service)
  if(_.includes(['constantcontact', 'mailchimp'], service)) {
    req.params = { id: req.body.list_id }
    const members = await loadMembers(req, list, profile)
    return members.map(contact => ({
      first_name: contact.first_name,
      last_name: contact.last_name,
      email_address: contact.email_addresses.length > 0 ? contact.email_addresses[0].address : null,
      phone_number: contact.phone_number,
      organization: contact.organization
    }))
  } else {
    const contacts = await loadMembers(req, list, profile)
    return contacts.map(contact => ({
      first_name: contact.first_name,
      last_name: contact.last_name,
      photo: contact.photo,
      organization: contact.organizations.length > 0 ? contact.organizations[0].name : null,
      email_address: contact.email_addresses.length > 0 ? contact.email_addresses[0].address : null,
      phone_number: contact.phone_numbers.length > 0 ? contact.phone_numbers[0].number : null,
      mailing_address: contact.mailing_addresses.length > 0 ? {
        street_1: contact.mailing_addresses[0].streetAddress,
        city: contact.mailing_addresses[0].city,
        state_province: contact.mailing_addresses[0].region,
        postal_code: contact.mailing_addresses[0].postalCode,
        country: contact.mailing_addresses[0].countryCode
      } : null
    }))
  }

}

const createRoute = async (req, res) => {

  const profile = await Profile.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.body.profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const contacts = await getContacts(req, profile)

  const imp = await Import.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    object_type: 'crm_contacts',
    stage: 'mapping'
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(contacts, async (values) => {

    const is_duplicate = false

    await ImportItem.forge({
      import_id: imp.get('id'),
      values,
      is_valid: true,
      is_duplicate,
      is_omitted: false,
      is_nonunique: false,
      is_merged: false,
      is_ignored: false,
      is_complete: false
    }).save(null, {
      transacting: req.trx
    })

  })

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', imp.get('id'))
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default createRoute
