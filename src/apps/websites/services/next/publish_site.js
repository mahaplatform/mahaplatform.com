import { deleteObjects, listObjects, upload } from '@core/services/aws/s3'
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

  const buildhash = fs.readdirSync(nextpath).find(path => path !== 'static')

  const manifestpath = path.join(staticpath, buildhash)

  const publicpath = path.join(buildpath, 'public')

  const nextkey = path.join(basekey, '_next')

  const statickey = path.join(nextkey, 'static')

  const chunkskey = path.join(statickey, 'chunks')

  const manifestkey = path.join(statickey, buildhash)

  const currentkey = path.join(basekey, 'current')

  const chunkskeys = await listObjects(req, {
    prefix: chunkskey
  })

  await Promise.mapSeries(getFiles(chunkspath), async (file) => {

    const key = path.join(chunkskey, file.replace(chunkspath, ''))

    if(_.includes(chunkskeys, key)) return

    await upload(req, {
      key,
      cache_control: 'immutable,max-age=100000000,public',
      file_data: fs.readFileSync(file, 'utf8')
    })

  })

  await Promise.mapSeries(getFiles(manifestpath), async (file) => {

    const key = path.join(manifestkey, file.replace(manifestpath, ''))

    await upload(req, {
      key,
      cache_control: 'immutable,max-age=100000000,public',
      file_data: fs.readFileSync(file, 'utf8')
    })

  })

  const currentkeys = await listObjects(req, {
    prefix: currentkey
  })

  const notfound = await Promise.reduce(getFiles(publicpath), async (notfound, file) => {

    const filepath = file.replace(publicpath, '').replace('.html','')

    const to = path.join(currentkey, filepath)

    await upload(req, {
      key: to,
      file_data: fs.readFileSync(file, 'utf8'),
      cache_control: 'max-age=0,no-cache',
      content_type: 'text/html'
    })

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
