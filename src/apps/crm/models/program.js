import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import PhoneNumber from '@apps/maha/models/phone_number'
import Model from '@core/objects/model'
import Bank from '@apps/finance/models/bank'
import ProgramAccess from './program_access'
import Asset from '@apps/maha/models/asset'
import Field from '@apps/maha/models/field'
import Sender from './sender'
import Topic from './topic'
import List from './list'

const Program = new Model({

  databaseName: 'maha',

  tableName: 'crm_programs',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'program'
    },

    object_url: function() {
      return `/crm/programs/${this.get('id')}`
    }

  },

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  },

  accesses() {
    return this.hasMany(ProgramAccess, 'program_id')
  },

  fields() {
    return this.morphMany(Field, 'parent')
  },

  lists () {
    return this.hasMany(List, 'program_id').query(qb => {
      qb.orderBy('title', 'asc')
    })
  },

  bank() {
    return this.belongsTo(Bank, 'bank_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  senders () {
    return this.hasMany(Sender, 'program_id')
  },

  topics () {
    return this.hasMany(Topic, 'program_id').query(qb => {
      qb.orderBy('title', 'asc')
    })
  },

  voice_campaign () {
    return this.hasOne(VoiceCampaign, 'program_id').query(qb => {
      qb.where('direction', 'inbound')
      qb.where('status', 'active')
    })
  }

})

export default Program
