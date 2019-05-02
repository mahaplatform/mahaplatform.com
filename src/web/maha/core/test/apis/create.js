import { expect } from 'chai'
import { make_authenticated_request } from './utils'

export const test_allowed_keys = (router, method, path, body) => async () => {

  const request = {
    method,
    path,
    body
  }

  const { status } = await make_authenticated_request(router, request)

  expect(status).to.equal(200)

}
