import googlecontacts from '@apps/maha/admin/api/profiles/contacts/googlecontacts/list'
import constantcontact from '@apps/maha/admin/api/profiles/lists/constantcontact/members'
import mailchimp from '@apps/maha/admin/api/profiles/lists/mailchimp/members'
import outlook from '@apps/maha/admin/api/profiles/contacts/outlook/list'
import ImportSerializer from '@apps/maha/serializers/import_serializer'
import { createUserToken } from '@core/utils/user_tokens'
import ImportItem from '@apps/maha/models/import_item'
import socket from '@core/vendor/emitter'
import EmailAddress from '@apps/crm/models/email_address'
import Profile from '@apps/maha/models/profile'
import Import from '@apps/maha/models/import'
import _ from 'lodash'

const getList = (service) => {
  if(service === 'constantcontact') return constantcontact
  if(service === 'googlecontacts') return googlecontacts
  if(service === 'mailchimp') return mailchimp
  if(service === 'outlook') return outlook
}

const loadMembers = async(req, { list, profile }) => {
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
      ...await loadMembers(req, { list, profile })
    ]
  } else if(!_.isNil(limit) && (skip + limit) < total) {
    req.query = {
      $page: {
        skip: skip + limit
      }
    }
    return [
      ...members,
      ...await loadMembers(req, { list, profile })
    ]
  } else {
    return members
  }
}

const getContacts = async (req, { profile, user, list_id }) => {
  const service = profile.get('source')
  const list = getList(service)
  req.token = createUserToken({
    user_id: user.get('id')
  })
  if(_.includes(['constantcontact', 'mailchimp'], service)) {
    req.params = { id: list_id }
    const members = await loadMembers(req, { list, profile })
    return members.map(contact => ({
      photo: contact.photo,
      first_name: contact.first_name,
      last_name: contact.last_name,
      organization: contact.organization,
      position: contact.position,
      birthday: contact.birthday,
      spouse: contact.spouse,
      email_1: _.get(contact, 'email_addresses[0].address'),
      phone_1: _.get(contact, 'phone_numbers[0].number'),
      address_1_street_1: _.get(contact, 'mailing_addresses[0].street_1'),
      address_1_city: _.get(contact, 'mailing_addresses[0].city'),
      address_1_state_province: _.get(contact, 'mailing_addresses[0].state_province'),
      address_1_postal_code: _.get(contact, 'mailing_addresses[0].postal_code')
    }))
  } else {
    const contacts = await loadMembers(req, { list, profile })
    return contacts.map(contact => {
      return {
        photo: contact.photo.match(/_{11}.*photo\.jpg$/) === null ? contact.photo : null,
        first_name: contact.first_name,
        last_name: contact.last_name,
        organization: contact.organization,
        position: contact.position,
        birthday: contact.birthday,
        spouse: contact.spouse,
        email_1: _.get(contact, 'email_addresses[0].address'),
        phone_1: _.get(contact, 'phone_numbers[0].number'),
        address_1_street_1: _.get(contact, 'mailing_addresses[0].street_1'),
        address_1_city: _.get(contact, 'mailing_addresses[0].city'),
        address_1_state_province: _.get(contact, 'mailing_addresses[0].state_province'),
        address_1_postal_code: _.get(contact, 'mailing_addresses[0].postal_code')
      }
    })
  }

}

const importContactImport = async (req, { import_id,profile_id, list_id }) => {

  const imp = await Import.query(qb => {
    qb.where('id', import_id)
  }).fetch({
    withRelated: ['asset','user'],
    transacting: req.trx
  })

  const profile = await Profile.query(qb => {
    qb.where('id', profile_id )
  }).fetch({
    transacting: req.trx
  })

  const contacts = await getContacts(req, {
    user: imp.related('user'),
    profile,
    list_id
  })

  const _getType = (key) => {
    if(key.match(/^email/)) return 'emailfield'
    if(key.match(/^phone/)) return 'phonefield'
    if(key.match(/^photo/)) return 'imagefield'
    return 'textfield'
  }

  await imp.save({
    mapping: Object.keys(contacts[0]).map(key => ({
      header: key,
      field: key,
      type: _getType(key)
    }))
  }, {
    transacting: req.trx
  })

  await Promise.mapSeries(contacts, async (values, index) => {

    const email = values.email_1 ? await EmailAddress.query(qb => {
      if(values.email_1) qb.where('address', values.email_1.toLowerCase())
    }).fetch({
      transacting: req.trx
    }) : null

    await ImportItem.forge({
      import_id: imp.get('id'),
      values,
      is_valid: true,
      is_duplicate: email !== null,
      is_omitted: false,
      is_nonunique: false,
      is_merged: false,
      is_ignored: false,
      is_complete: false,
      is_empty: false
    }).save(null, {
      transacting: req.trx
    })

    await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
      target: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: {
        completed: index + 1,
        total: contacts.length
      }
    })

  })

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('maha_imports.id', imp.get('id'))
  }).fetch({
    withRelated: ['asset','program','user.photo'],
    transacting: req.trx
  })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, _import)
  })

}

export default importContactImport
