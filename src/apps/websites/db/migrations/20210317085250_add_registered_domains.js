import Domain from '@apps/websites/models/domain'

const contact = {
  first_name: 'Greg',
  last_name: 'Kops',
  email: 'gmk8@cornell.edu',
  phone: '+16072775647',
  address: {
    city: 'Ithaca',
    country: 'US',
    county: 'Tompkins County',
    description: '322 S Geneva St, Ithaca, NY 14850, USA',
    latitude: 42.435992,
    longitude: -76.500835,
    postal_code: '14850',
    state_province: 'NY',
    street_1: '322 S Geneva St',
    street_2: null
  }
}

const createDomain = async (req, { name, type, aws_zone_id }) => {
  await Domain.forge({
    team_id: 1,
    name,
    is_primary: false,
    aws_zone_id,
    auto_renew: true,
    admin_contact: contact,
    registrant_contact: contact,
    tech_contact: contact,
    type,
    registration_status: 'success',
    dns_status: 'success',
    status: 'active',
    expires_on: '2022-03-16',
    is_locked: true
  }).save(null, {
    transacting: req.trx
  })
}

const AddRegisteredDomains = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('websites_domains', (table) => {
      table.dropColumn('auth_code')
    })

    const req = { trx: knex }

    await createDomain(req, {
      name: 'almahaplatform.net',
      aws_zone_id: 'Z0460518JR19UX5GM3CL',
      type: 'registration'
    })

    await createDomain(req, {
      name: 'mahaplatform.net',
      aws_zone_id: 'Z04615573K2T176MLG0ER',
      type: 'registration'
    })

    await createDomain(req, {
      name: 'foodbip.org',
      aws_zone_id: 'Z2RE916I52A5HX',
      type: 'dns'
    })

  },

  down: async (knex) => {
  }

}

export default AddRegisteredDomains
