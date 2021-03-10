import Store from '@apps/stores/models/store'
import { encode } from '@core/services/jwt'

const showRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['program.logo','team.logo','categories'],
    transacting: req.trx
  })

  const team = store.related('team')

  const program = store.related('program')

  res.status(200).respond({
    program: {
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    },
    store: {
      id: store.get('id'),
      code: store.get('code'),
      title: store.get('title'),
      path: store.get('path'),
      url: store.get('url'),
      categories: store.related('categories').map(category => ({
        id: category.get('id'),
        slug: category.get('slug'),
        title: category.get('title')
      }))
    },
    team: {
      title: team.get('title'),
      logo: team.related('logo') ? team.related('logo').get('path') : null
    },
    token: encode({ code: store.get('code') }, 60 * 60 * 2)
  })

}

export default showRoute
