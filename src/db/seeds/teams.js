import { Fixtures } from 'maha'
import fs from 'fs'
import path from 'path'

const email_template = fs.readFileSync(path.resolve(__dirname,'..','..','..','node_modules','maha','src','platform','templates','email.ejs'), 'utf8')

const teamFixtures = new Fixtures({
  tableName: 'maha_teams',
  records: [
    {
      id: 1,
      title: 'CCE Tompkins',
      subdomain: 'ccetompkins',
      color: 'red',
      email_template,
      logo_id: 1
    }
  ]
})

export default teamFixtures
