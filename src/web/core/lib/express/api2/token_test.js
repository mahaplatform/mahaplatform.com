import { testHandler } from '../../../../utils/test'
import { encode } from '../../../services/jwt'
import { expect } from 'chai'
import token from './token'

describe('src/web/core/lib/express/api/token', () => {

  it('fails with no token', async () => {

    const res = await testHandler(token)

    expect(res.status()).to.be.equal(401)
    expect(res.json().message).to.be.equal('No token')

  })

  it('fails with an expired token', async () => {

    const YESTERDAY = 0 - (60 * 60 * 24)

    const req = {
      headers: {
        authorization: `Bearer ${encode(1, YESTERDAY)}`
      }
    }

    const res = await testHandler(token, req)

    expect(res.status()).to.be.equal(401)
    expect(res.json().message).to.be.equal('Expired token')

  })

  it('fails with an invalid user', async () => {

    const req = {
      headers: {
        authorization: `Bearer ${encode({
          user_id: 9999
        })}`
      }
    }

    const res = await testHandler(token, req)

    expect(res.status()).to.be.equal(401)
    expect(res.json().message).to.be.equal('Invalid user')

  })

  it('load the user with a valid token', async () => {

    const req = {
      headers: {
        authorization: `Bearer ${encode({
          user_id: 1
        })}`
      }
    }

    const res = await testHandler(token, req)

    console.log(res.json().message)

    expect(res.status()).to.be.null

  })

})
