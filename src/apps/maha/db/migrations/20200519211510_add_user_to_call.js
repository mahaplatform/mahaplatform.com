import ConatctPhoneNumber from '../../../crm/models/phone_number'
import PhoneNumber from '../../models/phone_number'
import SMS from '../../models/sms'

const AddUserToCall = {

  up: async (knex) => {

    await knex.schema.table('maha_calls', (table) => {
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('phone_number_id').unsigned()
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
    })

    await knex.schema.table('maha_smses', (table) => {
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('phone_number_id').unsigned()
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
    })

    const smses = await SMS.fetchAll({
      withRelated: ['to','from'],
      transacting: knex
    })

    await Promise.mapSeries(smses, async (sms) => {

      const phone_number = await PhoneNumber.query(qb => {
        if(sms.get('direction') === 'outbound') {
          qb.where('number', sms.related('from').get('number'))
        } else {
          qb.where('number', sms.related('to').get('number'))
        }
      }).fetch({
        withRelated: ['program'],
        transacting: knex
      })

      const contact_phone_number = await ConatctPhoneNumber.query(qb => {
        if(sms.get('direction') === 'outbound') {
          qb.where('number', sms.related('to').get('number'))
        } else {
          qb.where('number', sms.related('from').get('number'))
        }
      }).fetch({
        transacting: knex
      })

      if(!phone_number || !contact_phone_number) return

      await sms.save({
        program_id: phone_number.related('program').get('id'),
        phone_number_id: contact_phone_number.get('id')
      },{
        transacting: knex
      })

    })

  },

  down: async (knex) => {
  }

}

export default AddUserToCall
