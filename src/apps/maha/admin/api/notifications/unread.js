const unreadRoute = async (req, res) => {

  const result = await req.trx('maha_notifications')
    .select(req.trx.raw('count(maha_notifications.*) as unread'))
    .where({
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      is_seen: false
    })

  res.status(200).respond({
    count: parseInt(result[0].unread)
  })

}

export default unreadRoute
