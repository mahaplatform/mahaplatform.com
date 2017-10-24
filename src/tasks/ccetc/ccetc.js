import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'
import moment from 'moment'
import _ from 'lodash'
import mime from 'mime-types'
import aws from 'aws-sdk'

export const import_20170622 = async () => {

  try {

    const employees = toMatrix('20170622/employees.tsv', '\t', true)
    const projects = toMatrix('20170622/projects.tsv', '\t', true)
    const expenses = toMatrix('20170622/expense_types.tsv', '\t', true)
    const competencies = toMatrix('20170622/competencies.tsv', '\t', true)
    const expectations = toMatrix('20170622/expectations.tsv', '\t')

    const supervisors = {}

    const assets = [{
      id: 1,
      team_id: 1,
      original_file_name: 'cornell.jpg',
      file_name: 'cornell.jpg',
      content_type: 'image/jpeg',
      file_size: 17449,
      chunks_total: 1,
      created_at: moment(),
      updated_at: moment()
    }]

    const userData = employees.reduce((data, record) => {

      const user = _.find(data.users, { email: `${record[2]}@cornell.edu` })

      let user_id = null

      if(!user) {

        user_id = (data.users.length + 1)

        const filename = `${record[2]}.jpg`

        const filepath = path.resolve('files', '20170622', 'photos', filename)

        const photoExists = fs.existsSync(filepath)

        const asset_id = photoExists ? (data.assets.length + 1) : null

        if(photoExists) {

          data.assets.push({
            id: asset_id,
            team_id: 1,
            original_file_name: filename,
            file_name: filename,
            content_type: mime.lookup(filepath),
            file_size: fs.statSync(filepath).size,
            chunks_total: 1,
            created_at: moment(),
            updated_at: moment()
          })

        }

        data.users.push({
          id: user_id,
          team_id: 1,
          first_name: record[0],
          last_name: record[1],
          email: `${record[2]}@cornell.edu`,
          employee_id: record[3],
          password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
          password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
          is_active: record[2] === 'gmk8',
          photo_id: asset_id,
          activated_at: record[2] === 'gmk8' ? moment() : null,
          created_at: moment(),
          updated_at: moment()
        })

        const roles = [5,6,7,8,9]

        roles.map(index => {
          if(record[index] == 1) {
            data.users_roles.push({
              user_id,
              role_id: index - 4
            })
          }
        })

      } else {

        user_id = user.id

      }

      if(!supervisors[record[4]]) supervisors[record[4]] = []

      supervisors[record[4]].push(user_id)

      if(record[10]) {

        const group = findOrCreate(data.groups, { team_id: 1, title: sanitize(record[10]) }, true)

        data.users_groups.push({
          user_id,
          group_id: group.id
        })

      }

      return data

    }, { assets, users: [], users_roles: [], groups: [], users_groups: [] })

    const supervisorData = Object.keys(supervisors).reduce((data, name) => {

      const [,first_name,last_name] = name.match(/(.*) (.*)/)

      const supervisor = _.find(userData.users, { first_name, last_name })

      data.supervisors.push({
        team_id: 1,
        user_id: supervisor.id,
        created_at: moment(),
        updated_at: moment()
      })

      data.supervisions = [
        ...data.supervisions,
        ...supervisors[name].map(employee_id => ({
          team_id: 1,
          supervisor_id: supervisor.id,
          employee_id,
          created_at: moment(),
          updated_at: moment()
        }))
      ]

      return data

    }, { supervisors: [], supervisions: [] })

    const projectData = projects.reduce((data, record) => {

      const project_id = (data.projects.length + 1)

      data.projects.push({
        id: project_id,
        team_id: 1,
        title: record[1].trim().replace(/'/g, ''),
        is_active: true,
        integration: {
          project_code: record[0].trim(),
          program_code: record[2].trim(),
          source_code: record[3].trim(),
          match: record[4].trim()
        },
        created_at: moment(),
        updated_at: moment()
      })

      const fieldIndexes = [5,6,7]

      fieldIndexes.map(index => {

        if(record[index].length === 0) return

        record[index].split('/').map(netid => {

          const member = _.find(userData.users, { email: `${netid}@cornell.edu`})

          if(member) {

            const user_id = member.id

            data.members.push({
              team_id: 1,
              project_id,
              user_id,
              member_type_id: index - 4,
              is_active: true,
              created_at: moment(),
              updated_at: moment()
            })

          }

        })

      })


      return data

    }, { projects: [], members: [] })

    const expenseData = expenses.reduce((data, record) => {

      const expense_type_id = (data.expense_types.length + 1)

      data.expense_types.push({
        id: expense_type_id,
        team_id: 1,
        title: sanitize(record[0]),
        description: sanitize(record[1]),
        integration: {
          expense_code: sanitize(record[2]),
          source_code: sanitize(record[3])
        },
        created_at: moment(),
        updated_at: moment()
      })

      return data

    }, { expense_types: []})

    const competencyData = competencies.reduce((data, record) => {

      if(record[4].length > 1) {

        const category = findOrCreate(data.categories, { team_id: 1, title: sanitize(record[0]) }, true)

        const competency = findOrCreate(data.competencies, { team_id: 1, category_id: category.id, title: sanitize(record[1]), level: parseInt(record[2]), description: sanitize(record[3]) }, true, { title: sanitize(record[1]) })

        const resource = findOrCreate(data.resources, { team_id: 1, title: sanitize(record[4]), description: sanitize(record[5]), url: record[6], review_count: 0, review_average: 0 }, true, { title: sanitize(record[4]) })

        data.competencies_resources.push({
          competency_id: competency.id,
          resource_id: resource.id
        })

      }

      return data

    }, { categories: [], competencies: [], resources: [], competencies_resources: [] })

    const expectationsData = expectations.reduce((data, record, index) => {

      const competency_id = record[2].length > 0 ? findOrCreate(competencyData.competencies, { team_id: 1, title: sanitize(record[2]), level: parseInt(record[3]) }, true).id : null

      const classification_id = record[0].length > 0 ? findOrCreate(data.classifications, { team_id: 1, title: sanitize(record[0]) }, true).id : null

      data.expectations.push({
        team_id: 1,
        classification_id,
        competency_id
      })

      return data

    }, { expectations: [], classifications: [] })

    writeFile('assets', 'maha_assets', userData.assets)

    writeFile('users', 'maha_users', userData.users)

    writeFile('users_roles', 'maha_users_roles', userData.users_roles)

    writeFile('groups', 'maha_groups', userData.groups)

    writeFile('users_groups', 'maha_users_groups', userData.users_groups)

    writeFile('projects', 'expenses_projects', projectData.projects)

    writeFile('members', 'expenses_members', projectData.members)

    writeFile('expense_types', 'expenses_expense_types', expenseData.expense_types)

    writeFile('supervisors', 'competencies_supervisors', supervisorData.supervisors)

    writeFile('supervisions', 'competencies_supervisions', supervisorData.supervisions)

    writeFile('categories', 'competencies_categories', competencyData.categories)

    writeFile('competencies', 'competencies_competencies', competencyData.competencies)

    writeFile('resources', 'competencies_resources', competencyData.resources)

    writeFile('competencies_resources', 'competencies_competencies_resources', competencyData.competencies_resources)

    writeFile('classifications', 'competencies_classifications', expectationsData.classifications)

    writeFile('expectations', 'competencies_expectations', expectationsData.expectations)

    aws.config.constructor({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      region: process.env.AWS_REGION || ''
    })

    if(process.env.ASSET_STORAGE === 's3') {

      const s3 = new aws.S3()

      await Promise.map(userData.assets, async asset => {

        const filename = asset.file_name

        const contentType = asset.content_type

        const filepath = path.join('files', '20170622', 'photos', asset.file_name)

        await s3.upload({
          Bucket: process.env.AWS_BUCKET,
          Key: `assets/${asset.id}/${asset.file_name}`,
          ACL: 'public-read',
          Body: fs.readFileSync(filepath),
          ContentType: contentType
        }).promise()

      })

    } else if (process.env.ASSET_STORAGE === 'local') {

      userData.assets.map(asset => {

        const filepath = path.join('files', '20170622', 'photos', asset.file_name)

        if(!fs.existsSync(path.resolve('public', 'assets'))) fs.mkdirSync(path.resolve('public', 'assets'))

        if(!fs.existsSync(path.resolve('public', 'assets', asset.id.toString()))) fs.mkdirSync(path.resolve('public', 'assets', asset.id.toString()))

        fs.writeFileSync(path.resolve('public', 'assets', asset.id.toString(), asset.file_name), fs.readFileSync(filepath))

      })

    }



  } catch(e) {

    console.log(e)

  }

}

const writeFile = (name, tableName, records) => {

  const object = _.upperFirst(_.camelCase(name))

  fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'src', 'db', 'seeds', `${name}.js`), `import { Fixtures } from 'maha'\n\nconst ${_.camelCase(object)}Fixtures = new Fixtures(${toJSON({ tableName, records })})\n\nexport default ${_.camelCase(object)}Fixtures\n\n`)

}


const toJSON = (object) => {
  return JSON.stringify(object, null, '  ').replace(/\"(\w*)\"\:/g, '$1:').replace(/\"/g, '\'')
}

const toMatrix = (filename, delimiter, excludeHeaders = false) => {
  const parsed = parse(fs.readFileSync(path.resolve('files', filename), 'utf8'), { delimiter, quote: '^' })
  return excludeHeaders ? parsed.slice(1) : parsed
}

const sanitize = (string) => {
  if(!string) return null
  return string.replace(/\'/g,'').trim()
}

const findOrCreate = (collection, data, withId, compare = null) => {

  const item = _.find(collection, compare || data)

  if(item) return item

  const id = collection.length + 1

  const base = (withId) ? { id, team_id: 1 } : { team_id: 1 }

  const newitem = _.assign(base, data, {
    created_at: moment(),
    updated_at: moment()
  })

  collection.push(newitem)

  return newitem

}
