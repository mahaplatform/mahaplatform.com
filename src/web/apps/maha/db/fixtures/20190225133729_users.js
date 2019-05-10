import bcrypt from 'bcrypt-nodejs'
import moment from 'moment'
import faker from 'faker'

exports.seed = async (knex, Promise) => {

  const password_salt = bcrypt.genSaltSync(10)
  const password_hash = bcrypt.hashSync('test', password_salt)

  await knex('users').del()

  await knex('users').insert([
    {
      first_name: 'Ken',
      last_name: 'Schlather',
      email: 'ks47@cornell.edu',
      password_salt,
      password_hash,
      photo_id: 2,
      created_at: moment(),
      updated_at: moment()
    }, {
      first_name: 'Sharon',
      last_name: 'Anderson',
      email: 'ska2@cornell.edu',
      password_salt,
      password_hash,
      photo_id: 3,
      created_at: moment(),
      updated_at: moment()
    }, {
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'gmk8@cornell.edu',
      password_salt,
      password_hash,
      photo_id: 4,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
