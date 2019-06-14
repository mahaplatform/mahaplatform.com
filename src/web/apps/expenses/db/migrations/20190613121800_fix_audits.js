import moment from 'moment'

const FixAudits = {

  up: async (knex) => {

    // handle processed audits
    await knex.raw('delete from maha_audits where story_id >= 27 and story_id <=40')
    const processed = await knex('expenses_items').whereNotNull('batch_id')
    await Promise.mapSeries(processed, async item => {
      const batch = await knex('expenses_batches').where('id', item.batch_id)
      await knex('maha_audits').insert({
        team_id: 1,
        user_id: batch[0].user_id,
        auditable_type: `expenses_${item.type}s`,
        auditable_id: item.item_id,
        story_id: 27,
        created_at: batch[0].created_at,
        updated_at: batch[0].updated_at
      })
    })

    // handle non user submissions
    const submitted = await knex('maha_audits').where('story_id', 12)
    await Promise.mapSeries(submitted, async audit => {
      const item = await knex(audit.auditable_type).where('id', audit.auditable_id)
      if(item[0] && audit.user_id === item[0].user_id) return
      await knex.raw('delete from maha_audits where id = ?', audit.id)
    })

    // add missing submissions
    const items = await knex('expenses_items').whereNotIn('status_id',[1,2])
    await Promise.mapSeries(items, async item => {
      const audits = await knex('maha_audits').where('auditable_type', `expenses_${item.type}s`).where('auditable_id', `${item.item_id}`).orderBy('created_at', 'asc')
      const submitted = audits.reduce((total, audit) => {
        return total + (audit.story_id === 12 ? 1 : 0)
      }, 0)
      if(submitted > 0) return
      const created_at = audits.reduce((created_at, audit, index) => {
        if(created_at !== null) return created_at
        if(audit.story_id !== 9 && audit.story_id !== 10 && index > 0) return audits[index - 1].created_at
        return null
      }, null)
      if(created_at !== null) {
        await knex('maha_audits').insert({
          team_id: 1,
          user_id: item.user_id,
          auditable_type: `expenses_${item.type}s`,
          auditable_id: item.item_id,
          story_id: 12,
          created_at: moment(created_at).add(5, 'minutes'),
          updated_at: moment(created_at).add(5, 'minutes')
        })
      }
    })

    // add missing submitted
    await Promise.mapSeries(items, async item => {
      const audits = await knex('maha_audits').where('auditable_type', `expenses_${item.type}s`).where('auditable_id', `${item.item_id}`).orderBy('created_at', 'asc')
      const submitted = audits.reduce((total, audit) => {
        return total + (audit.story_id === 12 ? 1 : 0)
      }, 0)
      if(submitted > 0) return
      const created_at = audits.reduce((created_at, audit, index) => {
        if(created_at !== null) return created_at
        if(audit.story_id !== 9 && audit.story_id !== 10 && index > 0) return audits[index - 1].created_at
        return null
      }, null)
      if(created_at !== null) {
        await knex('maha_audits').insert({
          team_id: 1,
          user_id: item.user_id,
          auditable_type: `expenses_${item.type}s`,
          auditable_id: item.item_id,
          story_id: 12,
          created_at: moment(created_at).add(5, 'minutes'),
          updated_at: moment(created_at).add(5, 'minutes')
        })
      }
    })

    // remove unused stories
    await knex.raw('delete from maha_stories where id >= 28 and id <=40')

  },

  down: async (knex) => {

  }

}

export default FixAudits
