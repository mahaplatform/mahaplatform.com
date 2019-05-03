import { BackframeError, Route } from '../../../../../core/backframe'
import Installation from '../../../../maha/models/installation'

const activity = (req, trx, object, options) => ({
  story: 'updated the settings for {object}',
  object
})

const processor = async (req, trx, options) => {

  try {

    const installation = await Installation.where({
      team_id: req.team.get('id'),
      app_id: req.params.app_id
    }).fetch({ withRelated: ['app'] })

    req.installation = await installation.save({
      settings: req.body.settings
    }, { patch: true, transacting: trx })

    return {
      settings: req.installation.get('settings')
    }

  } catch(err) {

    throw new BackframeError({ code: 422, message: 'Unable to save app settings', errors: err.toJSON() })

  }

}

const updateRoute = new Route({
  activity,
  method: 'patch',
  path: '',
  processor
})

export default updateRoute
