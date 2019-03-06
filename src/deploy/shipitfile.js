const utils = require('shipit-utils')
const roles = require('shipit-roles')
const path = require('path')
const moment = require('moment')

module.exports = (shipit) => {

  shipit.initConfig({
    default: {
      deployTo: '/var/www/maha',
      key: '~/.ssh/id_rsa_0d79bf2b27c217a2ac17896617668a50',
      strict: 'no'
    },
    production: {
      servers: [
        ...appservers.map(server => ({
          user: 'root',
          host: `${server}.mahaplatform.com`,
          role: 'appserver'
        })),
        ...workerservers.map(server => ({
          user: 'root',
          host: `${server}.mahaplatform.com`,
          role: 'worker'
        })),
        ...cronservers.map(server => ({
          user: 'root',
          host: `${server}.mahaplatform.com`,
          role: 'cron'
        }))
      ]
    }
  })

  roles(shipit)

  const appservers = process.env.APPSERVERS ? process.env.APPSERVERS.split(',') : []

  const workerservers = process.env.WORKERSERVERS ? process.env.WORKERSERVERS.split(',') : []

  const cronservers = process.env.CRONSERVERS ? process.env.CRONSERVERS.split(',') : []

  const timestamp = moment().format('YYYYMMDDHHmmss')

  const deployDir = `${shipit.config.deployTo}/${process.env.NODE_ENV}`

  const releaseDir = `${deployDir}/releases/${timestamp}`

  const sharedDir = `${deployDir}/shared`

  const currentDir = `${deployDir}/current2`

  utils.registerTask(shipit, 'deploy', [
    'deploy:zip',
    'deploy:mkdir',
    'deploy:upload',
    'deploy:unzip',
    'deploy:install',
    'deploy:link_shared',
    'deploy:symlink',
    'deploy:reload_appservers',
    'deploy:restart_workers',
    'deploy:restart_cron',
    'deploy:cache_app',
    'deploy:cache_socket'
  ])

  utils.registerTask(shipit, 'deploy:zip', async () => {
    return await shipit.local('cd root && tar -czf deploy.tgz * && cp deploy.tgz ..')
  })

  utils.registerTask(shipit, 'deploy:mkdir', async () => {
    await shipit.remote(`mkdir -p ${releaseDir}`)
  })

  utils.registerTask(shipit, 'deploy:upload', async () => {
    await shipit.copyToRemote(path.resolve('deploy.tgz'), releaseDir)
  })

  utils.registerTask(shipit, 'deploy:unzip', async () => {
    await shipit.remote(`cd ${releaseDir} && tar -xzf deploy.tgz && rm deploy.tgz`)
  })

  utils.registerTask(shipit, 'deploy:install', async () => {
    await shipit.remote(`cd ${releaseDir}/root && npm install`)
  })

  utils.registerTask(shipit, 'deploy:link_shared', async () => {
    const linked = ['imagecache','logs','tmp']
    await shipit.remote(linked.map(dir => `ln -s ${sharedDir}/${dir} ${releaseDir}/${dir}`).join(' && '))
  })

  utils.registerTask(shipit, 'deploy:symlink', async () => {
    await shipit.remote(`ln -s ${releaseDir} ${currentDir}`)
  })

  utils.registerTask(shipit, 'deploy:reload_appservers', () => {
    return shipit.remote(`touch ${currentDir}/tmp/restart.txt`, { role: 'appserver' })
  })

  utils.registerTask(shipit, 'deploy:restart_workers', () => {
    return shipit.remote(`cd ${deployDir} && NODE_ENV=${shipit.options.environment} pm2 startOrRestart ./current/dist/ecosystem.js`, { role: 'worker' })
  })

  utils.registerTask(shipit, 'deploy:restart_cron', () => {
    return shipit.remote(`cd ${deployDir} && NODE_ENV=${shipit.options.environment} pm2 startOrRestart ./current/dist/ecosystem.js`, { role: 'cron' })
  })

  utils.registerTask(shipit, 'deploy:cache_app', () => {
    return shipit.remote('wget -O - http://127.0.0.1:80/ping', { role: 'appserver' })
  })

  utils.registerTask(shipit, 'deploy:cache_socket', () => {
    return shipit.remote('wget -O - http://127.0.0.1:81/ping', { role: 'appserver' })
  })

}
