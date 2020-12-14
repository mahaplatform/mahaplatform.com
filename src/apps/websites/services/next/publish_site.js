import { copyObject, uploadFile } from '@core/services/aws/s3'
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

  const basepath = path.resolve('web',code)

  const outpath = path.join(basepath,'out')

  const buildpath = path.join(outpath,'builds',hash)

  const nextpath = path.join(buildpath,'_next')

  const staticpath = path.join(buildpath,'static')

  const publicpath = path.join(buildpath,'public')

  await Promise.mapSeries(getFiles(nextpath), async (file) => {

    await uploadFile(req, {
      key: path.join(basekey, '_next', file.replace(nextpath, '')),
      file_data: fs.readFileSync(file, 'utf8')
    })

  })

  await Promise.mapSeries(getFiles(staticpath), async (file) => {

    await uploadFile(req, {
      key: path.join(basekey, 'static', file.replace(staticpath, '')),
      file_data: fs.readFileSync(file)
    })

  })

  await Promise.mapSeries(getFiles(publicpath), async (file) => {

    const filepath = file.replace(publicpath, '').replace('.html','')

    await uploadFile(req, {
      key: path.join(basekey,'builds',hash,filepath),
      file_data: fs.readFileSync(file, 'utf8'),
      content_type: 'text/html'
    })

    await copyObject(req, {
      from: path.join(basekey,'builds',hash,filepath),
      to: path.join(basekey,'current',filepath)
    })

  })

}

export default publishSite
