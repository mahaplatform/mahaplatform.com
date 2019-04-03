import '../apps/maha/core/services/environment'
import shipitfile from '../deploy/shipitfile'
import Shipit from 'shipit-cli'

const deploy = async () => {

  const shipit = new Shipit({ environment: 'production' })

  shipitfile(shipit)

  shipit.initialize()

  shipit.start('deploy')

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

}

deploy()
