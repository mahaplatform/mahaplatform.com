import ReactionSerializers from '../../../serializers/reaction_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Reaction from '../../../models/reaction'
import moment from 'moment'

const updateRoute = async (req, res) => {

  const reaction = await Reaction.where({
    user_id: req.user.get('id'),
    reactable_type: req.params.reactable_type,
    reactable_id: req.params.reactable_id,
    type: req.params.type
  }).fetch({
    transacting: req.trx
  })

  if(!reaction) {

    await Reaction.forge({
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      reactable_type: req.params.reactable_type,
      reactable_id: req.params.reactable_id,
      type: req.params.type
    }).save(null, {
      transacting: req.trx
    })

  } else {

    await reaction.save({
      unreacted_at: reaction.get('unreacted_at') !== null ? null : moment()
    }, {
      patch: true,
      transacting: req.trx
    })

  }

  const unserialized = await Reaction.query(qb => {
    qb.where('reactable_type', req.params.reactable_type)
    qb.where('reactable_id', req.params.reactable_id)
    qb.whereNull('unreacted_at')
  }).fetchAll({
    transacting: req.trx,
    withRelated: ['user.photo']
  }).then(reactions => reactions.toArray())

  const reactions = unserialized.map(reaction => {
    return ReactionSerializers(req, req.trx, reaction)
  })

  await socket.message(req, {
    channel: '/admin/reactions',
    action: 'update_reactions',
    data: {
      table: req.params.reactable_type,
      id: parseInt(req.params.reactable_id),
      reactions
    }
  })

  res.status(200).respond(true)

}

export default updateRoute
