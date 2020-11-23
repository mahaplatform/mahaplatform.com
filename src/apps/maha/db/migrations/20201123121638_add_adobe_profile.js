import _ from 'lodash'

const AddAdobeProfile = {

  up: async (knex) => {

    await knex.raw('alter type maha_profiles_type add value \'signatures\'')

    const sources = {
      6: 'microsoft',
      7: 'facebook',
      8: 'instagram',
      9: 'dropbox',
      10: 'box',
      12: 'googledrive',
      13: 'googlephotos',
      14: 'googlecontacts',
      15: 'onedrive',
      16: 'outlook',
      17: 'constantcontact',
      18: 'mailchimp',
      19: 'twitter',
      20: 'outlook',
      21: 'gmail',
      25: 'qualtrics',
      26: 'adobe'
    }

    await knex.schema.table('maha_profiles', (table) => {
      table.enum('source', _.uniq(Object.values(sources)), { useNative: true, enumName: 'crm_profile_sources' })
    })

    const profiles = await knex('maha_profiles')

    await Promise.mapSeries(profiles, async (profile) => {
      await knex('maha_profiles').where('id', profile.id).update({
        source: sources[profile.source_id]
      })
    })

    await knex.schema.table('maha_profiles', (table) => {
      table.dropColumn('source_id')
    })

  },

  down: async (knex) => {
  }

}

export default AddAdobeProfile
