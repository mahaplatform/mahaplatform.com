import Fixtures from '../../../../core/objects/fixtures'

const offeringsFixtures = new Fixtures({

  tableName: 'eatfresh_offerings',

  records: {

    fresh_vegetables: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Fresh Vegetables',
      slug: 'fresh-vegetables',
      photo_id: data.maha_assets.vegetables.id
    }),

    local_meats: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Local Meats',
      slug: 'local-meats',
      photo_id: data.maha_assets.meat.id
    }),

    regional_wine: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Regional Wine',
      slug: 'regional-wine',
      photo_id: data.maha_assets.wine.id
    }),

    local_music: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Local Music',
      slug: 'local-music',
      photo_id: data.maha_assets.music.id
    })

  }

})

export default offeringsFixtures
