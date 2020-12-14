import next_export from 'next/dist/export'
import next_build from 'next/dist/build'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

const copy = Promise.promisify(ncp)

const silent = async (method) => {

  const consolelog = console.log
  const consolewarn = console.warn
  const consoleerror = console.error

  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}

  await method()

  console.log = consolelog
  console.warn = consolewarn
  console.error = consoleerror

}

const buildSite = async(req, { code, hash }) => {

  const indir = path.resolve('web', code)

  const srcdir = path.resolve(indir,'src')

  const staticdir = path.resolve(indir,'static')

  const outdir = path.resolve(indir, 'out')

  const buildsdir = path.join(outdir, 'builds')

  const builddir = path.join(buildsdir, hash)

  const publicdir = path.join(builddir,'public')

  await mkdirp(indir)

  await mkdirp(buildsdir)

  await rimraf.sync(srcdir)

  await copy(path.join(__dirname, 'src'), srcdir)

  await rimraf.sync(staticdir)

  await copy(path.join(__dirname, 'static'), staticdir)

  await silent(async () => {

    await next_build(indir)

    await next_export(indir, {
      silent: true,
      threads: undefined,
      outdir: publicdir
    })

  })

  fs.renameSync(path.join(publicdir,'_next'), path.join(builddir,'_next'))

  fs.renameSync(path.join(publicdir,'static'), path.join(builddir,'static'))

}

export default buildSite
