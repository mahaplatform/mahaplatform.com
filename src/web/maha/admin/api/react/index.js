import { Route, socket } from '../../../server'
import Reaction from '../../../models/reaction'
import moment from 'moment'

const processor = async (req, trx, options) => {

  const { reactable_type, reactable_id } = req.params

  const reaction = await Reaction.where({
    user_id: req.user.get('id'),
    reactable_type,
    reactable_id,
    type: req.params.type
  }).fetch({ transacting: trx })

  if(!reaction) {

    await Reaction.forge({
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      reactable_type,
      reactable_id,
      type: req.params.type
    }).save(null, { transacting: trx })

  } else {

    await reaction.save({
      unreacted_at: reaction.get('unreacted_at') !== null ? null : moment()
    }, { patch: true, transacting: trx })

  }

  const unserialized = await Reaction.query(qb => {

    qb.where({
      reactable_type,
      reactable_id
    })

    qb.whereNull('unreacted_at')

  }).fetchAll({
    transacting: trx,
    withRelated: ['user.photo']
  })

  const reactions = unserialized.toArray().map(reaction => ({
    id: reaction.related('user').get('id'),
    full_name: reaction.related('user').get('full_name'),
    initials: reaction.related('user').get('initials'),
    photo: reaction.related('user').related('photo').get('path'),
    type: reaction.get('type')
  }))

  await socket.in('/admin/reactions').emit('message', {
    target: '/admin/reactions',
    action: 'update_reactions',
    data: {
      table: reactable_type,
      id: parseInt(reactable_id),
      reactions
    }
  })

}

const reactRoute = new Route({
  method: 'patch',
  path: '/:reactable_type/:reactable_id/react/:type',
  processor
})

export default reactRoute
