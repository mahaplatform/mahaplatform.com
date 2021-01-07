import moment from 'moment'

const TestData = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex('stores_stores').insert({
      team_id: 1,
      program_id: 1,
      code: 'maha',
      title: 'Maha Store',
      contact_config: {
        fields: []
      }
    })

    await knex('stores_products').insert([{
      team_id: 1,
      store_id: 1,
      code: 'abc',
      title: 'Socks',
      type: 'physical',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: [],
      is_active: true
    },{
      team_id: 1,
      store_id: 1,
      code: 'def',
      title: 'Shoes',
      type: 'physical',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: [],
      is_active: true
    },{
      team_id: 1,
      store_id: 1,
      code: 'ghi',
      title: 'Workshop',
      type: 'url',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: [],
      is_active: true
    },{
      team_id: 1,
      store_id: 1,
      code: 'jkl',
      title: 'Software',
      type: 'file',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: [],
      is_active: true
    },{
      team_id: 1,
      store_id: 1,
      code: 'mno',
      title: 'Deactivated',
      type: 'file',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: [],
      is_active: false
    },{
      team_id: 1,
      store_id: 1,
      code: 'pqr',
      title: 'Deleted',
      type: 'file',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: [],
      is_active: false,
      deleted_at: moment()
    }])

    await knex('stores_variants').insert([{
      team_id: 1,
      product_id: 1,
      code: 'abc',
      price_type: 'fixed',
      project_id: 1,
      revenue_type_id: 1,
      fixed_price: 15.00,
      tax_rate: 0.000,
      is_tax_deductable: false,
      inventory_quantity: 10,
      inventory_policy: 'deny',
      max_per_order: 2,
      options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: 'medium' } ],
      shipping_strategy: 'flat',
      shipping_fee: 2.25,
      is_active: true
    },{
      team_id: 1,
      product_id: 1,
      code: 'def',
      price_type: 'fixed',
      project_id: 1,
      revenue_type_id: 1,
      fixed_price: 15.00,
      tax_rate: 0.000,
      is_tax_deductable: false,
      inventory_quantity: 10,
      inventory_policy: 'deny',
      options: [ { option: 'Color', value: 'orange'}, { option: 'Size', value: 'medium' } ],
      shipping_strategy: 'flat',
      shipping_fee: 2.25,
      is_active: true
    },{
      team_id: 1,
      product_id: 2,
      code: 'ghi',
      price_type: 'fixed',
      project_id: 1,
      revenue_type_id: 1,
      fixed_price: 25.00,
      tax_rate: 0.000,
      is_tax_deductable: false,
      inventory_quantity: 10,
      inventory_policy: 'deny',
      options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: '11' } ],
      shipping_strategy: 'free',
      is_active: true
    },{
      team_id: 1,
      product_id: 2,
      code: 'jkl',
      price_type: 'fixed',
      project_id: 1,
      revenue_type_id: 1,
      fixed_price: 25.00,
      tax_rate: 0.000,
      is_tax_deductable: false,
      inventory_quantity: 10,
      inventory_policy: 'deny',
      options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: '12' } ],
      shipping_strategy: 'free',
      is_active: true
    },{
      team_id: 1,
      product_id: 3,
      code: 'mno',
      price_type: 'fixed',
      project_id: 1,
      revenue_type_id: 1,
      fixed_price: 45.00,
      tax_rate: 0.000,
      is_tax_deductable: false,
      inventory_quantity: null,
      inventory_policy: null,
      file_id: 8346,
      options: [ { option: 'Version', value: 'with slides' } ],
      is_active: true
    },{
      team_id: 1,
      product_id: 3,
      code: 'pqr',
      price_type: 'fixed',
      project_id: 1,
      revenue_type_id: 1,
      fixed_price: 35.00,
      tax_rate: 0.000,
      is_tax_deductable: false,
      inventory_quantity: null,
      inventory_policy: null,
      file_id: 8346,
      options: [ { option: 'Version', value: 'without slides' } ],
      is_active: true
    },{
      team_id: 1,
      product_id: 4,
      code: 'stu',
      price_type: 'fixed',
      project_id: 1,
      revenue_type_id: 1,
      fixed_price: 45.00,
      tax_rate: 0.000,
      is_tax_deductable: false,
      inventory_quantity: null,
      inventory_policy: null,
      url: 'http://google.com',
      options: [],
      is_active: true
    }])

    await knex('stores_media').insert([{
      team_id: 1,
      variant_id: 1,
      asset_id: 8346,
      delta: 0
    },{
      team_id: 1,
      variant_id: 1,
      asset_id: 17662,
      delta: 1
    },{
      team_id: 1,
      variant_id: 2,
      asset_id: 17662,
      delta: 0
    },{
      team_id: 1,
      variant_id: 2,
      asset_id: 8346,
      delta: 1
    },{
      team_id: 1,
      variant_id: 3,
      asset_id: 8346,
      delta: 0
    },{
      team_id: 1,
      variant_id: 3,
      asset_id: 17662,
      delta: 1
    },{
      team_id: 1,
      variant_id: 4,
      asset_id: 17662,
      delta: 0
    },{
      team_id: 1,
      variant_id: 4,
      asset_id: 8346,
      delta: 1
    },{
      team_id: 1,
      variant_id: 5,
      asset_id: 8346,
      delta: 0
    },{
      team_id: 1,
      variant_id: 5,
      asset_id: 17662,
      delta: 1
    },{
      team_id: 1,
      variant_id: 6,
      asset_id: 17662,
      delta: 0
    },{
      team_id: 1,
      variant_id: 6,
      asset_id: 8346,
      delta: 1
    },{
      team_id: 1,
      variant_id: 7,
      asset_id: 8346,
      delta: 0
    },{
      team_id: 1,
      variant_id: 7,
      asset_id: 17662,
      delta: 1
    }])

  },

  down: async (knex) => {
  }

}

export default TestData
