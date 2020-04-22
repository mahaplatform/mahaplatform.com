import express from 'express'
import path from 'path'

const getAdminRoot = (env) => {
  const root = path.resolve(__dirname,'..','..')
  if(env === 'production') return path.join(root,'..','public','admin')
  return path.join(root,'admin','public')
}

const getPublicRoot = (env) => {
  const root = path.resolve(__dirname,'..','..')
  if(env === 'production') return path.join(root,'..','public')
  return path.join(root,'public','public')
}

const adminRoot = getAdminRoot(process.env.NODE_ENV)

const publicRoot = getPublicRoot(process.env.NODE_ENV)

const router = new express.Router({ mergeParams: true })

router.use('/favicon.ico', (req, res) => {
  res.sendFile(path.join(adminRoot,'images','maha.png'))
})

router.get('/admin/js/notifications.js', (req, res) => {
  res.sendFile(path.join(adminRoot,'js','notifications.js'))
})

router.use('/admin', express.static(adminRoot, { redirect: false }))

router.use('/', express.static(publicRoot, { redirect: false }))

router.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => {
  res.status(404).send('Cannot locate asset')
})

export default router
