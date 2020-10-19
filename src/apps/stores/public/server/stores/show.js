import ProductSerializer from '../../../serializers/product_serializer'
import { encode } from '../../../../../core/services/jwt'
import Product from '../../../models/product'
import Store from '../../../models/store'
import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['program.logo','team.logo','categories'],
    transacting: req.trx
  })

  req.team = store.related('team')

  const products = await Product.query(qb => {
    qb.where('store_id', store.get('id'))
    qb.where('is_active', true)
    qb.whereNull('deleted_at')
  }).fetchAll({
    withRelated: ['category','variants.photos.asset','variants.project','variants.revenue_type','variants.donation_revenue_type'],
    transacting: req.trx
  })

  const template = await readFile(path.join('stores','store','index.html'))

  const program = store.related('program')

  const content = ejs.render(template, {
    program: {
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    },
    store: {
      id: store.get('id'),
      code: store.get('code'),
      title: store.get('title'),
      url: store.get('url'),
      products: products.map(product => ProductSerializer(req, product)),
      categories: store.related('categories').map(category => ({
        id: category.get('id'),
        slug: category.get('slug'),
        title: category.get('title')
      }))
    },
    team: {
      title: req.team.get('title'),
      logo: req.team.related('logo') ? req.team.related('logo').get('path') : null
    },
    token: encode({ code: store.get('code') }, 60 * 60 * 2)
  })

  res.status(200).send(content)

}

export default showRoute
