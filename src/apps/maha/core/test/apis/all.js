import { expect } from 'chai'
import { find_route } from './utils'

export const test_route_exists = (router, method, path) => async () => {

  const route = await find_route(router, method, path)

  expect(route).to.not.be.null

}

export const test_route_does_not_exist = (router, method, path) => async () => {

  const route = await find_route(router, method, path)

  expect(route).to.be.null

}
