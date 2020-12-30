import { deleteObjects, listObjects, upload } from '@core/services/aws/s3'
import mime from 'mime-types'
import rimraf from 'rimraf'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const getFiles = (dirpath) => {

  return fs.readdirSync(dirpath).reduce((files, item) => {

    const itempath = path.join(dirpath,item)

    return [
      ...files,
      ...fs.lstatSync(itempath).isDirectory() ? getFiles(itempath) : [itempath]
    ]

  }, [])

}

const publishSite = async(req, { code, hash }) => {

  const basekey = path.join(code)

  const basepath = path.resolve('web', code)

  const buildspath = path.join(basepath, 'builds')

  const buildpath = path.join(buildspath, hash)

  const nextpath = path.join(buildpath, '_next')

  const staticpath = path.join(nextpath, 'static')

  const chunkspath = path.join(staticpath, 'chunks')

  const csspath = path.join(staticpath, 'css')

  const buildhash = fs.readdirSync(nextpath).find(path => !_.includes(['data','static'], path))

  const manifestpath = path.join(staticpath, buildhash)

  const datapath = path.join(nextpath, 'data', buildhash)

  const currentpath = path.join(buildpath, 'current')

  const nextkey = path.join(basekey, '_next')

  const statickey = path.join(nextkey, 'static')

  const chunkskey = path.join(statickey, 'chunks')

  const csskey = path.join(statickey, 'css')

  const manifestkey = path.join(statickey, buildhash)

  const datakey = path.join(nextkey, 'data', buildhash)

  const currentkey = path.join(basekey, 'current')

  const staticdirs = [
    { path: chunkspath, key: chunkskey },
    { path: csspath, key: csskey }
  ]

  await Promise.mapSeries(staticdirs, async (staticdir) => {

    const existing = await listObjects(req, {
      prefix: staticdir.key
    })

    await Promise.mapSeries(getFiles(staticdir.path), async (file) => {

      const key = path.join(staticdir.key, file.replace(staticdir.path, ''))

      if(_.includes(existing, key)) return

      await upload(req, {
        key,
        cache_control: 'immutable,max-age=100000000,public',
        file_data: fs.readFileSync(file, 'utf8')
      })

    })

  })

  await Promise.mapSeries(getFiles(manifestpath), async (file) => {
    await upload(req, {
      key: path.join(manifestkey, file.replace(manifestpath, '')),
      cache_control: 'immutable,max-age=100000000,public',
      file_data: fs.readFileSync(file, 'utf8')
    })
  })

  await Promise.mapSeries(getFiles(datapath), async (file) => {
    await upload(req, {
      key: path.join(datakey, file.replace(datapath, '')),
      cache_control: 'immutable,max-age=100000000,public',
      file_data: fs.readFileSync(file, 'utf8')
    })
  })

  const currentkeys = await listObjects(req, {
    prefix: currentkey
  })

  const notfound = await Promise.reduce(getFiles(currentpath), async (notfound, file) => {

    const filepath = file.replace(currentpath, '').replace('.html','')

    const to = path.join(currentkey, filepath)

    const isStatic = /current\/static/.test(to)

    const exists = _.includes(currentkeys, to)

    if(!isStatic || !exists) {
      await upload(req, {
        key: to,
        file_data: fs.readFileSync(file, 'utf8'),
        cache_control: isStatic ? 'immutable,max-age=100000000,public' : 'max-age=0,no-cache',
        content_type: mime.lookup(path.basename(file))
      })
    }

    return notfound.filter(key => {
      return key !== to
    })

  }, currentkeys)

  if(notfound.length > 0) {
    await deleteObjects(req, {
      keys: notfound
    })
  }

  rimraf.sync(buildpath)

}

export default publishSite
