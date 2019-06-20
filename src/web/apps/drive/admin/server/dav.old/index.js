import { v2 as webdav } from 'webdav-server'
import express from 'express'
import path from 'path'

import user_manager from './user_manager'
import privilege_manager from './privilege_manager'

const server = new webdav.WebDAVServer({
  httpAuthentication: new webdav.HTTPBasicAuthentication(user_manager, 'MAHA'),
  privilegeManager: privilege_manager
})

server.setFileSystem('/', new webdav.PhysicalFileSystem(path.resolve('..','webdavtest/foo')))

const router = express()

router.use(webdav.extensions.express('/', server))

export default router
