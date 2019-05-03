import Fixtures from '../../../../core/objects/fixtures'

const categoriesFixtures = new Fixtures({

  tableName: 'eatfresh_categories',

  records: {

    road_side_stand: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Road-Side Stand',
      photo_id: data.maha_assets.restaurants.id
    }),

    farm_market: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Farm Market',
      photo_id: data.maha_assets.farmers_markets.id
    }),

    farmers_market: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Farmers Market',
      photo_id: data.maha_assets.farmers_markets.id
    }),

    upick: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'U-Pick',
      photo_id: data.maha_assets.farmers_markets.id
    }),

    winery: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Winery',
      photo_id: data.maha_assets.wineries.id
    }),

    brewery_cidery: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Brewery / Cidery',
      photo_id: data.maha_assets.breweries.id
    }),

    restaurant: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Restaurant',
      photo_id: data.maha_assets.restaurants.id
    }),

    christmas_tree_farm: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Christmas Tree Farm',
      photo_id: data.maha_assets.restaurants.id
    }),

    farm_tour_farm_stay: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Farm Tour / Farm Stay',
      photo_id: data.maha_assets.farmers_markets.id
    }),

    meat_market: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Meat Market',
      photo_id: data.maha_assets.breweries.id
    })

  }

})

export default categoriesFixtures
