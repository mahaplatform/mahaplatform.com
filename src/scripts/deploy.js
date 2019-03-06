import shipitfile from '../deploy/shipitfile'
import Shipit from 'shipit-cli'
import path from 'path'
import ncp from 'ncp'

const copy = Promise.promisify(ncp)

const deploy = async () => {

  await copy(path.resolve('.env'), path.resolve('root','.env'))

  await copy(path.resolve('package.json'), path.resolve('root','package.json'))

  await copy(path.resolve('package-lock.json'), path.resolve('root','package-lock.json'))

  const shipit = new Shipit({ environment: process.env.NODE_ENV })

  shipitfile(shipit)

  shipit.initialize()

  shipit.start('deploy')

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

}

deploy()
