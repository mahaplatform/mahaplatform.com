import { Route } from '../../../../../core/backframe'
import Project from '../../../models/project'

const activity = (req, trx, object, options) => ({
  story: 'enabled {object}',
  object
})

const processor = async (req, trx, options) => {

  req.resource = await Project.where({ id: req.params.id }).fetch()

  return req.resource.save({ is_active: true }, { patch: true, transacting: trx })

}

const refresh = (req, trx, result, options) => [
  {
    hannel: 'admin',
    target: [
      '/admin/expenses/projects',
      `/admin/expenses/projects/${result.get('id')}`
    ]
  }
]

const enableRoute = new Route({
  action: 'enable',
  activity,
  method: 'patch',
  path: '/enable',
  processor,
  refresh
})

export default enableRoute
