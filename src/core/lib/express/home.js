import express from 'express'
import path from 'path'

const indexFile = path.resolve(__dirname,'..','..','admin','public','index.html')

const router = new express.Router({ mergeParams: true })

router.use((req, res) => res.sendFile(indexFile))

export default router
