const config = require('./config/deploy')
const maha = require('./node_modules/maha/node_modules/shipit-maha')

module.exports = function (shipit) {

  shipit.initConfig(config)

  maha(shipit)

}
