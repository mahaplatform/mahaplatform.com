import next_export from 'next/dist/export'
import next_build from 'next/dist/build'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

const copy = Promise.promisify(ncp)

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

const buildSite = async(req, { code, hash }) => {

  const sitedir = path.resolve(__dirname, '..', '..', 'template')

  const indir = path.resolve('web', code)

  const srcdir = path.resolve(indir, 'src')

  const publicdir = path.resolve(indir, 'public')

  const buildsdir = path.join(indir, 'builds')

  const builddir = path.join(buildsdir, hash)

  const currentdir = path.join(builddir, 'current')

  await mkdirp(indir)

  await mkdirp(buildsdir)

  await rimraf.sync(srcdir)

  await copy(path.join(sitedir, 'next.config.js'), path.join(indir, 'next.config.js'))

  await copy(path.join(sitedir, 'src'), srcdir)

  await copy(path.join(sitedir, 'public'), publicdir)

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
