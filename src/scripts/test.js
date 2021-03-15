import '@core/services/environment'
import { setup } from '@core/services/db/utils'
import knex from '@core/vendor/knex/maha'
import Mocha from 'mocha'
import glob from 'glob'

const test = async () => {

  const mocha = new Mocha()

  const args = process.argv.slice(2)

  const root = args[0] || 'src/web'

  glob.sync(`${root}/**/*_test.js`).map((test) => {
    mocha.addFile(test)
  })

  mocha.suite.beforeAll('migrate and seed', async () => {
    return await setup()
  })

  mocha.suite.beforeEach('begin transaction', async () => {
    global.knex = await new Promise((resolve, reject) => {
      knex.transaction(tx => {
        resolve(tx)
      }).catch(() => {})
    })
  })

  mocha.suite.afterEach('rollback transaction', async () => {
    global.knex.rollback().catch(() => {})
  })

  await new Promise((resolve, reject) => mocha.run(resolve))

}

test().then(process.exit)
