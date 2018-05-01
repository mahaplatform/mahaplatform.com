import { Fixtures } from 'maha'
import fs from 'fs'
import path from 'path'

const teamFixtures = new Fixtures({
  tableName: 'maha_teams',
  records: [
    {
      id: 1,
      title: 'CCE Tompkins',
      subdomain: 'ccetompkins',
      color: 'red',
      logo_id: 1
    }
  ]
})

export default teamFixtures
