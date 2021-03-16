#!/usr/bin/env npx babel-node --config-file=./src/core/utils/babel.config.js
import '@core/services/environment'

const run = async (filepath, args) => {
  const script = require(filepath).default
  await script(args)
}

const processor = async () => {

  const args = process.argv.slice(2)

  const command = args[0] || 'console'
  const cargs = args.slice(1)

  if(command === 'assets') await run('./assets', cargs)
  if(command === 'bootstrap') await run('./bootstrap', cargs)
  if(command === 'dev') await run('./dev', cargs)
  if(command === 'g') await run('./generate', cargs)
  if(command === 'knex') await run('./knex', cargs)
  if(command === 'sandbox') await run('../sandbox', cargs)
  if(command === 'start') await run('./start', cargs)

}

processor()
