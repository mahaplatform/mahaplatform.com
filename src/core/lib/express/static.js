import express from 'express'
import path from 'path'

const root = path.resolve(__dirname,'..','..','admin','public')

const router = new express.Router({ mergeParams: true })

router.use('/admin/favicon.ico', (req, res) => {
  res.sendFile(path.join(root,'images','maha.png'))
})

router.get('/admin/js/notifications.js', (req, res) => {
  res.sendFile(path.join(root,'js','notifications.js'))
})

router.use('/admin', express.static(root, { redirect: false }))

router.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => {
  res.status(404).send('Cannot locate asset')
})

export default router
