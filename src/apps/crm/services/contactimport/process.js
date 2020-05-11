import GeocodeMailingAddressQueue from '../../queues/geocode_mailing_address_queue'
import ContactImportPhotoQueue from '../../queues/contactimport_photo_queue'
import ImportSerializer from '../../../maha/serializers/import_serializer'
import { updateMailingAddresses } from '../../services/mailing_addresses'
import { updateEmailAddresses } from '../../services/email_addresses'
import { updatePhoneNumbers } from '../../services/phone_numbers'
import { refresh } from '../../../../core/services/routes/emitter'
import { updateOrganizations } from '../../services/organizations'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import generateCode from '../../../../core/utils/generate_code'
import { contactActivity } from '../../services/activities'
import ImportItem from '../../../maha/models/import_item'
import MailingAddress from '../../models/mailing_address'
import socket from '../../../../core/services/emitter'
import EmailAddress from '../../models/email_address'
import { updateTopics } from '../../services/topics'
import Organization from '../../models/organization'
import PhoneNumber from '../../models/phone_number'
import { updateLists } from '../../services/lists'
import Import from '../../../maha/models/import'
import Consent from '../../models/consent'
import { matchContact } from './utils'
import moment from 'moment'
import _ from 'lodash'

const getValue = (strategy, contact, imp) => {
  if(strategy === 'overwrite') return imp || contact
  if(strategy === 'discard') return contact || imp
  return imp
}

const getEmailAddresses = async (contact, values) => {
  const existing = contact.related('email_addresses').map(email => ({
    id: email.get('id'),
    address: email.get('address'),
    is_primary: email.get('is_primary')
  }))
  return Array(3).fill(0).reduce((addresses, n, i) => {
    if(!values[`email_${i+1}`]) return addresses
    const found = _.find(existing, { address: values[`email_${i+1}`] })
    if(found) return addresses
    return [
      ...addresses,
      {
        address: values[`email_${i+1}`].toLowerCase(),
        is_primary: (existing.length + addresses.length) === 0
      }
    ]
  }, existing)
}

const getFormattedNumber = (value) => {
  const parsed = parsePhoneNumberFromString(value, 'US')
  const number = [parsed.number]
  if(parsed.ext) number.push(parsed.ext)
  return number.join('x')
}

const getPhoneNumbers = async (contact, values) => {
  const existing = contact.related('phone_numbers').map(phone => ({
    id: phone.get('id'),
    number: phone.get('number'),
    is_primary: phone.get('is_primary')
  }))
  return Array(3).fill(0).reduce((numbers, n, i) => {
    if(!values[`phone_${i+1}`]) return numbers
    const number = getFormattedNumber(values[`phone_${i+1}`])
    const found = _.find(existing, { number })
    if(found) return numbers
    return [
      ...numbers,
      {
        number,
        is_primary: (existing.length + numbers.length) === 0
      }
    ]
  }, existing)
}

const getFullAddress = (address) => {
  const { street_1, street_2, city, state_province, postal_code } = address
  const parts = [street_1,street_2,city,state_province,postal_code]
  return parts.filter(item => {
    return typeof(item) === 'string' && item.length > 0
  }).join(', ')
}

const getFormattedMailingAddress = (values, i) => {
  const address = {
    street_1: values[`address_${i}_street_1`],
    street_2: values[`address_${i}_street_2`],
    city: values[`address_${i}_city`],
    state_province: values[`address_${i}_state_province`],
    postal_code: values[`address_${i}_postal_code`]
  }
  address.description = getFullAddress(address)
  return address
}

const getMailingAddresses = async (contact, values) => {
  const existing = contact.related('mailing_addresses').map(email => ({
    id: email.get('id'),
    address: email.get('address'),
    street_1: email.get('address').street_1,
    is_primary: email.get('is_primary')
  }))
  return Promise.reduce(Array(3).fill(0), async (addresses, n, i) => {
    if(!values[`address_${i+1}_street_1`]) return addresses
    const found = _.find(existing, { street_1: values[`address_${i+1}_street_1`] })
    if(found) return addresses
    return [
      ...addresses,
      {
        address: getFormattedMailingAddress(values, i + 1),
        is_primary: (existing.length + addresses.length) === 0
      }
    ]
  }, existing)
}

