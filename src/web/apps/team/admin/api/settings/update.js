import { BackframeError, Route } from '../../../../../core/backframe'

const activity = (req, trx, result, options) => ({
  story: 'updated {object}',
  object_text: 'team settings',
  object_url: '/admin/team/settings'
})

const processor = async (req, trx, options) => {

  try {

    req.team = await req.team.save({
      color: req.body.color,
      logo_id: req.body.logo_id,
      subdomain: req.body.title,
      title: req.body.title
    }, {
      patch: true,
      transacting: trx
    })

    return {
      title: req.team.get('title'),
      subdomain: req.team.get('subdomain'),
      color: req.team.get('color'),
      logo_id: req.team.get('logo_id')
    }

  } catch(err) {

    throw new BackframeError({
      code: 422,
      message: 'Unable to save settings',
      errors: err.toJSON()
    })

  }

}

const refresh = (req, trx, result, options) => [
  '/admin/team/settings'
]

const messages = (req, trx, result, options) => ({
  channel: 'team',
  action: 'session'
})

const updateRoute = new Route({
  activity,
  messages,
  method: 'patch',
  path: '/',
  processor,
  refresh
})

export default updateRoute
