import NextSerializer from '@apps/websites/serializers/next_serializer'
import next_export from 'next/dist/export'
import next_build from 'next/dist/build'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'
import ejs from 'ejs'
import fs from 'fs'
import qs from 'qs'

const copy = Promise.promisify(ncp)

const icon = (src, format, transforms) => {
  const parsed = path.parse(src)
  const extname = parsed.ext.substr(1)
  if(format !== extname) transforms.fm = extname
  const query = qs.stringify(transforms)
  const host = process.env.NODE_ENV !== 'production' ? 'https://assets.mahaplatform.com' : ''
  const url = `${host}/imagecache/${query}${parsed.dir}/${parsed.name}.${format}`
  return url
}

const silent = async (method, silent = true) => {

  const consolelog = console.log
  const consolewarn = console.warn

  if(silent) {
    console.log = () => {}
    console.warn = () => {}
  }

  await method()

  if(silent) {
    console.log = consolelog
    console.warn = consolewarn
  }

}

const writeFile = (req, { data, dest, filename }) => {
  const template = fs.readFileSync(path.join(__dirname,`${filename}.ejs`), 'utf8')
  const content = ejs.render(template, data)
  fs.writeFileSync(path.join(dest, filename), content)
}

const buildSite = async(req, { code, hash }) => {

  const config = await NextSerializer(req, {})

  const sitedir = path.resolve(__dirname, '..', '..', 'template')

  const indir = path.resolve('web', code)

  const srcdir = path.resolve(indir, 'src')

  const publicdir = path.resolve(indir, 'public')

  const buildsdir = path.join(indir, 'builds')

  const builddir = path.join(buildsdir, hash)

  const currentdir = path.join(builddir, 'current')

  await rimraf.sync(indir)

  await mkdirp(indir)

  await mkdirp(buildsdir)

  await rimraf.sync(srcdir)

  await copy(path.join(sitedir, 'src'), srcdir)

  await copy(path.join(sitedir, 'public'), publicdir)

  await copy(path.join(sitedir, 'next.config.js'), path.join(indir, 'next.config.js'))

  writeFile(req, {
    data: { config },
    dest: indir,
    filename: 'maha.config.js'
  })

  writeFile(req, {
    data: {
      ...config,
      icon
    },
    dest: publicdir,
    filename: 'manifest.json'
  })

  writeFile(req, {
    data: {
      ...config,
      icon
    },
    dest: publicdir,
    filename: 'browserconfig.xml'
  })

  await silent(async () => {

    await next_build(indir)

    await next_export(indir, {
      silent: true,
      outdir: currentdir
    })

  })

  fs.renameSync(path.join(currentdir,'_next'), path.join(builddir,'_next'))

}

export default buildSite
