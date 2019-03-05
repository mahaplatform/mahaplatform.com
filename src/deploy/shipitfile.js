const utils = require('shipit-utils')
const roles = require('shipit-roles')

module.exports = (shipit) => {

  // deploy(shipit)

  // roles(shipit)

  const deployDir = shipit.config.deployTo

  const sharedDir = deployDir + '/shared'

  const currentDir = deployDir + '/current'

  utils.registerTask(shipit, 'deploy', [
    'deploy:zip'
  ])

  utils.registerTask(shipit, 'deploy:zip', () => {
    return shipit.local('tar -czf deploy.tgz root')
  })

  // utils.registerTask(shipit, 'deploy:maha_prepare', [
  //   'deploy:config',
  //   'deploy:install_apps',
  //   'deploy:rebuild_modules',
  //   'deploy:compile',
  //   'deploy:link_shared_dirs',
  //   'deploy:help',
  //   'deploy:bootstrap',
  //   'deploy:migrate'
  // ])
  //
  // utils.registerTask(shipit, 'deploy:maha_release', [
  //   'deploy:reload_appservers',
  //   'deploy:restart_workers',
  //   'deploy:restart_cron',
  //   'deploy:cache_app',
  //   'deploy:cache_socket'
  // ])
  //
  // utils.registerTask(shipit, 'deploy:maha_restart', [
  //   'deploy:restart_appservers',
  //   'deploy:restart_loadbalancers',
  //   'deploy:cache_app',
  //   'deploy:cache_socket'
  // ])
  //
  // utils.registerTask(shipit, 'sync', [
  //   'sync:backup',
  //   'sync:download',
  //   'sync:restore',
  //   'sync:passwords'
  // ])
  //
  // utils.registerTask(shipit, 'sync:backup', () => {
  //   return shipit.roles.dbserver.run('pg_dump -h localhost -U maha maha | gzip > backup.sql.gz')
  // })
  //
  // utils.registerTask(shipit, 'sync:download', () => {
  //   return shipit.roles.dbserver.copy('backup.sql.gz', 'tmp/backup.sql.gz', { direction: 'remoteToLocal' })
  // })
  //
  // utils.registerTask(shipit, 'sync:restore', () => {
  //   return shipit.local('dropdb maha && createdb maha && gunzip < tmp/backup.sql.gz | psql maha')
  // })
  //
  // utils.registerTask(shipit, 'sync:passwords', () => {
  //   var password_salt = '\\$2a\\$10\\$EjngW3t55b8gCmtgs4a/WO'
  //   var password_hash = '\\$2a\\$10\\$EjngW3t55b8gCmtgs4a/WOR6KzZnF8hKHBDgmC69gz5SaQVNmhhGa'
  //   var sql = `UPDATE maha_users SET password_salt='${password_salt}', password_hash='${password_hash}'`
  //   return shipit.local(`echo "${sql}" | psql maha`)
  // })
  //
  // utils.registerTask(shipit, 'deploy:create_shared_dirs', () => {
  //   const imagecache = () => shipit.remote('mkdir -m 777 -p ' + sharedDir + '/imagecache', { role: 'appserver' })
  //   const logs = () => shipit.remote('mkdir -p ' + sharedDir + '/logs')
  //   const tmp = () => shipit.remote('chmod 777 ' + sharedDir + '/tmp')
  //   return imagecache().then(logs).then(tmp)
  // })
  //
  // utils.registerTask(shipit, 'deploy:create_logs', () => {
  //   return shipit.remote('mkdir -p ' + sharedDir + '/logs')
  // })
  //
  // utils.registerTask(shipit, 'deploy:rebuild_modules', () => {
  //   return shipit.remote('cd ' + shipit.releasePath + ' && rm -rf node_modules && npm install')
  // })
  //
  // utils.registerTask(shipit, 'deploy:install_apps', () => {
  //   return shipit.remote('cd ' + shipit.releasePath + ' && rm -rf apps/* && NODE_ENV=' + shipit.options.environment + ' maha app:install')
  // })
  //
  // utils.registerTask(shipit, 'deploy:config', () => {
  //   const mkdir = () => shipit.remote('mkdir -p ' + sharedDir)
  //   const copyConfig = () => shipit.remoteCopy(path.resolve('config', 'maha.'+shipit.options.environment+'.js'), sharedDir + '/maha.js')
  //   const linkConfig = () => shipit.remote('rm -rf ' + shipit.releasePath + '/maha.js && ln -s ' + sharedDir + '/maha.js ' + shipit.releasePath + '/maha.js')
  //   return mkdir().then(copyConfig).then(linkConfig)
  // })
  //
  // utils.registerTask(shipit, 'deploy:compile', () => {
  //   return shipit.remote('cd ' + shipit.releasePath + ' && NODE_ENV=' + shipit.options.environment + ' maha compile')
  // })
  //
  // utils.registerTask(shipit, 'deploy:migrate', () => {
  //   return shipit.remote('cd ' + shipit.releasePath + ' && NODE_ENV=' + shipit.options.environment + ' maha db:migrate:up', { role: 'cron' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:help', () => {
  //   const build = () => shipit.remote('cd ' + shipit.releasePath + ' && NODE_ENV=' + shipit.options.environment + ' maha help:build', { role: 'appserver' })
  //   const chmown = () => shipit.remote('chown -R nobody.nobody ' + shipit.releasePath + '/help', { role: 'appserver' })
  //   const chmod = () => shipit.remote('chmod -R 777 ' + shipit.releasePath + '/help', { role: 'appserver' })
  //   return build().then(chmown).then(chmod)
  // })
  //
  // utils.registerTask(shipit, 'deploy:bootstrap', () => {
  //   return shipit.remote('cd ' + shipit.releasePath + ' && NODE_ENV=' + shipit.options.environment + ' maha db:bootstrap', { role: 'cron' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:link_shared_dirs', () => {
  //   const imagecache = () => shipit.remote('ln -s ' + sharedDir + '/imagecache ' + shipit.releasePath + '/dist/public/imagecache', { role: 'appserver' })
  //   const logs = () => shipit.remote('ln -s ' + sharedDir + '/logs ' + shipit.releasePath + '/logs')
  //   return imagecache().then(logs)
  // })
  //
  // utils.registerTask(shipit, 'deploy:restart_loadbalancers', () => {
  //   return shipit.remote('service haproxy restart', { role: 'loadbalancer' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:reload_appservers', () => {
  //   return shipit.remote('touch ' + currentDir + '/tmp/restart.txt', { role: 'appserver' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:restart_appservers', () => {
  //   return shipit.remote('service nginx restart', { role: 'appserver' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:cache_app', () => {
  //   return shipit.remote('wget -O - http://127.0.0.1:80/ping', { role: 'appserver' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:cache_socket', () => {
  //   return shipit.remote('wget -O - http://127.0.0.1:81/ping', { role: 'appserver' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:restart_workers', () => {
  //   return shipit.remote('cd ' + deployDir + ' && NODE_ENV=' + shipit.options.environment + ' pm2 startOrRestart ./current/config/ecosystem.config.js', { role: 'worker' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:restart_cron', () => {
  //   return shipit.remote('cd ' + deployDir + ' && NODE_ENV=' + shipit.options.environment + ' pm2 startOrRestart ./current/config/ecosystem.config.js', { role: 'cron' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:setup_cache', () => {
  //   return shipit.remote('mkdir -p -m 777 ' + sharedDir + '/imagecache', { role: 'appserver' })
  // })
  //
  // utils.registerTask(shipit, 'deploy:update_cli', () => {
  //   return shipit.remote('npm install -g maha-cli')
  // })
  //
  // shipit.on('updated', function () {
  //   return shipit.start('deploy:maha_prepare')
  // })
  //
  // shipit.on('deployed', function () {
  //   return shipit.start('deploy:maha_release')
  // })

}
