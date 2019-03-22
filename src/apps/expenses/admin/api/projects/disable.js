import { Route } from 'maha'
import Project from '../../../models/project'

const activity = story => (req, trx, object, options) => ({
  story: 'disabled {object}',
  object
})

const processor = async (req, trx, options) => {

  req.resource = await Project.where({ id: req.params.id }).fetch()

  return req.resource.save({ is_active: false }, { patch: true, transacting: trx })

}

const refresh = (req, trx, result, options) => ({
  channel: 'team',
  target: [
    '/admin/expenses/projects',
    `/admin/expenses/projects/${result.get('id')}`
  ]
})

const disableRoute = new Route({
  action: 'disable',
  activity,
  method: 'patch',
  path: '/disable',
  processor,
  refresh
})

export default disableRoute
