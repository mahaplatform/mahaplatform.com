import _ from 'lodash'
import * as jwt from '../../core/services/jwt'

export const make_authenticated_request = async (router, request) => {

  const route = await find_route(router, request.method, request.path)

  const token = jwt.encode({ user_id: 1 }, 60)

  const req = {
    params: route.params,
    query: request.query || {},
    body: request.body || {},
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  return await new Promise((resolve, reject) => {

    const res = {
      status: (status) => ({
        json: (json) => {
          resolve({ status, json })
        }
      })
    }

    return route.handle(req, res)

  })

}

export const find_route = async (router, method, path) => {

  const resolvedRouter = await router

  return resolvedRouter.stack.reduce((found, route) => {

    if(found) return found

    const matched = path.match(route.regexp)

    if(!matched) return null

    if(matched && _.get(route, `route.methods.${method}`)) {

      const params = route.keys.reduce((params, key, index) => ({
        ...params,
        [key.name]: matched[index + 1]
      }), {})

      return {
        handle: route.route.stack[0].handle,
        params
      }

    }

  }, null)

}
