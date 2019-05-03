import Fixtures from '../../../../core/objects/fixtures'

const attractionsFixtures = new Fixtures({

  tableName: 'eatfresh_categories_attractions',

  records: {

    niagra_city_market: (data) => ({
      category_id: data.eatfresh_categories.farmers_market.id,
      attraction_id: data.eatfresh_attractions.niagra_city_market.id
    }),

    north_tonawanda_city_farmers_market: (data) => ({
      category_id: data.eatfresh_categories.farmers_market.id,
      attraction_id: data.eatfresh_attractions.north_tonawanda_city_farmers_market.id
    }),

    pendleton_farmers_market: (data) => ({
      category_id: data.eatfresh_categories.farmers_market.id,
      attraction_id: data.eatfresh_attractions.pendleton_farmers_market.id
    })

  }

})

export default attractionsFixtures
