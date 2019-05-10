import { testHandler } from '../../../../utils/test'
import { expect } from 'chai'
import error from './error'

describe('src/web/core/lib/express/api/default/error', () => {

  it('responds with a custom error', async () => {

    const options = {
      error: {
        status: 403,
        message: 'Forbidden'
      }
    }

    const res = await testHandler(error, options)

    expect(res.status()).to.be.equal(403)
    expect(res.json().message).to.be.equal('Forbidden')

  })

  it('responds with a 422 checkit error', async () => {

    const errors = {
      first_name: ['first_name is required']
    }

    const options = {
      error: {
        errors: [],
        toJSON: () => errors
      }
    }

    const res = await testHandler(error, options)

    expect(res.status()).to.be.equal(422)
    expect(res.json().message).to.be.equal('Unable to save record')
    expect(res.json().errors).to.be.equal(errors)

  })

  it('responds with a 500 system error', async () => {

    const options = {
      error: new Error('foo')
    }

    const res = await testHandler(error, options)

    expect(res.status()).to.be.equal(500)
    expect(res.json().message).to.be.equal('foo')

  })

})
