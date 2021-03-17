import { audit } from '@core/services/routes/audit'
import Domain from '@apps/websites/models/domain'
import User from '@apps/maha/models/user'

const createDomain = async (req, { story, name, type, aws_zone_id, expires_on }) => {

  const domain = await Domain.forge({
    team_id: 1,
    name,
    is_primary: false,
    aws_zone_id,
    auto_renew: true,
    type,
    registration_status: 'success',
    dns_status: 'success',
    status: 'active',
    expires_on,
    is_locked: true
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story,
    auditable: domain
  })

}

const AddRegisteredDomains = {

  databaseName: 'maha',

  up: async (knex) => {

    const req = { trx: knex }

    req.user = await User.where('id', 79).fetch({
      withRelated: ['team'],
      transacting: req.trx
    })

    req.team = req.user.related('team')

    await createDomain(req, {
      name: 'mahaplatform.net',
      aws_zone_id: 'Z04615573K2T176MLG0ER',
      expires_on: '2022-03-16',
      type: 'registration',
      story: 'registered'
    })

    await createDomain(req, {
      name: 'foodbip.org',
      aws_zone_id: 'Z2RE916I52A5HX',
      type: 'dns',
      story: 'mapped'
    })

  },

  down: async (knex) => {
  }

}

export default AddRegisteredDomains
