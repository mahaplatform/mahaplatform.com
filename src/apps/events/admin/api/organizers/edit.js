import Organizer from '../../../models/organizer'

const showRoute = async (req, res) => {

  const organizer = await Organizer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!organizer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load organizer'
  })

  res.status(200).respond({
    name: organizer.get('name'),
    email: organizer.get('email'),
    phone: organizer.get('phone'),
    photo_id: organizer.get('photo_id')
  })

}

export default showRoute
