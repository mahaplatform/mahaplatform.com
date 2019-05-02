import { Fixtures } from 'maha'

const attractionsFixtures = new Fixtures({

  tableName: 'eatfresh_offerings_attractions',

  records: {

    niagra_city_market_fresh_vegetables: (data) => ({
      offering_id: data.eatfresh_offerings.fresh_vegetables.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id
    }),

    niagra_city_market_local_meats: (data) => ({
      offering_id: data.eatfresh_offerings.local_meats.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id
    }),

    niagra_city_market_regional_wine: (data) => ({
      offering_id: data.eatfresh_offerings.regional_wine.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id
    }),

    niagra_city_market_local_music: (data) => ({
      offering_id: data.eatfresh_offerings.local_music.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id
    }),

    north_tonawanda_city_fresh_vegetables: (data) => ({
      offering_id: data.eatfresh_offerings.fresh_vegetables.id,
      attraction_id: data.eatfresh_attractions.north_tonawanda_city_farmers_market.id
    }),

    north_tonawanda_city_local_meats: (data) => ({
      offering_id: data.eatfresh_offerings.local_meats.id,
      attraction_id: data.eatfresh_attractions.north_tonawanda_city_farmers_market.id
    })

  }

})

export default attractionsFixtures
