import { createAssetFromUrl } from '../../../maha/services/assets'
import Team from '../../../maha/models/team'
import generateCode from '../../../../core/utils/generate_code'
import moment from 'moment'

const categories = [
  { title: 'Tulips', products: [
    { title: 'Tulip Couleur Cardinal', price: 7.50, photo: 'https://cdn.shopify.com/s/files/1/1419/7120/products/sq2Tulip_Coleur_Cardinal.SHUT_1024x.jpg?v=1571439571' },
    { title: 'Tulip Paul Scherer', price: 7.50, photo: 'https://www.vanengelen.com/media/catalog/product/cache/1/thumbnail/0dc2d03fe217f8c83829496872af24a0/t/_/t_paul_scherer_6-w.jpg' },
    { title: 'Tulip Princess Irenet', price: 7.50, photo: 'https://cdn.shopify.com/s/files/1/1902/7917/products/Tulip-Princess-Irene-2017_x2000_crop_center.jpg?v=1571652790' },
    { title: 'Tulip Purple Prince', price: 7.50, photo: 'https://www.highcountrygardens.com/media/catalog/product/t/u/tulipa-purple-prince-elbo09868.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=560&width=560&canvas=560:560' },
    { title: 'Tulip Queen of Night', price: 7.50, photo: 'https://cdn.shopify.com/s/files/1/1902/7917/products/Tulip-Queen-of-Night-2017-3_x2000_crop_center.jpg?v=1531150781' },
    { title: 'Tulipa Little Beauty', price: 5.00, photo: 'https://cdn.shopify.com/s/files/1/1419/7120/products/sqTulip_Little_Beauty1.SHUT_800x.jpg?v=1571439573' }
  ] },
  { title: 'Narcissus', products: [
    { title: 'Narcissus Jetfire', price: 8.75, photo: 'https://cdn.shopify.com/s/files/1/1022/5071/products/daffodil-narcissus-jetfire-bulbs-early-blooming-now-shipping-1_700x700.jpg?v=1601248847' },
    { title: 'Narcissus Pheasant\'s Eye', price: 8.75, photo: 'https://s3.amazonaws.com/cdn.tulips.com/images/large/Pheasant-Eye.jpg' },
    { title: 'Narcissus Pink Charm', price: 8.75, photo: 'https://www.gardenia.net/storage/app/public/uploads/images/detail/207130%20Narcissus%20Pink%20CharmOptimized.jpg' },
    { title: 'Narcissus Tahiti', price: 8.75, photo: 'https://s3.amazonaws.com/cdn.brecks.com/images/800/67254.jpg' },
    { title: 'Narcissus Tête à Tête', price: 8.75, photo: 'https://thumbs.dreamstime.com/b/narcissus-tete-tete-detail-study-dwarf-flower-isolated-black-38621145.jpg' },
    { title: 'Narcissus Thalia', price: 8.75, photo: 'https://images.tulipworld.com/mmTW/Images/450X450/4313.jpg' },
    { title: 'Narcissus Yellow Cheerfulness', price: 8.75, photo: 'https://garden.org/pics/2017-05-01/JulieB/cabf45.jpg' },
    { title: 'Fragrant Narcissus Mix', price: 17.50, photo: 'https://www.highcountrygardens.com/media/catalog/product/d/a/daffodilfragrantmix.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=' }
  ] },
  { title: 'Amaryllis & Paperwhites', products: [
    { title: 'Amaryllis Floris Hecker', price: 12.00, photo: 'https://d3t0t2nqwmr1c9.cloudfront.net/photos/3455/Amaryllis_Hippeastrum_Floris_Hekker-1.medium.jpg' },
    { title: 'Amaryllis Double Record', price: 12.00, photo: 'https://royalcolors.com/wp-content/uploads/2015/08/royalcolors-amaryllis-hippeastrum-double_record.jpg' },
    { title: 'Paperwhite Ziva', price: 12.00, photo: 'https://www.vanengelen.com/media/catalog/product/cache/1/thumbnail/0dc2d03fe217f8c83829496872af24a0/p/a/paperwhite_ziva_extra_5.jpg' }
  ] },
  { title: 'Miscellaneous', products: [
    { title: 'Allium aflatunense Purple Sensation', price: 5.00, photo: 'https://www.gardenia.net/storage/app/public/uploads/images/0PawV68FurmXfsRJ0YlNVzL7eZlxBbCtwvw8mMV5.jpeg' },
    { title: 'Allium moly', price: 5.00, photo: 'https://www.gardentags.com/profile/bigemrg/images/935172/750/allium-moly.jpeg' },
    { title: 'Allium sphaerocephalon', price: 5.00, photo: 'https://cdn.shopify.com/s/files/1/1902/7917/products/Allium-Sphaerocephalon---Drumsticks5_x2000_crop_center.jpg?v=1582557329' },
    { title: 'Anemone blanda Blue Shades', price: 5.00, photo: 'https://cdn.shopify.com/s/files/1/1419/7120/products/Anemone_Blanda_Blue_Shades.SHUT_1024x.jpg?v=1571439553' },
    { title: 'Camassia quamash', price: 5.00, photo: 'https://www.plant-world-seeds.com/images/item_images/000/001/655/large_square/CAMASSIA_QUAMASH.JPG?1495388219' },
    { title: 'Chionodoxa luciliae', price: 5.00, photo: 'https://www.maxpixel.net/static/photo/1x/Scilla-Spring-Chionodoxa-Luciliae-Blue-Star-2162802.jpg' },
    { title: 'Majestic Lavender Dutch Crocus Mix', price: 5.00, photo: 'https://www.johnscheepers.com/media/catalog/product/cache/1/thumbnail/0dc2d03fe217f8c83829496872af24a0/c/r/cr_majestic_1.jpg' },
    { title: 'Crocus sieberi ssp. sub. tricolor', price: 5.00, photo: 'https://cdn.shopify.com/s/files/1/1419/7120/products/sqCrocus_sieberi_Tricolor.DV_1_grande.jpg?v=1595956922' },
    { title: 'Galanthus elwesii', price: 7.50, photo: 'https://www.gardenia.net/storage/app/public/uploads/images/Galanthus%20elwesii.jpg' },
    { title: 'Dutch Iris Rainbow Mix', price: 5.00, photo: 'https://www.americanmeadows.com/media/catalog/product/i/r/iris-hollandica-dutch-iris-mix.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=' },
    { title: 'Shades-of-Blue Iris reticulata Mix', price: 7.50, photo: 'https://www.gardenia.net/storage/app/public/plant_family/detail/215818%20Optimized.jpg' },
    { title: 'Muscari armeniacum Valerie Finnis', price: 5.00, photo: 'https://www.vanengelen.com/media/catalog/product/cache/1/thumbnail/0dc2d03fe217f8c83829496872af24a0/m/u/musc_valerie_finnis.jpg' },
    { title: 'Scilla siberica Spring Beauty', price: 7.50, photo: 'https://i.ebayimg.com/images/g/aO8AAOSwUZZbitnt/s-l400.jpg' }
  ] }
]

