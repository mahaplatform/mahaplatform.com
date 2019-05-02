import '../apps/maha/core/services/environment'
import Shipit from 'shipit-cli'
import utils from 'shipit-utils'
import roles from 'shipit-roles'
import moment from 'moment'
import path from 'path'

const deploy = async () => {

  const shipit = new Shipit({ environment: 'production' })

  shipit.initialize()

  shipit.start('deploy')

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

  shipit.initConfig({
    default: {
      deployTo: '/var/www/maha/production',
      key: '~/.ssh/id_rsa_0d79bf2b27c217a2ac17896617668a50',
      // key: '~/.ssh/mahaplatform',
      strict: 'no'
    },
    production: {
      servers: [
        {
          user: 'root',
          host: 'app8.mahaplatform.com',
          role: 'appserver'
        }, {
          user: 'root',
          host: 'app9.mahaplatform.com',
          role: 'appserver'
        }, {
          user: 'root',
          host: 'worker5.mahaplatform.com',
          role: 'worker'
        }, {
          user: 'root',
          host: 'worker5.mahaplatform.com',
          role: 'cron'
        }
      ]
    }
  })

  roles(shipit)

  const timestamp = moment().format('YYYYMMDDHHmmss')

  const deployDir = shipit.config.deployTo

  const releaseDir = `${deployDir}/releases/${timestamp}`

  const sharedDir = `${deployDir}/shared`

  const currentDir = `${deployDir}/current`

  utils.registerTask(shipit, 'deploy', [
    'deploy:checkout',
    'deploy:config',
    'deploy:install',
    'deploy:build',
    'deploy:help',
    'deploy:link_shared',
    'deploy:symlink',
    'deploy:reload_appservers',
    'deploy:restart_workers',
    'deploy:restart_cron',
    'deploy:cache_app',
    'deploy:cache_socket'
  ])


  utils.registerTask(shipit, 'deploy:checkout', async () => {
    await shipit.remote(`git clone https://github.com/mahaplatform/mahaplatform.com.git ${releaseDir}`)
  })

  utils.registerTask(shipit, 'deploy:config', async () => {
    await shipit.copyToRemote(path.resolve('.env.production'), `${releaseDir}/.env`)
  })

  utils.registerTask(shipit, 'deploy:install', async () => {
    await shipit.remote(`cd ${releaseDir} && npm install --silent`)
  })

  utils.registerTask(shipit, 'deploy:build', async () => {
    await shipit.remote(`cd ${releaseDir} && NODE_ENV=production npm run build`)
  })

  utils.registerTask(shipit, 'deploy:help', async () => {
    await shipit.remote(`cd ${releaseDir} && NODE_ENV=production npm run help`)
  })

  utils.registerTask(shipit, 'deploy:link_shared', async () => {
    const commands = [
      `rm -rf ${releaseDir}/tmp && mkdir -p ${sharedDir}/tmp && ln -s ${sharedDir}/tmp ${releaseDir}/tmp`,
      `rm -rf ${releaseDir}/logs && mkdir -p ${sharedDir}/logs && ln -s ${sharedDir}/logs ${releaseDir}/logs`,
      `rm -rf ${releaseDir}/imagecache && mkdir -p ${sharedDir}/imagecache && ln -s ${sharedDir}/imagecache ${releaseDir}/dist/public/imagecache`
    ]
    await shipit.remote(commands.join(' && '))
  })

  utils.registerTask(shipit, 'deploy:symlink', async () => {
    await shipit.remote(`rm -rf ${currentDir} && ln -s ${releaseDir} ${currentDir}`)
  })

  utils.registerTask(shipit, 'deploy:reload_appservers', () => {
    return shipit.remote(`touch ${currentDir}/tmp/restart.txt`, { role: 'appserver' })
  })

  utils.registerTask(shipit, 'deploy:restart_workers', () => {
    return shipit.remote(`cd ${deployDir} && NODE_ENV=${shipit.options.environment} pm2 startOrRestart ./current/dist/ecosystem.config.js`, { role: 'worker' })
  })

  utils.registerTask(shipit, 'deploy:restart_cron', () => {
    return shipit.remote(`cd ${deployDir} && NODE_ENV=${shipit.options.environment} pm2 startOrRestart ./current/dist/ecosystem.config.js`, { role: 'cron' })
  })

  utils.registerTask(shipit, 'deploy:cache_app', () => {
    return shipit.remote('wget -O - http://127.0.0.1:80/ping', { role: 'appserver' })
  })

  utils.registerTask(shipit, 'deploy:cache_socket', () => {
    return shipit.remote('wget -O - http://127.0.0.1:81/ping', { role: 'appserver' })
  })

}

deploy()
