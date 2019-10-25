import express from 'express'
import path from 'path'

const root = path.resolve(__dirname,'..','..','..','public')

const router = new express.Router({ mergeParams: true })

router.use('/favicon.ico', (req, res) => {
  res.sendFile(path.join(root,'admin','images','maha.png'))
})

router.get('/js/notifications.js', (req, res) => {
  res.sendFile(path.join(root,'admin','js','notifications.js'))
})

router.use(express.static(root, { redirect: false }))

router.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => {
  res.status(404).send('Cannot locate asset')
})

export default router
