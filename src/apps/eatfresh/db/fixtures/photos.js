import { Fixtures } from 'maha'

const PhotosFixtures = new Fixtures({

  tableName: 'eatfresh_photos',

  records: {

    niagra_city_market_photo1: (data) => ({
      team_id: data.maha_teams.acme.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id,
      asset_id: data.maha_assets.niagra_city_market_photo1.id
    }),

    niagra_city_market_photo2: (data) => ({
      team_id: data.maha_teams.acme.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id,
      asset_id: data.maha_assets.niagra_city_market_photo2.id
    }),

    niagra_city_market_photo3: (data) => ({
      team_id: data.maha_teams.acme.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id,
      asset_id: data.maha_assets.niagra_city_market_photo3.id
    }),

    niagra_city_market_photo4: (data) => ({
      team_id: data.maha_teams.acme.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id,
      asset_id: data.maha_assets.niagra_city_market_photo4.id
    }),

    north_tonawanda_city_farmers_market_photo1: (data) => ({
      team_id: data.maha_teams.acme.id,
      attraction_id: data.eatfresh_attractions.north_tonawanda_city_farmers_market.id,
      asset_id: data.maha_assets.north_tonawanda_city_farmers_market_photo1.id
    }),

    north_tonawanda_city_farmers_market_photo2: (data) => ({
      team_id: data.maha_teams.acme.id,
      attraction_id: data.eatfresh_attractions.north_tonawanda_city_farmers_market.id,
      asset_id: data.maha_assets.north_tonawanda_city_farmers_market_photo2.id
    })

  }

})

export default PhotosFixtures
