import NoteSerializer from '../../../../serializers/contact_note_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import { contactActivity } from '../../../../services/activities'
import Note from '../../../../models/contact_note'
import Contact from '../../../../models/contact'

const createRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
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
    foreign_key: 'contact_note_id',
    type: 'note',
    story: 'left a note',
    object: note
  })

  res.status(200).respond(note, NoteSerializer)

}

export default createRoute
