import Fixtures from '../../core/objects/fixtures'

const domainsFixtures = new Fixtures({

  tableName: 'maha_domains',

  records: {

    acme_com_domain: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'acme.com',
      is_primary: true
    }),

    acme_org_domain: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'acme.org',
      is_primary: false
    })

  }

})

export default domainsFixtures
