import { knex, createAsset, Team, User } from 'maha'
import parse from 'csv-parse/lib/sync'
import mime from 'mime-types'
import moment from 'moment'
import aws from 'aws-sdk'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'
import request from 'request-promise'

export const setup = async () => {
  
  await knex.transaction(async trx => {

    const cceniagra = await Team.forge({
      title: 'CCE Niagra',
      subdomain: 'cceniagra',
      color: 'red'      
    }).save(null, { transacting: trx })
    
    const team_id = cceniagra.get('id')

    await knex('maha_strategies').transacting(trx).insert({
      team_id,
      name: 'local',
      created_at: moment(),
      updated_at: moment()
    })

    await knex('maha_installations').transacting(trx).insert([
      {
        team_id,
        app_id: 1,
        settings: {},
        created_at: moment(),
        updated_at: moment()
      }, {
        team_id,
        app_id: 4,
        settings: {},
        created_at: moment(),
        updated_at: moment()
      }
    ])
    
    const platformAdministrator = await knex('maha_roles').transacting(trx).insert({
      team_id,
      title: 'Platform Administrators',
      description: 'Users who have adminstrative access to the entire platform',
      created_at: moment(),
      updated_at: moment()
    }).returning('id')

    await knex('maha_roles_apps').transacting(trx).insert([
      {
        role_id: platformAdministrator[0],
        app_id: 1
      }, {
        role_id: platformAdministrator[0],
        app_id: 4
      }
    ])

    await knex('maha_roles_rights').transacting(trx).insert([
      {
        role_id: platformAdministrator[0],
        right_id: 1
      }, {
        role_id: platformAdministrator[0],
        right_id: 2
      }, {
        role_id: platformAdministrator[0],
        right_id: 3
      }
    ])
    
    const users = toMatrix('cceniagra/users.tsv', '\t', true)    

    await Promise.mapSeries(users, async line => {

      const url = line[4]
      
      const userAssetData = await downloadAsset(url)

      const userAsset = await createAsset({
        team_id,
        file_name: url.split('/').pop(),
        content_type: 'image/jpeg',
        file_data: userAssetData
      }, trx)
    
      const user = await User.forge({
        team_id,
        first_name: line[0],
        last_name: line[1],
        email: line[2],
        password: 'cceniagra',
        photo_id: userAsset.get('id'),
        is_active: line[3] === '1',
        activated_at: (line[3] === '1') ? moment() : null,
        values: {}
      }).save(null, { transacting: trx })
      
      await knex('maha_users_roles').transacting(trx).insert({
        user_id: user.get('id'),
        role_id: platformAdministrator[0]
      })

    })
    
    const attractions = toMatrix('cceniagra/attractions.tsv', '\t', true)    
    
    await Promise.mapSeries(attractions, async line => {
      
      const county_id = await findOrCreateCountyId(team_id, _.capitalize(line[6]), trx)

      const attraction = await knex('eatfresh_attractions').transacting(trx).insert({
        team_id,
        title: line[0],
        address_1: line[1],
        address_1: line[2],
        city: line[3],
        state: line[4],
        zip: line[5],  
        county_id,      
        phone: line[7],
        hours_of_operation: line[8],
        website: line[9],
        facebook: line[10],
        is_free_range: line[11].toLowerCase() === 'yes',
        is_vegetarian: line[12].toLowerCase() === 'yes',
        is_organic: line[13].toLowerCase() === 'yes',
        is_accessible: line[14].toLowerCase() === 'yes',
        is_family_friendly: line[15].toLowerCase() === 'yes',
        is_senior: line[16].toLowerCase() === 'yes',
        is_military: line[17].toLowerCase() === 'yes',
        is_family_owned: line[18].toLowerCase() === 'yes',
        created_at: moment(),
        updated_at: moment()
      }).returning('id')
      
      const attraction_id = attraction[0]
            
      await Promise.mapSeries([19,20,21,22,23,24], async index => {

        const category_id = await findOrCreateRelatedId('eatfresh_categories', team_id, _.upperFirst(line[index]), trx)
        
        if(!category_id) return
        
        await knex('eatfresh_categories_attractions').transacting(trx).insert({
          attraction_id,
          category_id
        })
        
      })
      
      await Promise.mapSeries([25,26,27,28,29,30], async index => {

        const offering_id = await findOrCreateRelatedId('eatfresh_offerings', team_id, _.upperFirst(line[index]), trx)
        
        if(!offering_id) return

        await knex('eatfresh_offerings_attractions').transacting(trx).insert({
          attraction_id,
          offering_id
        })
        
      })
    
    })
    
    try {

      const offerings = toMatrix('cceniagra/offerings.tsv', '\t', true)    
      
      await Promise.mapSeries(offerings, async line => {
        
        console.log(`Offering: ${line[0]}`)

        const [,url] = line[1].match(/^([^?]*).*$/)
        
        let offeringAsset = null
        
        if(url) {
        
          const offeringAssetData = await downloadAsset(url)
        
          offeringAsset = await createAsset({
            team_id,
            file_name: url.split('/').pop(),
            content_type: 'image/jpeg',
            file_data: offeringAssetData
          }, trx)
        
        }
        
        const offering_id = await findOrCreateRelatedId('eatfresh_offerings', team_id, _.upperFirst(line[0]), trx)
        
        if(!offering_id || !offeringAsset) return
          
        await knex('eatfresh_offerings').transacting(trx).where({ id: offering_id }).update({
          photo_id: offeringAsset.get('id')
        })

      })

      const categories = toMatrix('cceniagra/categories.tsv', '\t', true)    
      
      await Promise.mapSeries(categories, async line => {
        
        console.log(`Category: ${line[0]}`)
      
        const [,url] = line[1].match(/^([^?]*).*$/)
        
        let categoryAsset = null
        
        if(url) {
        
          const categoryAssetData = await downloadAsset(url)
        
          categoryAsset = await createAsset({
            team_id,
            file_name: url.split('/').pop(),
            content_type: 'image/jpeg',
            file_data: categoryAssetData
          }, trx)

        }
      
        const category_id = await findOrCreateRelatedId('eatfresh_categories', team_id, _.upperFirst(line[0]), trx)

        if(!category_id || !categoryAsset) return

        await knex('eatfresh_categories').transacting(trx).where({ id: category_id }).update({
          photo_id: categoryAsset.get('id')
        })
      
      })
      
    } catch(err) {
      
      console.log(err)
      
    }

  })

}

