import ContactNoteSerializer from '@apps/crm/serializers/contact_note_serializer'
import ContactNote from '@apps/crm/models/contact_note'

const showRoute = async (req, res) => {

  const note = await ContactNote.where({
    contact_id: req.params.contact_id,
    id: req.params.id
  }).fetch({
    withRelated: ['attachments'],
    transacting: req.trx
  })

  if(!note) return res.status(404).respond({
    code: 404,
    message: 'Unable to load note'
  })

  await res.status(200).respond(note, ContactNoteSerializer)

}

export default showRoute
