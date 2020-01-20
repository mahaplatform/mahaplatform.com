import ContactImportGeocodeQueue from '../queues/contactimport_geocode_queue'
import ContactImportPhotoQueue from '../queues/contactimport_photo_queue'
import { updateRelated } from '../../../core/services/routes/relations'
import ImportSerializer from '../../maha/serializers/import_serializer'
import { updateMailingAddresses } from '../services/mailing_addresses'
import { updateEmailAddresses } from '../services/email_addresses'
import { updatePhoneNumbers } from '../services/phone_numbers'
import { refresh } from '../../../core/services/routes/emitter'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import generateCode from '../../../core/utils/generate_code'
import { contactActivity } from '../services/activities'
import ImportItem from '../../maha/models/import_item'
import socket from '../../../core/services/emitter'
import EmailAddress from '../models/email_address'
import Organization from '../models/organization'
import Queue from '../../../core/objects/queue'
import Import from '../../maha/models/import'
import Contact from '../models/contact'
import Consent from '../models/consent'
import moment from 'moment'
import _ from 'lodash'

const getContact = async (req, email) => {

  const email_address = email ? await EmailAddress.query(qb => {
    qb.where('address', email)
  }).fetch({
    withRelated: ['contact.email_addresses','contact.phone_numbers','contact.mailing_addresses'],
    transacting: req.trx
  }) : null

  if(email_address) return email_address.related('contact')

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  return await Contact.forge({
    team_id: req.team.get('id'),
    code
  }).save(null, {
    transacting: req.trx
  })

}

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
        address: values[`email_${i+1}`],
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
    id: email.get('street_1'),
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

const processor = async (job, trx) => {

  const imp = await Import.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    withRelated: ['asset','team','user'],
    transacting: trx
  })

  const items = await ImportItem.query(qb => {
    qb.where('import_id', imp.get('id'))
    qb.where('is_valid', true)
    qb.where('is_nonunique', false)
  }).fetchAll({
    transacting: trx
  }).then(results => results.toArray())

  const req = {
    trx,
    team: imp.related('team')
  }

  await Promise.mapSeries(items, async (item, index) => {

    const values = item.get('values')

    const { first_name, last_name, birthday, spouse, photo, email_1 } = values

    let is_merged = false

    let is_ignored = false

    const contact = await getContact(req, email_1)

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
        transacting: trx
      })

      if(photo && (_.isNil(contact.get('photo_id')) || strategy === 'overwrite')) {
        await ContactImportPhotoQueue.enqueue(req, {
          contact_id: contact.get('id'),
          user_id: imp.get('user_id'),
          url: photo
        })
      }

      const email_addresses = await getEmailAddresses(contact, values)
      if(email_addresses.length > 0) {
        await updateEmailAddresses(req, {
          contact,
          email_addresses
        })
      }

      const phone_numbers = await getPhoneNumbers(contact, values)
      if(phone_numbers.length > 0) {
        await updatePhoneNumbers(req, {
          contact,
          phone_numbers
        })
      }

      const mailing_addresses = await getMailingAddresses(contact, values)
      if(mailing_addresses.length > 0) {
        const addresses = await updateMailingAddresses(req, {
          contact,
          mailing_addresses
        })
        await Promise.map(addresses, async (address) => {
          await ContactImportGeocodeQueue.enqueue(req, {
            id: address.get('id')
          })
        })
      }

      const organization_ids = await getOrganizationIds(req, values)
      if(organization_ids.length > 0) {
        await updateRelated(req, {
          object: contact,
          related: 'organizations',
          table: 'crm_contacts_organizations',
          ids: organization_ids,
          foreign_key: 'contact_id',
          related_foreign_key: 'organization_id'
        })
      }

      await contactActivity(req, {
        user: imp.related('user'),
        contact,
        type: 'edit',
        story: is_merged ? 'merged data from an import' : 'imported the contact',
        data: {
          changes: []
        }
      })

    }

    if(imp.get('config').list_ids) {
      await updateRelated(req, {
        object: contact,
        related: 'lists',
        table: 'crm_subscriptions',
        ids: imp.get('config').list_ids,
        foreign_key: 'contact_id',
        related_foreign_key: 'list_id'
      })
    }

    if(imp.get('config').topic_ids) {
      await updateRelated(req, {
        object: contact,
        related: 'topics',
        table: 'crm_interests',
        ids: imp.get('config').topic_ids,
        foreign_key: 'contact_id',
        related_foreign_key: 'topic_id'
      })
    }

    if(imp.get('config').channels) {
      // const existing = contact.related('consents').map(consent => ({
      //   program_id: consent.get('program_id'),
      //   type: consent.get('type')
      // }))
      // await Promise.map(imp.get('config').channels, async (channel) => {
      //   const { program_id, type } = channel
      //   const found = _.find(existing, { program_id, type })
      //   if(!found) return
      //   const code = await generateCode(req, {
      //     table: 'crm_consents'
      //   })
      //   return await Consent.forge({
      //     team_id: req.team.get('id'),
      //     code,
      //     program_id,
      //     type,
      //     optin_reason: '',
      //     optedin_at: moment()
      //   }).save(null, {
      //     transacting: req.trx
      //   })
      // })
    }

    await item.save({
      object_id: contact.get('id'),
      is_complete: true,
      is_merged,
      is_ignored
    }, {
      patch: true,
      transacting: trx
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
    patch: true,
    transacting: trx
  })

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('maha_imports.id', imp.get('id'))
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: trx
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

const failed = async (job, err) => {
  await socket.in(`/admin/imports/${job.data.import_id}`).emit('message', {
    target: `/admin/imports/${job.data.import_id}`,
    action: 'failed',
    data: [job,err]
  })
}

const ContactImportProcessQueue = new Queue({
  name: 'contactimport_process',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default ContactImportProcessQueue
