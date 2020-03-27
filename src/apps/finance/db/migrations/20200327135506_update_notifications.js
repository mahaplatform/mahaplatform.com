import Notification from '../../../maha/models/notification'

const UpdateNotifications = {

  up: async (knex) => {

    await Promise.mapSeries(['advance','check','expense','reimbursement','trip'], async (model) => {
      await knex('maha_notifications').where({
        object_table: `expenses_${model}s`
      }).update({
        object_table: `finance_${model}s`
      })
    })

    const notifications = await Notification.query(qb => {
      qb.where('object_table', 'finance_items')
    }).fetchAll({
      transacting: knex
    })

    await Promise.mapSeries(notifications, async (notification) => {

      const items = await knex(`finance_${notification.get('object_type')}s`).where({
        user_id: notification.get('object_owner_id'),
        description: notification.get('object_text')
      })

      if(items.length > 0) {
        const item = items[0]
        await notification.save({
          object_table: `finance_${notification.get('object_type')}s`,
          object_id: item.id,
          url: `/admin/finance/${notification.get('object_type')}s/${item.id}`
        }, {
          transacting: knex
        })
      }

    })

  },

  down: async (knex) => {
  }

}

export default UpdateNotifications
