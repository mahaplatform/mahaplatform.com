import { updateRelated } from '../../../core/services/routes/relations'
import ImportSerializer from '../../maha/serializers/import_serializer'
import { updateMailingAddresses } from '../services/mailing_addresses'
import { updateEmailAddresses } from '../services/email_addresses'
import { updatePhoneNumbers } from '../services/phone_numbers'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import generateCode from '../../../core/utils/generate_code'
import ImportItem from '../../maha/models/import_item'
import socket from '../../../core/services/emitter'
import geocode from '../../maha/services/geocode'
import Queue from '../../../core/objects/queue'
import Import from '../../maha/models/import'
import Contact from '../models/contact'

const getEmailAddresses = async (values) => {
  return Array(3).fill(0).reduce((addresses, n, i) => [
    ...addresses,
    ...values[`email_${i+1}`] ? [{
      address: values[`email_${i+1}`],
      is_primary: addresses.length === 0
    }] : []
  ], [])
}

const getPhoneNumbers = async (values) => {
  return Array(3).fill(0).reduce((numbers, n, i) => {
    if(!values[`phone_${i+1}`]) return numbers
    const parsed = parsePhoneNumberFromString(values[`phone_${i+1}`], 'US')
    const number = []
    number.push(parsed.number)
    if(parsed.ext) number.push(parsed.ext)
    return [
      ...numbers,
      {
        number: number.join('x'),
        is_primary: numbers.length === 0
      }
    ]
  }, [])
}

const getMailingAddresses = async (values) => {
  return Promise.reduce(Array(3).fill(0), async (addresses, n, i) => {
    if(!values[`address_${i+1}_street_1`]) return addresses
    const address = {
      street_1: values[`address_${i+1}_street_1`],
      street_2: values[`address_${i+1}_street_2`],
      city: values[`address_${i+1}_city`],
      state_province: values[`address_${i+1}_state_province`],
      postal_code: values[`address_${i+1}_postal_code`]
    }
    // const geocoded = await geocode(address)
    return [
      ...addresses,
      {
        address: {
          ...address,
          // ...geocoded
        },
        is_primary: addresses.length === 0
      }
    ]
  }, [])
}

const processor = async (job, trx) => {

  const imp = await Import.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    withRelated: ['asset','team'],
    transacting: trx
  })

  const items = await ImportItem.where({
    import_id: imp.get('id')
  }).fetchAll({
    transacting: trx
  }).then(results => results.toArray())

  const req = {
    trx,
    team: imp.related('team')
  }

  await Promise.mapSeries(items, async (item, index) => {

    const code = await generateCode(req, {
      table: 'crm_contacts'
    })

    const email_addresses = await getEmailAddresses(item.get('values'))

    const phone_numbers = await getPhoneNumbers(item.get('values'))

    const mailing_addresses = await getMailingAddresses(item.get('values'))

    const contact = await Contact.forge({
      team_id: req.team.get('id'),
      code,
      first_name: item.get('values').first_name,
      last_name: item.get('values').last_name
    }).save(null, {
      transacting: trx
    })

    if(email_addresses.length > 0) {
      await updateEmailAddresses(req, {
        contact,
        email_addresses
      })
    }

    if(phone_numbers.length > 0) {
      await updatePhoneNumbers(req, {
        contact,
        phone_numbers
      })
    }

    if(mailing_addresses.length > 0) {
      await updateMailingAddresses(req, {
        contact,
        mailing_addresses
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

    // await updateRelated(req, {
    //   object: contact,
    //   related: 'organizations',
    //   table: 'crm_contacts_organizations',
    //   ids: req.body.organization_ids,
    //   foreign_key: 'contact_id',
    //   related_foreign_key: 'organization_id'
    // })

    const is_merged = false

    const is_ignored = false

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