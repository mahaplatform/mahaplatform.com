import Profile from '../../models/profile'
import Asset from '../../models/asset'

const AddAssetMetadata = {

  up: async (knex) => {

    await knex.schema.createTable('maha_sources', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex('maha_sources').insert([
      { text: 'device' },
      { text: 'web' },
      { text: 'email' },
      { text: 'maha' },
      { text: 'google' },
      { text: 'microsoft' },
      { text: 'facebook' },
      { text: 'instagram' },
      { text: 'dropbox' },
      { text: 'box' }
    ])

    await knex.schema.table('maha_profiles', (table) => {
      table.integer('source_id').unsigned()
      table.foreign('source_id').references('maha_sources.id')
    })

    const map = {
      1: 5,
      6: 6,
      2: 7,
      3: 8,
      4: 9,
      5: 10
    }

    const profiles = await Profile.fetchAll({ transacting: knex })

    await Promise.mapSeries(profiles.toArray(), async profile => {

      await profile.save({
        source_id: map[profile.get('profile_type_id')]
      }, { patch: true,  transacting: knex  })

    })

    await knex.schema.table('maha_profiles', (table) => {
      table.dropColumn('profile_type_id')
    })

    await knex.schema.table('maha_assets', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('source_id').unsigned()
      table.foreign('source_id').references('maha_sources.id')
    })

    const assets = await Asset.fetchAll({ transacting: knex })

    const getUserId = async (asset) => {

      const asset_id = asset.get('id')

      if(asset.get('team_id') === 7) return 192

      const receipt = await knex('expenses_receipts').where({ asset_id })

      if(receipt[0]) {

        if(receipt[0].expense_id) {

          const expense = await knex('expenses_expenses').where({ id: receipt[0].expense_id })

          if(expense[0]) return expense[0].user_id

        }

        if(receipt[0].reimbursement_id) {

          const reimbursement = await knex('expenses_reimbursements').where({ id: receipt[0].reimbursement_id })

          if(reimbursement[0]) return reimbursement[0].user_id

        }

        if(receipt[0].check_id) {

          const check = await knex('expenses_reimbursements').where({ id: receipt[0].check_id })

          if(check[0]) return check[0].user_id

        }

      }

      const user = await knex('maha_users').where({ photo_id: asset_id })

      if(user[0]) return user[0].id

      const version = await knex('drive_versions').where({ asset_id })

      if(version[0]) return version[0].user_id

      return null

    }

    await Promise.mapSeries(assets.toArray(), async asset => {

      const user_id = await getUserId(asset)

      await asset.save({
        source_id: 1,
        user_id
      }, { patch: true, transacting: knex  })

    })

    return await knex.schema.dropTable('maha_profile_types')

  },

  down: async (knex) => {}

}

export default AddAssetMetadata
