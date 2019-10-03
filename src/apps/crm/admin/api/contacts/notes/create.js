import { whitelist } from '../../../../../../web/core/services/routes/params'
import NoteSerializer from '../../../../serializers/note_serializer'
import { contactActivity } from '../../../../services/activities'
import Contact from '../../../../models/contact'
import Note from '../../../../models/note'

const createRoute = async (req, res) => {

  const contact = await Contact.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!contact) return res.status(404).respond({
    code: 404,
    message: 'Unable to load contact'
  })

  const note = await Note.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    ...whitelist(req.body, ['program_id','text'])
  }).save(null, {
    transacting: req.trx
  })

  await contactActivity(req, {
    user: req.user,
    contact,
    program_id: req.body.program_id,
    type: 'note',
    story: 'left a note',
    object: note
  })

  res.status(200).respond(note, NoteSerializer)

}

export default createRoute
