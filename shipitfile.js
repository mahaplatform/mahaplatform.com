const config = require('./deploy')
const deploy = require('shipit-deploy')
const npm = require('shipit-npm')

module.exports = function (shipit) {

  shipit.initConfig(config)

  deploy(shipit)

  // npm(shipit)

  shipit.on('published', function () {
    shipit.task('restart server', function () {
      return shipit.remote('touch /var/www/maha/staging/current/tmp/restart.txt')
    })

  });

  // shipit.task('deploy', function () {
  //   const commands = [
  //     'cd /var/www/'+app+'/',
  //     'git pull',
  //     'npm install',
  //     'npm run build',
  //     'npm run compile',
  //     'service nginx restart'
  //   ]
  //   return shipit.remote(commands.join(' && '))
  // })
  //
  // shipit.task('reset', function () {
  //   const commands = [
  //     'cd /var/www/app',
  //     'NODE_ENV=production ./bin/platform.js ccetc:import',
  //     'NODE_ENV=production ./bin/platform.js db:rollback',
  //     'NODE_ENV=production ./bin/platform.js db:migrate',
  //     'NODE_ENV=production ./bin/platform.js db:seed',
  //     'NODE_ENV=production ./bin/platform.js db:imports',
  //     'service nginx restart'
  //   ]
  //   return shipit.remote(commands.join(' && '))
  // })

}
