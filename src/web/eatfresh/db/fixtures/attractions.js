import { Fixtures } from 'maha'

const offeringsFixtures = new Fixtures({

  tableName: 'eatfresh_attractions',

  records: {

    niagra_city_market: (data) => ({
      team_id: data.maha_teams.acme.id,
      photo_id: data.maha_assets.niagra_city_market.id,
      title: 'Niagara Falls City Market',
      slug: 'niagara-falls-city-market',
      description: 'Kogi kitsch glossier vape mumblecore pok pok edison bulb, photo booth activated charcoal brunch chambray single-origin coffee raclette. Four loko poutine mumblecore meh unicorn. Actually plaid keffiyeh chia la croix messenger bag, farm-to-table paleo air plant cronut butcher gluten-free PBR&B XOXO food truck.',
      is_free_range: true,
      is_vegetarian: true,
      is_organic: true,
      is_accessible: false,
      is_family_friendly: false,
      is_senior: false,
      is_military: false,
      is_family_owned: false,
      county_id: data.eatfresh_counties.erie_county.id,
      address_1: 'Pine Ave. Market Square',
      address_2: 'between 18th & 19th streets',
      city: 'Niagara Falls',
      state: 'NY',
      zip: '14301',
      phone: '716-754-0798',
      hours_of_operation: 'Mon/Wed/Fri 9am-5pm year round',
      website: 'https://www.localharvest.org/niagara-falls-city-market-M2923',
      facebook: 'https://www.facebook.com/pages/Falls-City-Market/120513887963704',
      is_approved: true
    }),

    north_tonawanda_city_farmers_market: (data) => ({
      team_id: data.maha_teams.acme.id,
      photo_id: data.maha_assets.north_tonawanda_city_farmers_market.id,
      title: 'North Tonawanda City Farmers Market',
      slug: 'north-tonawanda-city-farmers-market',
      description: 'Kogi kitsch glossier vape mumblecore pok pok edison bulb, photo booth activated charcoal brunch chambray single-origin coffee raclette. Four loko poutine mumblecore meh unicorn. Actually plaid keffiyeh chia la croix messenger bag, farm-to-table paleo air plant cronut butcher gluten-free PBR&B XOXO food truck.',
      is_free_range: false,
      is_vegetarian: false,
      is_organic: false,
      is_accessible: true,
      is_family_friendly: true,
      is_senior: false,
      is_military: false,
      is_family_owned: false,
      county_id: data.eatfresh_counties.erie_county.id,
      address_1: 'Robinson Road at Payne Ave.',
      address_2: '',
      city: 'North Tonawanda',
      state: 'NY',
      zip: '14120',
      phone: '716-695-8541',
      hours_of_operation: 'Tue/Thu/Sat 7am-1pm year round',
      is_approved: true
    }),

    pendleton_farmers_market: (data) => ({
      team_id: data.maha_teams.acme.id,
      photo_id: data.maha_assets.pendleton_farmers_market.id,
      title: 'Pendleton Farmers Market',
      slug: 'pendleton-farmers-market',
      description: 'Kogi kitsch glossier vape mumblecore pok pok edison bulb, photo booth activated charcoal brunch chambray single-origin coffee raclette. Four loko poutine mumblecore meh unicorn. Actually plaid keffiyeh chia la croix messenger bag, farm-to-table paleo air plant cronut butcher gluten-free PBR&B XOXO food truck.',
      is_free_range: false,
      is_vegetarian: false,
      is_organic: false,
      is_accessible: false,
      is_family_friendly: false,
      is_senior: true,
      is_military: true,
      is_family_owned: true,
      county_id: data.eatfresh_counties.erie_county.id,
      address_1: 'Pendleton town park, 6570 Campbell Blvd',
      address_2: '(Rt. 270)',
      city: 'Lockport',
      state: 'NY',
      zip: '14094',
      phone: '716-625-8833',
      hours_of_operation: 'Thur. 3pm-8pm June to October',
      is_approved: true
    })

  }

})

export default offeringsFixtures
