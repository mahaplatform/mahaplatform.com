import { Route } from '../../../server'
import Search from '../../../models/search'

const processor = async (req, trx, options) => {

  const defaultParams = await Promise.reduce(options.defaultParams, async (params, defaultParams) => {

    const defaults = await defaultParams(req, trx, options)

    return {
      ...params,
      ...defaults
    }

  }, {})

  const data = {
    ...defaultParams,
    route: req.body.route,
    text: req.body.text
  }

  const search = await Search.where(data).fetch({ transacting: trx })

  if(search) {
    await search.save({}, { patch: true, transacting: trx })
    return true
  }

  await Search.forge({ ...data, extra: req.body.extra }).save(null, { transacting: trx })

  return true

}

const saveRoute = new Route({
  path: '',
  method: 'post',
  processor
})

export default saveRoute
