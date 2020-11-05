import { updateRelated } from '@core/services/routes/relations'
import NoteSerializer from '../../../../serializers/contact_note_serializer'
import { whitelist } from '@core/services/routes/params'
import { contactActivity } from '../../../../services/activities'
import Note from '../../../../models/contact_note'
import Contact from '../../../../models/contact'

const createRoute = async (req, res) => {

  const contact = await Contact.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.contact_id)
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

  if(req.body.asset_ids) {
    await updateRelated(req, {
      object: note,
      related: 'attachments',
      table: 'crm_notes_assets',
      ids: req.body.asset_ids,
      foreign_key: 'note_id',
      related_foreign_key: 'asset_id'
    })
  }

  await contactActivity(req, {
    user: req.user,
    contact,
    type: 'note',
    story: 'left a note',
    program_id: req.body.program_id,
    data: {
      note_id: note.get('id')
    }
  })

  res.status(200).respond(note, NoteSerializer)

}

export default createRoute
