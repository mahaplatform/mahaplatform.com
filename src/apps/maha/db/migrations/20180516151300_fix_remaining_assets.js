import Asset from '@apps/maha/models/asset'

const FixRemainingAssets = {

  databaseName: 'maha',

  up: async (knex) => {

    const assets = await Asset.query(qb => {

      qb.whereNull('user_id')

    }).fetchAll({ transacting: knex })

    const getUserId = async (asset) => {

      const asset_id = asset.get('id')

      const team = await knex('maha_teams').where({ logo_id: asset_id })

      if(team[0]) {

        if(team[0].id === 1) return 79

        if(team[0].id === 7) return 189

        if(team[0].id === 8) return 195

      }

      const receipt = await knex('expenses_receipts').where({ asset_id })

      if(receipt[0]) {

        if(receipt[0].check_id) {

          const check = await knex('expenses_checks').where({ id: receipt[0].check_id })

          if(check[0]) return check[0].user_id

        }

      }

      const attachment = await knex('maha_attachments').where({ asset_id })

      if(attachment[0]) {

        const item = await knex(attachment[0].attachable_type).where({ id: attachment[0].attachable_id })

        if(item[0]) return item[0].user_id

        await knex('maha_attachments').where({ asset_id }).del()

      }

      return null

    }

    await Promise.mapSeries(assets.toArray(), async asset => {

      const user_id = await getUserId(asset)

      await asset.save({
        user_id
      }, { patch: true, transacting: knex  })

    })

    await knex('maha_assets').whereNull('user_id').del()

  },

  down: async (knex) => {}

}

export default FixRemainingAssets
