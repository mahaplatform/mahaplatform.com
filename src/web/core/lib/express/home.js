import express from 'express'
import path from 'path'

const prodRoot = path.resolve(__dirname,'..','..','..','public','admin')

const devRoot = path.resolve(__dirname,'..','..','admin')

const getIndex = () => {
  if(process.env.NODE_ENV === 'production') return path.join(prodRoot,'index.html')
  return path.join(devRoot,'index.html')
}

const indexFile = getIndex()

const router = new express.Router({ mergeParams: true })

router.use((req, res) => res.sendFile(indexFile))

export default router
