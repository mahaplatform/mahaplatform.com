const next_build = require('next/dist/build').default
const next_export = require('next/dist/export').default
const move  = require('move-concurrently')
const mkdirp = require('mkdirp')
const moment = require('moment')
const path = require('path')

const silent = async (method) => {

  const consolebak = console.log

  console.log = function() {}

  process.stdout.isTTY = false

  await method()

  console.log = consolebak

  process.stdout.isTTY = true

}

const processor = async() => {

  const buildhash = moment().format('x')

  const indir = path.resolve('site1')

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

processor().then(process.exit)


const buildSite = async () => {

}

export default buildSite
