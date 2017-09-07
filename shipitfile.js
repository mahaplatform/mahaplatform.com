const config = require('./config/deploy')
const maha = require('shipit-maha')

module.exports = function (shipit) {

  shipit.initConfig(config)

  maha(shipit)

}
