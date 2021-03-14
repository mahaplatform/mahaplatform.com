#!/usr/bin/env npx babel-node --config-file=./src/core/utils/babel.config.js
import '@core/services/environment'
import { bootstrap } from '@core/services/bootstrap/bootstrap'
import db from '@core/services/db/db'
import generate from './generate'
import sandbox from '../sandbox'
import assets from './assets'
import shipit from './shipit'
import build from './build'
import start from './start'
import test from './test'
import env from './env'
import dev from './dev'

const processor = async () => {

  const args = process.argv.slice(2)

  const command = args[0] || 'console'
  const cargs = args.slice(1)

  if(command === 'assets') await assets(cargs)
  if(command === 'bootstrap') await bootstrap(cargs)
  if(command === 'build') await build(cargs)
  if(command === 'dev') await dev(cargs)
  if(command === 'env') await env(cargs)
  if(command === 'g') await generate(cargs)
  if(command === 'knex') await db(cargs)
  if(command === 'sandbox') await sandbox(cargs)
  if(command === 'shipit') await shipit(cargs)
  if(command === 'start') await start(cargs)
  if(command === 'test') await test(cargs)

}

processor()