const findOrCreateCountyId = async (team_id, name, trx) => {
  
  if(_.isEmpty(name)) return null
  
  const county = await knex('eatfresh_counties').transacting(trx).where({ name })
  
  if(county[0]) return county[0].id
  
  const newcounty = await knex('eatfresh_counties').transacting(trx).insert({
    team_id,
    name,
    created_at: moment(),
    updated_at: moment()
  }).returning('id')
  
  newcounty[0].id
  
}

const findOrCreateRelatedId = async (table, team_id, title, trx) => {
  
  if(_.isEmpty(title)) return null
  
  const item = await knex(table).transacting(trx).where({ title })
  
  if(item[0]) return item[0].id
  
  const newitem = await knex(table).transacting(trx).insert({
    team_id,
    title,
    created_at: moment(),
    updated_at: moment()
  }).returning('id')
  
  newitem[0].id
  
}

const toMatrix = (filename, delimiter, excludeHeaders = false) => {
  const parsed = parse(fs.readFileSync(path.resolve('files', filename), 'utf8'), { delimiter, quote: '^' })
  return excludeHeaders ? parsed.slice(1) : parsed
}

const downloadAsset = async (uri) => {
  
  const fileName = uri.split('/').pop()
  
  const filePath = path.join('tmp', fileName)

  if(fs.existsSync(filePath)) return fs.readFileSync(filePath)
  
  const fileData = await request({
    method: 'GET',
    uri,
    encoding: null
  })
  
  fs.writeFileSync(filePath, fileData)

  return fileData
  
}