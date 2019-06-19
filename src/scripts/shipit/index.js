import '../../web/core/services/environment'
import Shipit from 'shipit-cli'
import utils from 'shipit-utils'
import roles from './roles'
import moment from 'moment'
import path from 'path'

const processor = async () => {

  const shipit = new Shipit({ environment: 'production' })

  shipit.initConfig({
    default: {
      deployTo: '/var/www/app',
      key: `~/.ssh/${process.env.FINGERPRINT}`,
      strict: 'no'
    },
    production: {
      servers: [
        {
          user: 'root',
          host: 'lb3.mahaplatform.com',
          port: 22,
          roles: 'loadbalancer'
        }, {
          user: 'root',
          host: 'app1.mahaplatform.com',
          port: 2244,
          roles: ['appserver','controller']
        }, {
          user: 'root',
          host: 'app2.mahaplatform.com',
          port: 2244,
          roles: 'appserver'
        }, {
          user: 'root',
          host: 'worker1.mahaplatform.com',
          port: 2244,
          roles: ['worker','cron']
        }, {
          user: 'root',
          host: 'db5.mahaplatform.com',
          port: 22,
          roles: ['database','cache']
        }
      ]
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
    'deploy:build',
    'deploy:zip',
    'deploy:mkdir',
    'deploy:upload',
    'deploy:unzip',
    'deploy:install',
    'deploy:link_shared',
    'deploy:permissions',
    'deploy:migrate',
    'deploy:symlink',
    'deploy:reload_passenger',
    'deploy:restart_pm2',
    'deploy:cache',
    'deploy:clean'
  ])

  utils.registerTask(shipit, 'sync', [
    'sync:backup',
    'sync:download',
    'sync:restore',
    'sync:passwords'
  ])

  utils.registerTask(shipit, 'servers:all:configure', async () => {
    await shipit.remoteCopy('.env.production', '/var/www/app/current/.env', {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'servers:appserver:configure', async () => {
    await shipit.remoteCopy('src/servers/app/nginx.conf', '/opt/nginx/conf/nginx.conf', { roles: 'appserver' })
  })

  utils.registerTask(shipit, 'servers:appserver:restart', async () => {
    await shipit.remote('systemctl restart nginx', { roles: 'appserver' })
  })

  utils.registerTask(shipit, 'servers:loadbalancer:configure', async () => {
    await shipit.remoteCopy('src/servers/lb/nginx.conf', '/etc/nginx/nginx.conf', { roles: 'loadbalancer' })
    await shipit.remoteCopy('src/servers/lb/haproxy.cfg', '/etc/haproxy/haproxy.cfg', { roles: 'loadbalancer' })
    await shipit.remoteCopy('src/servers/lb/mahaplatform.com.pem', '/etc/pki/tls/private/mahaplatform.com.pem', { roles: 'loadbalancer' })
  })

  utils.registerTask(shipit, 'servers:loadbalancer:restart', async () => {
    await shipit.remote('service nginx restart', { roles: 'loadbalancer' })
    await shipit.remote('service haproxy restart', { roles: 'loadbalancer' })
  })

  utils.registerTask(shipit, 'servers:pm2:restart', async () => {
    return shipit.remote('NODE_ENV=production pm2 startOrRestart ./current/ecosystem.config.js', {
      cwd: deployDir,
      roles: ['cron','worker']
    })
  })

  utils.registerTask(shipit, 'servers:cron:restart', async () => {
  })

  utils.registerTask(shipit, 'deploy:build', async () => {
    await shipit.local('NODE_ENV=production npm run build')
  })

  utils.registerTask(shipit, 'deploy:zip', async () => {
    await shipit.local('cd ./dist && tar -czf ../tmp/dist.tgz .')
  })

  utils.registerTask(shipit, 'deploy:mkdir', async () => {
    await shipit.remote(`mkdir -p ${releaseDir}`, {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'deploy:upload', async () => {
    await shipit.remoteCopy('tmp/dist.tgz', `${releaseDir}/dist.tgz`, {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'deploy:unzip', async () => {
    await shipit.remote('tar -xzf dist.tgz && rm -rf dist.tgz', {
      roles: ['appserver','cron','worker'],
      cwd: releaseDir
    })
  })

  utils.registerTask(shipit, 'deploy:install', async () => {
    await shipit.remote('npm install --production --silent --no-spin', {
      roles: ['appserver','cron','worker'],
      cwd: releaseDir
    })
  })

  utils.registerTask(shipit, 'deploy:link_shared', async () => {
    const commands = [
      `ln -s ${sharedDir}/logs ${releaseDir}/logs`,
      `ln -s ${sharedDir}/tmp ${releaseDir}/tmp`,
      `ln -s ${sharedDir}/imagecache ${releaseDir}/public/imagecache`
    ]
    await shipit.remote(commands.join(' && '), {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'deploy:permissions', async () => {
    const commands = [
      `chown -R nobody.nobody ${releaseDir}help`
    ]
    await shipit.remote(commands.join(' && '), {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'deploy:migrate', async () => {
    await shipit.remote('NODE_ENV=production node ./core/db/index.js migrate:up', {
      roles: ['controller'],
      cwd: releaseDir
    })
  })

  utils.registerTask(shipit, 'deploy:symlink', async () => {
    await shipit.remote(`rm -rf ${currentDir} && ln -s ${releaseDir} ${currentDir}`, {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'deploy:reload_passenger', () => {
    return shipit.remote(`touch ${currentDir}/tmp/restart.txt`, {
      roles: 'appserver'
    })
  })

  utils.registerTask(shipit, 'deploy:restart_pm2', () => {
    return shipit.remote('NODE_ENV=production pm2 startOrRestart ./current/ecosystem.config.js', {
      cwd: deployDir,
      roles: ['cron','worker']
    })
  })

  utils.registerTask(shipit, 'deploy:cache', () => {
    return shipit.remote('wget -O - http://127.0.0.1/ping', {
      roles: 'appserver'
    })
  })

  utils.registerTask(shipit, 'deploy:clean', () => {
    return shipit.remote(`(ls -rd ${releasesDir}/*|head -n 2;ls -d ${releasesDir}/*)|sort|uniq -u|xargs rm -rf`, {
      roles: ['appserver','cron','worker']
    })
  })

  utils.registerTask(shipit, 'sync:backup', () => {
    return shipit.remote('pg_dump -h localhost -U maha maha | gzip > backup.sql.gz', {
      roles: 'database'
    })
  })

  utils.registerTask(shipit, 'sync:download', () => {
    return shipit.copyFromRemote('backup.sql.gz', path.join('tmp','backup.sql.gz'), {
      roles: 'database'
    })
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

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

  const args = process.argv.slice(2)

  await shipit.start(args[0])

}

processor()
