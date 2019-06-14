import knex from '../../../../../core/services/knex'

const unreadRoute = async (req, res) => {

  const select = knex.raw('count(maha_notifications.*) as unread')

  const result = await knex('maha_notifications').transacting(req.trx).select(select).where({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    is_seen: false
  })

  res.status(200).respond({
    count: parseInt(result[0].unread)
  })

}

export default unreadRoute
