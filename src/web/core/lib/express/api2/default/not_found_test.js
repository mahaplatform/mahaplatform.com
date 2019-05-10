import { testHandler } from '../../../../utils/test'
import { expect } from 'chai'
import not_found from './not_found'

describe('src/web/core/lib/express/api/default/not_found', () => {

  it('responds with a 404', async () => {

    const res = await testHandler(not_found)

    expect(res.status()).to.be.equal(404)

  })

})
