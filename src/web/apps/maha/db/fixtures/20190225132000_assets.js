const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('assets').del()

  await knex('assets').insert([
    {
      id: 1,
      original_file_name: 'ccetompkins.jpg',
      file_name: 'ccetompkins.jpg',
      content_type: 'image/jpeg',
      file_size: 1024,
      chunks_total: 1,
      status: 'assembled',
      width: 100,
      height: 100,
      created_at: moment(),
      updated_at: moment()
    }, {
      id: 2,
      original_file_name: 'ken.jpg',
      file_name: 'ken.jpg',
      content_type: 'image/jpeg',
      file_size: 1024,
      chunks_total: 1,
      status: 'assembled',
      width: 100,
      height: 100,
      created_at: moment(),
      updated_at: moment()
    }, {
      id: 3,
      original_file_name: 'sharon.jpg',
      file_name: 'sharon.jpg',
      content_type: 'image/jpeg',
      file_size: 1024,
      chunks_total: 1,
      status: 'assembled',
      width: 100,
      height: 100,
      created_at: moment(),
      updated_at: moment()
    }, {
      id: 4,
      original_file_name: 'greg.jpg',
      file_name: 'greg.jpg',
      content_type: 'image/jpeg',
      file_size: 1024,
      chunks_total: 1,
      status: 'assembled',
      width: 100,
      height: 100,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
