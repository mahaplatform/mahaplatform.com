import { createDefaultInboundCampaign } from '../../services/voice_campaigns'
import PhoneNumber from '@apps/maha/models/phone_number'

const CreateDefaultInboundCampaigns = {

  up: async (knex) => {

    const phone_numbers = await PhoneNumber.query(qb => {
      qb.where('type', 'voice')
    }).fetchAll({
      withRelated: ['voice_campaigns','program.accesses.user','team'],
      transacting: knex
    })

    const req = {
      trx: knex
    }

    await Promise.mapSeries(phone_numbers, async (phone_number) => {

      if(phone_number.related('voice_campaigns').length > 0) return

      req.team = phone_number.related('team')

      const access = phone_number.related('program').related('accesses').toArray().find(access => {
        return access.get('user_id') && access.get('type') !== 'view'
      })

      req.user = access ? access.related('user') : { get: () => 1 }

      await createDefaultInboundCampaign(req, {
        phone_number,
        program: phone_number.related('program')
      })

    })

  },

  down: async (knex) => {
  }

}

export default CreateDefaultInboundCampaigns
