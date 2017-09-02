const utils = require('shipit-utils');
const config = require('./deploy/deploy')
const deploy = require('shipit-deploy')
const npm = require('shipit-npm')
const path = require('path')

const maha = (gruntOrShipit) => {

  const shipit = utils.getShipit(gruntOrShipit)
  const sharedDir = shipit.config.deployTo + '/shared'
  const currentDir = shipit.config.deployTo + '/current'

  utils.registerTask(gruntOrShipit, 'deploy:maha', [
    'deploy:config',
    'deploy:compile',
    'deploy:link_cache',
    'deploy:restart_server'
  ])

  utils.registerTask(gruntOrShipit, 'deploy:config', () => {
    shipit.remote('mkdir -p ' + sharedDir)
    shipit.remoteCopy(path.resolve('deploy', shipit.options.environment+'.env'), sharedDir + '/.env')
    shipit.remote('rm -rf ' + currentDir + '/.env && ln -s ' + sharedDir + '/.env ' + currentDir + '/.env')
  })

  utils.registerTask(gruntOrShipit, 'deploy:compile', () => {
    return shipit.remote('cd ' + currentDir + ' && ./node_modules/maha/dist/bin/cli.js compile')
  })

  utils.registerTask(gruntOrShipit, 'deploy:link_cache', () => {
    shipit.remote('ln -s ' + sharedDir + '/imagecache ' + currentDir + '/public/imagecache')
  })

  utils.registerTask(gruntOrShipit, 'deploy:restart_server', () => {
    return shipit.remote('touch ' + currentDir + '/tmp/restart.txt')
  })

  utils.registerTask(gruntOrShipit, 'deploy:setup_cache', () => {
    shipit.remote('mkdir -p -m 777 ' + sharedDir + '/imagecache')
  })

}

module.exports = function (shipit) {

  shipit.initConfig(config)

  deploy(shipit)

  npm(shipit)

  maha(shipit)

  shipit.on('deployed', function () {
    shipit.start('deploy:maha');
  })

}
