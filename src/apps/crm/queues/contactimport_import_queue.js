import googlecontacts from '../../maha/admin/api/profiles/contacts/googlecontacts/list'
import constantcontact from '../../maha/admin/api/profiles/lists/constantcontact/members'
import mailchimp from '../../maha/admin/api/profiles/lists/mailchimp/members'
import outlook from '../../maha/admin/api/profiles/contacts/outlook/list'
import ImportSerializer from '../../maha/serializers/import_serializer'
import ImportItem from '../../maha/models/import_item'
import socket from '../../../core/services/emitter'
import EmailAddress from '../models/email_address'
import Queue from '../../../core/objects/queue'
import Profile from '../../maha/models/profile'
import Import from '../../maha/models/import'
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
      photo: contact.photo,
      first_name: contact.first_name,
      last_name: contact.last_name,
      organization_1: _.get(contact, 'organizations[0].name'),
      email_1: _.get(contact, 'email_addresses[0].address'),
      phone_1: _.get(contact, 'phone_numbers[0].number'),
      address_1_street_1: _.get(contact, 'mailing_addresses[0].street_1'),
      address_1_city: _.get(contact, 'mailing_addresses[0].city'),
      address_1_state_province: _.get(contact, 'mailing_addresses[0].state_province'),
      address_1_postal_code: _.get(contact, 'mailing_addresses[0].postal_code')
    }))
  } else {
    const contacts = await loadMembers(req, list, profile)
    return contacts.map(contact => {
      return {
        photo: contact.photo.match(/_{11}.*photo\.jpg$/) === null ? contact.photo : null,
        first_name: contact.first_name,
        last_name: contact.last_name,
        organization_1: _.get(contact, 'organizations[0].name'),
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

const processor = async (req, job) => {

  const imp = await Import.query(qb => {
    qb.where('id', job.data.import_id)
  }).fetch({
    withRelated: ['asset','team'],
    transacting: req.trx
  })

  req.body = job.data

  const profile = await Profile.query(qb => {
    qb.where('id', job.data.profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  const contacts = await getContacts(req, profile)

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
      if(values.email_1) qb.where('address', values.email_1)
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
      is_complete: false
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
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, _import)
  })

}

const failed = async (job, err) => {
  await socket.in(`/admin/imports/${job.data.import_id}`).emit('message', {
    target: `/admin/imports/${job.data.import_id}`,
    action: 'failed',
    data: [job,err]
  })
}

const ContactImportImportQueue = new Queue({
  name: 'contactimport_import',
  processor,
  failed
})

export default ContactImportImportQueue