const getOrganizationIds = async (req, values) => {
  return Promise.reduce(Array(3).fill(0), async (organizations, n, i) => {
    if(!values[`organization_${i+1}`]) return organizations
    const organization = await Organization.fetchOrCreate({
      team_id: req.team.get('id'),
      name: values[`organization_${i+1}`]
    }, {
      transacting: req.trx
    })
    return [
      ...organizations,
      ...organization ? [organization.get('id')] : []
    ]
  }, [])
}

const getChannelObjects = async (req, params) => {
  const { contact, type, email_addresses, phone_numbers, mailing_addresses } = params
  if(type === 'email' && email_addresses.length > 0) {
    return EmailAddress.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('contact_id', contact.get('id'))
      qb.whereIn('address', email_addresses.map(item => item.address))
    }).fetchAll({
      transacting: req.trx
    }).then(results => results.toArray())
  } else if(_.includes(['sms','voice'], type) && phone_numbers.length > 0) {
    return PhoneNumber.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('contact_id', contact.get('id'))
      qb.whereIn('number', phone_numbers.map(item => item.number))
    }).fetchAll({
      transacting: req.trx
    }).then(results => results.toArray())
  } else if(type === 'mail' && mailing_addresses.length > 0) {
    return MailingAddress.query(qb => {
      qb.whereRaw(`address->>'street_1' in (${mailing_addresses.map(i => '?').join(',')})`, mailing_addresses.map(item => item.address.street_1))
      qb.where('team_id', req.team.get('id'))
      qb.where('contact_id', contact.get('id'))
    }).fetchAll({
      transacting: req.trx
    }).then(results => results.toArray())
  }
  return []
}

const updateChannel = async (req, params) => {
  const { email_address_id, phone_number_id, mailing_address_id, program_id, type } = params
  const consent = await Consent.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('email_address_id', email_address_id)
    qb.where('phone_number_id', phone_number_id)
    qb.where('mailing_address_id', mailing_address_id)
    qb.where('program_id', program_id)
    qb.where('type', type)
  }).fetch({
    transacting: req.trx
  })
  if(consent) {
    if(!consent.get('optedout_at')) return consent
    await consent.save({
      optin_reason: 'consent',
      optout_reason: null,
      optedin_at: moment(),
      optedout_at: null
    }, {
      transacting: req.trx
    })
  } else {
    const code = await generateCode(req, {
      table: 'crm_consents'
    })
    return await Consent.forge({
      team_id: req.team.get('id'),
      code,
      email_address_id,
      phone_number_id,
      mailing_address_id,
      program_id,
      type,
      optin_reason: 'consent',
      optedin_at: moment()
    }).save(null, {
      transacting: req.trx
    })
  }
}

const updateChannels = async (req, params) => {
  const { channels, contact, program_id, email_addresses, phone_numbers, mailing_addresses } = params
  await Promise.mapSeries(channels, async(type) => {
    const objects = await getChannelObjects(req, {
      contact,
      type,
      email_addresses,
      phone_numbers,
      mailing_addresses
    })
    if(objects.length === 0) return
    await Promise.mapSeries(objects, async(object) => {
      await updateChannel(req, {
        email_address_id: type === 'email' ? object.get('id') : null,
        phone_number_id: _.includes(['sms','voice'], type) ? object.get('id') : null,
        mailing_address_id: type === 'mail' ? object.get('id') : null,
        program_id,
        type
      })
    })
  })
}

