import { encode } from '../../../../../core/services/jwt'
import Store from '../../../models/store'
import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('id', 1)
  }).fetch({
    withRelated: ['program.logo','team.logo'],
    transacting: req.trx
  })

  req.team = store.related('team')

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
      url: store.get('url')
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
