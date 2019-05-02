import Item from '../models/item'
import express from 'express'
import path from 'path'

const server = (router) => {

  const server = express()

  server.set('views', path.join(__dirname, 'templates'))

  server.set('view engine', 'ejs')

  server.get('/drive/share/:code', async (req, res) => {

    const item = await Item.where({
      code: req.params.code
    }).fetch({
      withRelated: ['asset']
    })

    if(!item) return res.status(404).send('Not Found')

    res.status(200).render('share', {
      asset: item.related('asset').toJSON()
    })

  })

  router.use(server)

  return router

}

export default server
