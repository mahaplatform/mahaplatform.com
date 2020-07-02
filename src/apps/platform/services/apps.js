import Installation from '../../maha/models/installation'
import _ from 'lodash'

export const updateApps = async (req, { team, app_ids }) => {

  await team.load('installations', {
    transacting: req.trx
  })

  const existing_ids = team.related('installations').toArray().map(installation => {
    return installation.get('app_id')
  })

  const add_ids = app_ids.filter(id => {
    return !_.includes(existing_ids, id)
  })

  if(add_ids.length > 0) {
    await Promise.mapSeries(add_ids, async (app_id) => {
      await req.trx('maha_teams_apps').insert({
        team_id: team.get('id'),
        app_id
      })
      await Installation.forge({
        team_id: team.get('id'),
        app_id,
        settings: {}
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  const remove_ids = existing_ids.filter(id => {
    return !_.includes(app_ids, id)
  })

  if(remove_ids.length > 0) {
    await Promise.mapSeries(remove_ids, async (app_id) => {
      await req.trx('maha_teams_apps').where({
        team_id: team.get('id'),
        app_id
      }).del()
      const maha_roles_apps = await req.trx('maha_roles_apps')
        .innerJoin('maha_roles','maha_roles.id','maha_roles_apps.role_id')
        .where('maha_roles.team_id', team.get('id'))
        .where('maha_roles_apps.app_id', app_id)
      await Promise.mapSeries(maha_roles_apps, async (item) => {
        await req.trx('maha_roles_apps').where({
          role_id: item.role_id,
          app_id: item.app_id
        }).del()
      })
      const maha_roles_rights = req.trx('maha_roles_rights')
        .innerJoin('maha_roles','maha_roles.id','maha_roles_rights.role_id')
        .innerJoin('maha_rights','maha_rights.id','maha_roles_rights.right_id')
        .where('maha_roles.team_id', team.get('id'))
        .where('maha_rights.app_id', app_id)
      await Promise.mapSeries(maha_roles_rights, async (item) => {
        await req.trx('maha_roles_rights').where({
          role_id: item.role_id,
          right_id: item.right_id
        }).del()
      })
      await req.trx('maha_installations').where({
        team_id: team.get('id'),
        app_id
      }).del()
    })
  }

}