const processContactImport = async (req, { import_id }) => {

  const imp = await Import.query(qb => {
    qb.where('id', import_id)
  }).fetch({
    withRelated: ['asset','user'],
    transacting: req.trx
  })

  const items = await ImportItem.query(qb => {
    qb.where('import_id', imp.get('id'))
    qb.where('is_empty', false)
    qb.where('is_valid', true)
    qb.where('is_nonunique', false)
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const addresses = []
  const photos = []

  await Promise.mapSeries(items, async (item, index) => {

    const values = item.get('values')
    const { first_name, last_name, birthday, spouse, photo } = values
    let is_merged = false
    let is_ignored = false
    let email_addresses = []
    let phone_numbers = []
    let mailing_addresses = []

    const contact = await matchContact(req, {
      values
    })

    await contact.load(['email_addresses','phone_numbers','mailing_addresses'], {
      transacting: req.trx
    })

    if(imp.get('strategy') === 'ignore' && item.get('is_duplicate')) {

      is_ignored = true

    } else {

      const strategy = imp.get('strategy')

      await contact.save({
        first_name: getValue(strategy, contact.get('first_name'), first_name),
        last_name: getValue(strategy, contact.get('last_name'), last_name),
        birthday: getValue(strategy, contact.get('birthday'), birthday),
        spouse: getValue(strategy, contact.get('spouse'), spouse)
      }, {
        transacting: req.trx
      })

      if(photo && (_.isNil(contact.get('photo_id')) || strategy === 'overwrite')) {
        photos.push({
          contact_id: contact.get('id'),
          user_id: imp.get('user_id'),
          url: photo
        })
      }

      email_addresses = await getEmailAddresses(contact, values)
      if(email_addresses.length > 0) {
        await updateEmailAddresses(req, {
          contact,
          email_addresses,
          removing: false
        })
      }

      phone_numbers = await getPhoneNumbers(contact, values)
      if(phone_numbers.length > 0) {
        await updatePhoneNumbers(req, {
          contact,
          phone_numbers,
          removing: false
        })
      }

      mailing_addresses = await getMailingAddresses(contact, values)
      if(mailing_addresses.length > 0) {
        const created = await updateMailingAddresses(req, {
          contact,
          mailing_addresses,
          removing: false,
          geocode: false
        })
        created.map(address => {
          addresses.push({
            mailing_address_id: address.get('id')
          })
        })

      }

      const organization_ids = await getOrganizationIds(req, values)
      if(organization_ids.length > 0) {
        await updateOrganizations(req, {
          contact,
          organization_ids,
          removing: false
        })
      }

      await contactActivity(req, {
        user: imp.related('user'),
        contact,
        type: 'import',
        story: is_merged ? 'merged data from an import' : 'imported the contact',
        program_id: imp.get('program_id'),
        data: {
          import_id: imp.get('id'),
          import_item_id: item.get('id')
        }
      })

    }

    if(imp.get('config').list_ids) {
      await updateLists(req, {
        contact,
        list_ids: imp.get('config').list_ids,
        removing: false
      })
    }

    if(imp.get('config').topic_ids) {
      await updateTopics(req, {
        contact,
        topic_ids: imp.get('config').topic_ids,
        removing: false
      })
    }

    if(imp.get('config').channels) {
      await updateChannels(req, {
        channels: imp.get('config').channels,
        contact,
        program_id: imp.get('program_id'),
        email_addresses,
        phone_numbers,
        mailing_addresses
      })
    }

    await item.save({
      object_id: contact.get('id'),
      is_complete: true,
      is_merged,
      is_ignored
    }, {
      transacting: req.trx,
      patch: true
    })

    await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
      target: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: {
        completed: index + 1,
        total: items.length
      }
    })

  })

  await imp.save({
    stage: 'complete'
  }, {
    transacting: req.trx,
    patch: true
  })

  await Promise.map(addresses, async(job) => {
    await GeocodeMailingAddressQueue.enqueue(req, job)
  })

  await Promise.map(photos, async(job) => {
    await ContactImportPhotoQueue.enqueue(req, job)
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

  await refresh(req, [
    '/admin/crm/contacts'
  ])

}

export default processContactImport
