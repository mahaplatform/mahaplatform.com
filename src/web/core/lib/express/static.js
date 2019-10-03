import express from 'express'
import path from 'path'

const prodRoot = path.resolve(__dirname,'..','..','..','..','public','admin')

const devRoot = path.resolve(__dirname,'..','..','..','..','public')

const getStaticRoot = () => {
  if(process.env.NODE_ENV === 'production') return prodRoot
  return devRoot
}

const root = getStaticRoot()

const router = new express.Router({ mergeParams: true })

router.use('/favicon.ico', (req, res) => {
  res.sendFile(path.join(root,'images','maha.png'))
})

router.get('/js/notifications.js', (req, res) => {
  res.sendFile(path.join(root,'js','notifications.js'))
})

router.use('/admin', express.static(root, { redirect: false }))

router.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => {
  res.status(404).send('Cannot locate asset')
})

export default router
