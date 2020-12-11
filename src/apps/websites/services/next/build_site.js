import next_build from 'next/dist/build'
import next_export from 'next/dist/export'
import move from 'move-concurrently'
import mkdirp from 'mkdirp'
import moment from 'moment'
import path from 'path'

const silent = async (method) => {

  // const consolebak = console.log
  //
  // console.log = function() {}
  //
  // process.stdout.isTTY = false

  await method()

  // console.log = consolebak
  //
  // process.stdout.isTTY = true

}

const buildSite = async(req, params) => {

  const buildhash = moment().format('x')

  const indir = params.path

  const outdir = path.resolve(indir,'out')

  const buildsdir = path.join(outdir,'builds')

  const builddir = path.join(buildsdir,buildhash)

  await silent(async () => {

    await mkdirp(path.join(indir,'out','builds'))

    await next_build(indir)

    await next_export(indir, {
      silent: false,
      threads: undefined,
      outdir: builddir
    })

    await move(path.join(builddir,'_next'), path.join(outdir,'_next'))

  })

}

export default buildSite
