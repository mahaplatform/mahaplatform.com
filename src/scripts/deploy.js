import '../apps/maha/core/services/environment'
import Shipit from 'shipit-cli'
import path from 'path'
import ncp from 'ncp'

const copy = Promise.promisify(ncp)

const deploy = async () => {

  await copy(path.resolve('.env'), path.resolve('root','.env'))

  await copy(path.resolve('package.json'), path.resolve('root','package.json'))

  await copy(path.resolve('package-lock.json'), path.resolve('root','package-lock.json'))

  const shipit = new Shipit({ environment: process.env.NODE_ENV })

  const deploy = require(path.resolve('src','deploy','shipitfile'))

  const appservers = process.env.APPSERVERS ? process.env.APPSERVERS.split(',') : []

  const workerservers = process.env.WORKERSERVERS ? process.env.WORKERSERVERS.split(',') : []

  const cronservers = process.env.CRONSERVERS ? process.env.CRONSERVERS.split(',') : []

  const config = {
    default: {
      deployTo: '/var/www/maha',
      key: `~/.ssh/id_rsa_${process.env.FINGERPRINT}`
    },
    production: {
      servers: [
        ...appservers.map(server => ({
          user: 'root',
          host: `${server}@mahaplatform.com`,
          role: 'appserver'
        })),
        ...workerservers.map(server => ({
          user: 'root',
          host: `${server}@mahaplatform.com`,
          role: 'worker'
        })),
        ...cronservers.map(server => ({
          user: 'root',
          host: `${server}@mahaplatform.com`,
          role: 'cron'
        }))
      ]
    }
  }

  await shipit.initConfig(config)

  deploy(shipit)

  shipit.initialize()

  shipit.start('deploy')

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

}

deploy().then(process.exit)
