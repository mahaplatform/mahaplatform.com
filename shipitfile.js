const config = require('./deploy/deploy')
const deploy = require('shipit-deploy')
const npm = require('shipit-npm')
const maha = require('shipit-maha')

module.exports = function (shipit) {

  shipit.initConfig(config)

  deploy(shipit)

  npm(shipit)

  maha(shipit)

}
