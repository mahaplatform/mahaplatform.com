import express from 'express'
import path from 'path'

const getRoot = (env) => {
  const root = path.resolve(__dirname,'..','..')
  if(env === 'production') return path.join(root,'..','public')
  return path.join(root,'admin','public')
}

const root = getRoot(process.env.NODE_ENV)

const indexFile = path.join(root,'index.html')

const router = new express.Router({ mergeParams: true })

router.use((req, res) => res.sendFile(indexFile))

export default router
