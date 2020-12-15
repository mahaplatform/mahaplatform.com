import { copyObject, deleteObjects, listObjects, upload } from '@core/services/aws/s3'
import path from 'path'
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

  const outpath = path.join(basepath, 'out')

  const buildpath = path.join(outpath, 'builds', hash)

  const nextpath = path.join(buildpath, '_next')

  const publicpath = path.join(buildpath, 'public')

  const buildkey = path.join(basekey, 'builds', hash)

  const currentkey = path.join(basekey, 'current')

  await Promise.mapSeries(getFiles(nextpath), async (file) => {

    await upload(req, {
      key: path.join(basekey, '_next', file.replace(nextpath, '')),
      cache_control: 'immutable,max-age=100000000,public',
      file_data: fs.readFileSync(file, 'utf8')
    })

  })

  const preexisting = await listObjects(req, {
    prefix: currentkey
  })

  const notfound = await Promise.reduce(getFiles(publicpath), async (notfound, file) => {

    const filepath = file.replace(publicpath, '').replace('.html','')

    await upload(req, {
      key: path.join(buildkey, filepath),
      file_data: fs.readFileSync(file, 'utf8'),
      cache_control: 'max-age=0,no-cache',
      content_type: 'text/html'
    })

    const to = path.join(currentkey, filepath)

    await copyObject(req, {
      from: path.join(buildkey, filepath),
      to
    })

    return notfound.filter(key => {
      return key !== to
    })

  }, preexisting)

  if(notfound.length === 0) return

  await deleteObjects(req, {
    keys: notfound
  })

}

export default publishSite
