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

  const buildsdir = path.join(indir, 'builds')

  const builddir = path.join(buildsdir, hash)

  const publicdir = path.join(builddir,'public')

  await mkdirp(indir)

  await mkdirp(buildsdir)

  await rimraf.sync(srcdir)

  await copy(path.join(__dirname, 'src'), srcdir)

  await silent(async () => {

    await next_build(indir)

    await next_export(indir, {
      silent: true,
      outdir: publicdir
    })

  })

  fs.renameSync(path.join(publicdir,'_next'), path.join(builddir,'_next'))

}

export default buildSite
