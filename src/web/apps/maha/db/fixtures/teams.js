import Fixtures from '../../../../core/objects/fixtures'
import fs from 'fs'
import path from 'path'

const email_template = fs.readFileSync(path.resolve(__dirname,'..','..','templates','email.ejs'), 'utf8')

const teamsFixtures = new Fixtures({

  tableName: 'maha_teams',

  records: {

    acme: (data) => ({
      title: 'Acme Industries',
      subdomain: 'acme',
      color: 'red',
      logo_id: data.maha_assets.acme.id,
      email_template
    }),

    soylent: (data) => ({
      title: 'Soylent Corp',
      subdomain: 'soylent',
      color: 'green',
      logo_id: data.maha_assets.soylent.id,
      email_template
    }),

    wonka: (data) => ({
      title: 'Wonka Industries',
      subdomain: 'wonka',
      color: 'purple',
      logo_id: data.maha_assets.wonka.id,
      email_template
    })

  }

})

export default teamsFixtures
