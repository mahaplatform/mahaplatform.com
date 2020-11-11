import '../../core/services/environment'
import aws from '../../core/services/aws'
import Shipit from 'shipit-cli'
import utils from 'shipit-utils'
import roles from './roles'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'

const processor = async () => {

  const args = process.argv.slice(2)

  const task = args[0]

  const environment = 'production'

  const shipit = new Shipit({ environment })

  const ec2 = new aws.EC2()

  const instances = await ec2.describeInstances().promise()

  const servers = instances.Reservations.reduce((servers, reservation) => [
    ...servers,
    ...reservation.Instances
  ], []).filter(instance => {
    return instance.State.Name === 'running'
  }).filter(instance => {
    const cost = instance.Tags.find(Tag => {
      return Tag.Key === 'Cost'
    })
    return cost.Value === 'maha'
  }).map(instance => {
    const tags = instance.Tags.reduce((tags, tag) => ({
      ...tags,
      [tag.Key]: tag.Value
    }), {})
    return {
      user: 'centos',
      host: tags.Name,
      port: 22,
      roles: (tags.Role || '').split(',')
    }
  }).filter(instance => {
    return _.intersection(['webserver','appserver','worker','cron','dbserver'], instance.roles).length > 0
  })

  const controller = servers.findIndex(server => server.roles[0] === 'appserver')
  servers[controller].roles.push('controller')

  servers.map(server => {
    console.log(`${server.host} [${server.roles}]`)
  })

  shipit.initConfig({
    default: {
      asUser: 'root',
      key: process.env.SSH_KEY,
      strict: 'no'
    },
    production: {
      deployTo: '/var/www/maha',
      servers
    }
  })

  roles(shipit)

  const timestamp = moment().format('YYYYMMDDHHmmss')

  const deployDir = shipit.config.deployTo

  const releasesDir = `${deployDir}/releases`

  const releaseDir = `${releasesDir}/${timestamp}`

  const sharedDir = `${deployDir}/shared`

  const currentDir = `${deployDir}/current`

  utils.registerTask(shipit, 'servers', [
    'servers:all:configure',
    'servers:appserver:configure',
    'servers:appserver:restart',
    'servers:loadbalancer:configure',
    'servers:loadbalancer:restart',
    'servers:pm2:restart'
  ])

  utils.registerTask(shipit, 'deploy', [
    'deploy:preclean',
    'deploy:env',
    'deploy:build',
    'deploy:zip',
    'deploy:mkdir',
    'deploy:upload',
    'deploy:unzip',
    'deploy:install',
    'deploy:link_shared',
    'deploy:bootstrap',
    'deploy:migrate',
    'deploy:symlink',
    'deploy:reload_nginx',
    'servers:pm2:restart',
    // 'deploy:cache',
    'deploy:clean'
  ])

  utils.registerTask(shipit, 'sync', [
    'sync:backup',
    'sync:download',
    'sync:restore',
    'sync:teams',
    'sync:passwords',
    'sync:phone_numbers',
    'sync:braintree'
  ])

  utils.registerTask(shipit, 'cleanup', async () => {
    const revision = args[1]
    await shipit.remote(`rm -rf ${releasesDir}/${revision}`, {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'servers:appserver:configure', async () => {
    await shipit.remoteCopy('servers/roles/passenger/files/nginx.conf', '/opt/nginx/conf/nginx.conf', { roles: 'appserver' })
  })

  utils.registerTask(shipit, 'servers:appserver:restart', async () => {
    await shipit.remote('systemctl restart nginx', { roles: 'appserver' })
  })

  utils.registerTask(shipit, 'servers:pm2:deleteall', async () => {
    return shipit.remote('NODE_ENV=production pm2 delete all', {
      cwd: deployDir,
      roles: ['cron','worker']
    })
  })

  utils.registerTask(shipit, 'servers:pm2:restart', [
    'servers:pm2:restart_cron',
    'servers:pm2:restart_worker'
  ])

  utils.registerTask(shipit, 'servers:pm2:restart_cron', async () => {
    return shipit.remote('NODE_ENV=production pm2 startOrRestart ./current/ecosystem.config.js --only cron_production', {
      cwd: deployDir,
      roles: ['cron']
    })
  })

  utils.registerTask(shipit, 'servers:pm2:restart_worker', async () => {
    return shipit.remote('NODE_ENV=production pm2 startOrRestart ./current/ecosystem.config.js --only worker_production', {
      cwd: deployDir,
      roles: ['worker']
    })
  })

  utils.registerTask(shipit, 'deploy:env', async () => {
    await shipit.local(`NODE_ENV=production npm run env ${environment}`)
  })

  utils.registerTask(shipit, 'deploy:build', async () => {
    await shipit.local(`NODE_ENV=production npm run build ${environment} ${releaseDir}`)
  })


  utils.registerTask(shipit, 'deploy:zip', async () => {
    await shipit.local('cd ./dist && tar -czf ../dist.tgz .')
  })

  utils.registerTask(shipit, 'deploy:mkdir', async () => {
    await shipit.remote(`mkdir -p ${releaseDir}`, {
      roles: ['appserver','cron','worker','webserver']
    })
  })

  utils.registerTask(shipit, 'deploy:upload', async () => {
    await shipit.copyToRemote('dist.tgz', `${releaseDir}/dist.tgz`, {
      roles: ['appserver','cron','worker', 'webserver']
    })
  })

  utils.registerTask(shipit, 'deploy:unzip', async () => {
    await shipit.remote('tar -xzf dist.tgz && rm -rf dist.tgz', {
      roles: ['appserver','cron','worker','webserver'],
      cwd: releaseDir
    })
  })

  utils.registerTask(shipit, 'deploy:install', [
    'deploy:install_platform',
    'deploy:install_web'
  ])

  utils.registerTask(shipit, 'deploy:install_platform', async () => {
    await shipit.remote('npm install --production --unsafe-perm=true --no-spin', {
      roles: ['appserver','cron','worker'],
      cwd: path.join(releaseDir, 'platform')
    })
  })

  utils.registerTask(shipit, 'deploy:install_web', async () => {
    await shipit.remote('npm install --production --unsafe-perm=true --no-spin', {
      roles: ['webserver'],
      cwd: path.join(releaseDir, 'web')
    })
  })

  utils.registerTask(shipit, 'deploy:link_shared', async () => {
    const commands = [
      `ln -s ${sharedDir}/logs ${releaseDir}/platform/logs`,
      `ln -s ${sharedDir}/tmp ${releaseDir}/platform/tmp`,
      `ln -s ${sharedDir}/imagecache ${releaseDir}/platform/public/imagecache`
    ]
    await shipit.remote(commands.join(' && '), {
      roles: ['appserver','cron','worker','webserver']
    })
  })

  utils.registerTask(shipit, 'deploy:bootstrap', async () => {
    await shipit.remote('NODE_ENV=production node ./core/scripts/bootstrap/index.js', {
      roles: ['controller'],
      cwd: path.join(releaseDir, 'platform')
    })
  })

  utils.registerTask(shipit, 'deploy:migrate', async () => {
    await shipit.remote('NODE_ENV=production node ./core/scripts/db/index.js migrate:up', {
      roles: ['controller'],
      cwd: path.join(releaseDir, 'platform')
    })
  })

  utils.registerTask(shipit, 'deploy:symlink', async () => {
    await shipit.remote(`rm -rf ${currentDir} && ln -s ${releaseDir} ${currentDir}`, {
      roles: ['appserver','cron','worker','webserver']
    })
  })

  utils.registerTask(shipit, 'deploy:reload_nginx', () => {
    return shipit.remote('service nginx reload', {
      roles: ['appserver','webserver']
    })
  })

  utils.registerTask(shipit, 'deploy:restart_pm2', [
    'deploy:restart_cron',
    'deploy:restart_worker'
  ])

  utils.registerTask(shipit, 'deploy:restart_cron', () => {
    return shipit.remote('NODE_ENV=production pm2 startOrRestart ./current/platform/ecosystem.config.js', {
      cwd: deployDir,
      roles: ['cron']
    })
  })

  utils.registerTask(shipit, 'deploy:restart_worker', () => {
    return shipit.remote('NODE_ENV=production pm2 startOrRestart ./current/platform/ecosystem.config.js', {
      cwd: deployDir,
      roles: ['worker']
    })
  })

  utils.registerTask(shipit, 'deploy:cache', () => {
    return shipit.remote('wget -O - http://127.0.0.1/ping', {
      roles: 'appserver'
    })
  })

  utils.registerTask(shipit, 'deploy:preclean', () => {
    if(environment === 'production') return
    return shipit.remote(`rm -rf ${currentDir} && rm -rf ${releasesDir}/*`, {
      roles: ['appserver','cron','worker','webserver']
    })
  })

  utils.registerTask(shipit, 'deploy:clean', () => {
    return shipit.remote(`ls -rd ${releasesDir}/*|grep -v $(readlink ${currentDir})|xargs rm -rf`, {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'sync:stage', () => {
    const commands = 'pg_dump -h localhost -U maha maha | psql -U maha staging'
    return shipit.remote(commands.join(' && '), {
      roles: 'dbserver'
    })
  })

  utils.registerTask(shipit, 'sync:backup', () => {
    return shipit.remote('pg_dump -h 127.0.0.1 -U maha maha | gzip > backup.sql.gz', {
      roles: 'dbserver'
    })
  })

  utils.registerTask(shipit, 'sync:download', () => {
    return shipit.copyFromRemote('backup.sql.gz', path.join('tmp','backup.sql.gz'), {
      roles: 'dbserver'
    })
  })

  utils.registerTask(shipit, 'sync:restore', () => {
    return shipit.local('dropdb maha && createdb maha && gunzip < tmp/backup.sql.gz | psql maha')
  })

  utils.registerTask(shipit, 'sync:teams', () => {
    var sql = 'update maha_teams set authentication_strategy=\'local\''
    return shipit.local(`echo "${sql}" | psql maha`)
  })

  utils.registerTask(shipit, 'sync:passwords', () => {
    var password_salt = '\\$2a\\$10\\$EjngW3t55b8gCmtgs4a/WO'
    var password_hash = '\\$2a\\$10\\$EjngW3t55b8gCmtgs4a/WOR6KzZnF8hKHBDgmC69gz5SaQVNmhhGa'
    var sql = `update maha_accounts set password_salt='${password_salt}', password_hash='${password_hash}'`
    return shipit.local(`echo "${sql}" | psql maha`)
  })

  utils.registerTask(shipit, 'sync:phone_numbers', () => {
    var sql = `update maha_phone_numbers SET sid='${process.env.TWILIO_NUMBER_SID}', number='${process.env.TWILIO_NUMBER}'`
    return shipit.local(`echo "${sql}" | psql maha`)
  })

  utils.registerTask(shipit, 'sync:braintree', () => {
    var sql = [
      'update finance_banks set braintree_id=\'cornellcooperativeextensionassociationoftompkinscounty\'',
      'update crm_contacts set braintree_id=null',
      'update finance_payment_methods set customer_id=null'
    ]
    return shipit.local(`echo "${sql.join(';')}" | psql maha`)
  })

  utils.registerTask(shipit, 'sync:assets', () => {
    return shipit.local(`aws s3 sync s3://cdn.mahaplatform.com s3://${process.env.AWS_BUCKET}`)
  })


  shipit.initialize()

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

  await shipit.start(task)

}

processor()
