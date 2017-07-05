import { Task } from 'maha'
import Promise from 'bluebird'
import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'
import moment from 'moment'
import _ from 'lodash'
import mime from 'mime-types'

export default (commander) => {

  Task({
    commander,
    command: 'ccetc:import:20170622',
    description: 'Migrate database',
    processor: import_20170622
  })

}

const import_20170622 = async () => {

  try {

    const employees = toMatrix('20170622/employees.tsv', '\t')
    const projects = toMatrix('20170622/projects.tsv', '\t')
    const expenses = toMatrix('20170622/expense_types.tsv', '|')
    const members = toMatrix('20170622/members.tsv', '|')
    const competencies = toMatrix('20170622/competencies.tsv', '\t')

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

      const user_id = (data.users.length + 1)

      const filename = `${record[2]}.jpg`

      const filepath = path.join(__dirname, '..', '..', '..', 'data', 'photos', filename)

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
        password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
        password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
        is_active: true,
        photo_id: asset_id,
        created_at: moment(),
        updated_at: moment()
      })

      if(!supervisors[record[3]]) supervisors[record[3]] = []

      supervisors[record[3]].push(user_id)

      const roles = [4,5,6,7,8]

      roles.map(index => {
        if(record[index] == 1) {
          data.users_roles.push({
            user_id,
            role_id: index - 3
          })
        }
      })

      return data

    }, { assets, users: [], users_roles: [] })

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
        code: record[0].trim(),
        is_active: true,
        created_at: moment(),
        updated_at: moment()
      })

      record[2].split('/').map(netid => {

        const user_id = _.find(userData.users, { email: `${netid}@cornell.edu`}).id

        data.members.push({
          team_id: 1,
          project_id,
          user_id,
          member_type_id: 1,
          is_active: true,
          created_at: moment(),
          updated_at: moment()
        })

      })

      return data

    }, { projects: [], members: [] })

    const expenseData = expenses.reduce((data, record) => {

      const expense_type_id = (data.expense_types.length + 1)

      data.expense_types.push({
        id: expense_type_id,
        team_id: 1,
        code: record[0].trim(),
        title: record[1].trim(),
        description: record[2].trim(),
        created_at: moment(),
        updated_at: moment()
      })

      return data

    }, { expense_types: []})

    const memberData = members.reduce((data, record) => {

      const project_id = _.find(projectData.projects, { code: record[0] }).id

      const user_id = _.find(userData.users, { email: `${record[1]}@cornell.edu` }).id

      const member_types = {
        owner: 1,
        approver: 2,
        member: 3
      }

      data.members.push({
        team_id: 1,
        project_id,
        user_id,
        member_type_id: member_types[record[2]],
        is_active: true,
        created_at: moment(),
        updated_at: moment()
      })

      return data

    }, { members: projectData.members })

    const competencyData = competencies.reduce((data, record) => {

      const category = findOrCreate(data.categories, { title: sanitize(record[0]) }, true)

      const competency = findOrCreate(data.competencies, { category_id: category.id, title: sanitize(record[1]), level: parseInt(record[2]), description: sanitize(record[3]) }, true, { title: sanitize(record[1]) })

      const resource = findOrCreate(data.resources, { title: sanitize(record[4]), description: sanitize(record[5]), url: record[6] }, true, { title: sanitize(record[4]) })

      data.competencies_resources.push({
        competency_id: competency.id,
        resource_id: resource.id
      })

      return data

    }, { categories: [], competencies: [], resources: [], competencies_resources: [] })

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'assets.js'), `export default ${toJSON({ tableName: 'maha_assets', records: userData.assets })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'users.js'), `export default ${toJSON({ tableName: 'maha_users', records: userData.users })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'users_roles.js'), `export default ${toJSON({ tableName: 'maha_users_roles', records: userData.users_roles })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'projects.js'), `export default ${toJSON({ tableName: 'expenses_projects', records: projectData.projects })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'members.js'), `export default ${toJSON({ tableName: 'expenses_members', records: memberData.members })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'expense_types.js'), `export default ${toJSON({ tableName: 'expenses_expense_types', records: expenseData.expense_types })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'supervisors.js'), `export default ${toJSON({ tableName: 'competencies_supervisors', records: supervisorData.supervisors })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'supervisions.js'), `export default ${toJSON({ tableName: 'competencies_supervisions', records: supervisorData.supervisions })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'categories.js'), `export default ${toJSON({ tableName: 'competencies_categories', records: competencyData.categories })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'competencies.js'), `export default ${toJSON({ tableName: 'competencies_competencies', records: competencyData.competencies })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'resources.js'), `export default ${toJSON({ tableName: 'competencies_resources', records: competencyData.resources })}`)

    await fs.writeFileSync(path.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'competencies_resources.js'), `export default ${toJSON({ tableName: 'competencies_competencies_resources', records: competencyData.competencies_resources })}`)

  } catch(e) {

    console.log(e)

  }

}

const toJSON = (object) => {
  return JSON.stringify(object, null, '  ').replace(/\"(\w*)\"\:/g, '$1:').replace(/\"/g, '\'')
}

const toMatrix = (filename, delimiter) => {
  return parse(fs.readFileSync(path.join(__dirname, '..', '..', 'files', filename), 'utf8'), { delimiter, quote: '^' })
}

const sanitize = (string) => {
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
