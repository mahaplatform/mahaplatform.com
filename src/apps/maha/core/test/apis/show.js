import { expect } from 'chai'
import { make_authenticated_request } from './utils'

export const test_show = (router, path, data) => async () => {

  const request = {
    method: 'get',
    path
  }

  const { status, json } = await make_authenticated_request(router, request)

  if(status === '200') {

    Object.keys(data).map(key => {

      expect(json.data[key]).to.equal(data[key])

    })
  }

  expect(status).to.equal(200)

}
