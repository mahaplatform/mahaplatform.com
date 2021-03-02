import Manufacturer from './manufacturer'
import Model from '@core/objects/model'
import DomainUser from './domain_user'
import IPAddress from './ipaddress'
import Campaign from './campaign'
import Referer from './referer'
import Version from './version'
import Browser from './browser'
import Content from './content'
import Device from './device'
import Event from './event'
import Source from './source'
import Medium from './medium'
import Term from './term'
import App from './app'
import OS from './os'

const Session = new Model({

  databaseName: 'analytics',

  tableName: 'sessions',

  hasTimestamps: false,

  rules: {},

  virtuals: {},

  app() {
    return this.belongsTo(App, 'app_id')
  },

  browser() {
    return this.belongsTo(Browser, 'browser_id')
  },

  browser_version() {
    return this.belongsTo(Version, 'browser_version_id')
  },

  campaign() {
    return this.belongsTo(Campaign, 'campaign_id')
  },

  content() {
    return this.belongsTo(Content, 'content_id')
  },

  device() {
    return this.belongsTo(Device, 'device_id')
  },

  domain_user() {
    return this.belongsTo(DomainUser, 'domain_user_id')
  },

  events() {
    return this.hasMany(Event, 'session_id')
  },

  ipaddress() {
    return this.belongsTo(IPAddress, 'ipaddress_id')
  },

  manufacturer() {
    return this.belongsTo(Manufacturer, 'manufacturer_id')
  },

  medium() {
    return this.belongsTo(Medium, 'medium_id')
  },

  os() {
    return this.belongsTo(OS, 'os_id')
  },

  os_version() {
    return this.belongsTo(Version, 'os_version_id')
  },

  referer() {
    return this.belongsTo(Referer, 'referer_id')
  },

  source() {
    return this.belongsTo(Source, 'source_id')
  },

  term() {
    return this.belongsTo(Term, 'term_id')
  }

})

export default Session
