import '../web/core/services/environment'
import utils from 'shipit-utils'
import Shipit from 'shipit-cli'
import path from 'path'

const deploy = async () => {

  const shipit = new Shipit({ environment: 'production' })

  shipit.initConfig({
    default: {
      key: '.key',
      strict: 'no'
    },
    production: {
      servers: [{
        user: 'root',
        host: 'db5.mahaplatform.com'
      }]
    }
  })

  utils.registerTask(shipit, 'sync', [
    'sync:backup',
    'sync:download',
    'sync:restore',
    'sync:passwords'
  ])

  utils.registerTask(shipit, 'sync:backup', () => {
    return shipit.remote('pg_dump -h localhost -U maha maha | gzip > backup.sql.gz')
  })

  utils.registerTask(shipit, 'sync:download', () => {
    return shipit.copyFromRemote('backup.sql.gz', path.join('tmp','backup.sql.gz'))
  })

  utils.registerTask(shipit, 'sync:restore', () => {
    return shipit.local('dropdb maha && createdb maha && gunzip < tmp/backup.sql.gz | psql maha')
  })

  utils.registerTask(shipit, 'sync:passwords', () => {
    var password_salt = '\\$2a\\$10\\$EjngW3t55b8gCmtgs4a/WO'
    var password_hash = '\\$2a\\$10\\$EjngW3t55b8gCmtgs4a/WOR6KzZnF8hKHBDgmC69gz5SaQVNmhhGa'
    var sql = `UPDATE maha_users SET password_salt='${password_salt}', password_hash='${password_hash}'`
    return shipit.local(`echo "${sql}" | psql maha`)
  })

  shipit.initialize()

  shipit.start('sync')

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

}

deploy()