const Bulbsale = {

  up: async (knex) => {

    const team = await Team.where('id', 1).fetch({
      transacting: knex
    })

    const req = {
      trx: knex,
      team
    }

    const store_code = await generateCode(req, {
      table: 'stores_stores'
    })

    const store = await knex('stores_stores').insert({
      team_id: 1,
      program_id: 20,
      code: store_code,
      title: '2020 Master Gardener Bulb Sale',
      contact_config: {
        fields: []
      },
      created_at: moment(),
      updated_at: moment()
    }).returning('*').then(results => results[0])

    await Promise.mapSeries(categories, async (category, delta) => {

      const cat = await knex('stores_categories').insert({
        team_id: 1,
        store_id: store.id,
        delta,
        title: category.title,
        slug: category.title.replace(/[^A-Za-z0-9\s]+/g, '').replace(/[\s]+/g, '_').toLowerCase(),
        created_at: moment(),
        updated_at: moment()
      }).returning('*').then(results => results[0])

      await Promise.mapSeries(category.products, async product => {

        const prod_code = await generateCode(req, {
          table: 'stores_products'
        })

        const prod = await knex('stores_products').insert({
          team_id: 1,
          store_id: store.id,
          category_id: cat.id,
          code: prod_code,
          title: product.title,
          type: 'physical',
          description: 'Im baby fixie normcore meditation kitsch cred meggings, single-origin coffee master cleanse tofu tacos offal venmo 8-bit shoreditch you probably havent heard of them. Single-origin coffee cloud bread offal health goth, master cleanse woke +1 helvetica 3 wolf moon man braid. Venmo street art activated charcoal meditation actually. Pitchfork master cleanse vice you probably havent heard of them green juice palo santo franzen cred banh mi mustache.',
          options: [],
          is_active: true,
          created_at: moment(),
          updated_at: moment()
        }).returning('*').then(results => results[0])

        const variant_code = await generateCode(req, {
          table: 'stores_variants'
        })

        const variant = await knex('stores_variants').insert({
          team_id: 1,
          product_id: prod.id,
          code: variant_code,
          price_type: 'fixed',
          fixed_price: product.price,
          tax_rate: 0.00,
          is_tax_deductable: false,
          inventory_policy: 'deny',
          inventory_quantity: 40,
          options: [],
          shipping_strategy: 'none',
          is_active: true,
          created_at: moment(),
          updated_at: moment()
        }).returning('*').then(results => results[0])

        console.log(product.photo)

        const asset = await createAssetFromUrl(req, {
          url: product.photo
        })

        await knex('stores_photos').insert({
          team_id: 1,
          variant_id: variant.id,
          asset_id: asset.get('id'),
          delta: 0,
          created_at: moment(),
          updated_at: moment()
        })

      })

    })

  },

  down: async (knex) => {
  }

}

export default Bulbsale
