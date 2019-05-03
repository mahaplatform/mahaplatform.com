import { expect } from 'chai'
import { make_authenticated_request } from './utils'

export const test_list = (router, path, count) => async () => {

  const request = {
    method: 'get',
    path
  }

  const { status, json } = await make_authenticated_request(router, request)

  expect(json.pagination.total).to.equal(count)

  expect(status).to.equal(200)

}

export const test_list_sort = (router, path, field, direction, data) => async () => {

  const $sort = (direction === 'desc') ? `-${field}` : field

  const request = {
    method: 'get',
    path,
    query: { $sort }
  }

  const { status, json } = await make_authenticated_request(router, request)

  if(status === '200') {

    Object.keys(data).map(key => {

      expect(json.data[0][key]).to.equal(data[key])

    })

  }

  expect(status).to.equal(200)

}

export const test_list_search = (router, path, q, data) => async () => {

  const request = {
    method: 'get',
    path,
    query: { $filter: { q } }
  }

  const { status, json } = await make_authenticated_request(router, request)

  if(status === '200') {

    Object.keys(data).map(key => {

      expect(json.data[0][key]).to.equal(data[key])

    })

  }

  expect(status).to.equal(200)

}
