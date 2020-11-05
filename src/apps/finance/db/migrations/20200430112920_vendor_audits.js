import { audit } from '@core/services/routes/audit'
import Activity from '../../../maha/models/activity'
import Contact from '../../../crm/models/contact'
import Sender from '../../../crm/models/sender'
import Vendor from '../../models/vendor'

const VendorAudits = {

  up: async (knex) => {

    await knex.raw('update maha_activities set object_table=replace(object_table, \'expenses\', \'finance\') where object_table like \'expenses%\'')

    await knex.raw('update maha_activities set url=replace(url, \'admin/expenses\', \'admin/finance\') where url like \'%expenses%\'')

    const vendor_activities = await Activity.query(qb => {
      qb.where('object_table', 'finance_vendors')
    }).fetchAll({
      withRelated: ['team','user'],
      transacting: knex
    })

    await Promise.mapSeries(vendor_activities, async(activity) => {
      const vendor = await Vendor.query(qb => {
        qb.where('id', activity.get('object_id'))
      }).fetch({
        transacting: knex
      })
      if(!vendor) return
      await activity.save({
        object_text: vendor.get('object_text'),
        object_type: vendor.get('object_type'),
        url: vendor.get('object_url')
      }, {
        transacting: knex
      })

      await audit({
        team: activity.related('team'),
        user: activity.related('user'),
        trx: knex
      }, {
        story: activity.get('story_id') === 8 ? 'created' : 'updated',
        auditable: vendor,
        created_at: activity.get('created_at'),
        updated_at: activity.get('updated_at')
      })

    })

    const contact_activities = await Activity.query(qb => {
      qb.where('object_table', 'crm_contacts')
    }).fetchAll({
      withRelated: ['team','user'],
      transacting: knex
    })

    await Promise.mapSeries(contact_activities, async(activity) => {
      const contact = await Contact.query(qb => {
        qb.where('id', activity.get('object_id'))
      }).fetch({
        transacting: knex
      })
      if(!contact) return
      await activity.save({
        object_text: contact.get('object_text'),
        object_type: contact.get('object_type'),
        url: contact.get('object_url')
      }, {
        transacting: knex
      })
    })

    const sender_activities = await Activity.query(qb => {
      qb.where('object_table', 'crm_senders')
    }).fetchAll({
      withRelated: ['team','user'],
      transacting: knex
    })

    await Promise.mapSeries(sender_activities, async(activity) => {
      const sender = await Sender.query(qb => {
        qb.where('id', activity.get('object_id'))
      }).fetch({
        transacting: knex
      })
      if(!sender) return
      await activity.save({
        object_text: sender.get('object_text'),
        object_type: sender.get('object_type'),
        url: sender.get('object_url')
      }, {
        transacting: knex
      })
    })

  },

  down: async (knex) => {
  }

}

export default VendorAudits
