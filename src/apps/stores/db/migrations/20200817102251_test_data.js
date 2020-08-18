const TestData = {

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
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: []
    },{
      team_id: 1,
      store_id: 1,
      code: 'def',
      title: 'Shoes',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: []
    },{
      team_id: 1,
      store_id: 1,
      code: 'ghi',
      title: 'Belt',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: []
    },{
      team_id: 1,
      store_id: 1,
      code: 'jkl',
      title: 'Suspenders',
      description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
      options: []
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
      options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: 'medium' } ]
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
      options: [ { option: 'Color', value: 'orange'}, { option: 'Size', value: 'medium' } ]
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
      options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: '11' } ]
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
      options: [ { option: 'Color', value: 'red'}, { option: 'Size', value: '12' } ]
    },{
      team_id: 1,
      product_id: 3,
      code: 'mno',
      price_type: 'fixed',
      project_id: 1,
      revenue_type_id: 1,
      fixed_price: 35.00,
      tax_rate: 0.000,
      is_tax_deductable: false,
      inventory_quantity: 10,
      inventory_policy: 'deny',
      options: [ { option: 'Color', value: 'black'} ]
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
      inventory_quantity: 10,
      inventory_policy: 'deny',
      options: [ { option: 'Color', value: 'brown'} ]
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
      inventory_quantity: 10,
      inventory_policy: 'deny',
      options: []
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
