import EmailAttachment from '../models/email_attachment'
import { createAsset } from '../../maha/services/assets'
import { contactActivity } from '../services/activities'
import Source from '../../maha/models/source'
import Contact from '../models/contact'
import Email from '../models/email'

const EMAIL_REGEX = /^crm(.*)@mahaplatform.com$/

const receiver = async (req, { to, message }) => {

  const contact = await Contact.query(qb => {
    qb.where('code', to.match(EMAIL_REGEX)[1])
  }).fetch({
    transacting: req.trx
  })

  if(!contact) throw new Error('invalid contact')

  return {
    id: contact.get('id')
  }

}

const processor = async (req, { meta, message }) => {

  const contact = await Contact.scope({
    req: req.team
  }).query(qb => {
    qb.where('id', meta.id)
  }).fetch({
    transacting: req.trx
  })

  const { subject, from, to, cc, bcc, date, text, attachments } = message

  const html = message.html || message.textAsHtml

  const email = await Email.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    data: { subject, from, to, cc, bcc, date, text, html }
  }).save(null, {
    transacting: req.trx
  })

  const source = await Source.where({
    text: 'email'
  }).fetch({
    transacting: req.trx
  })

  await Promise.mapSeries(attachments, async (attachment, index) => {

    const asset = await createAsset(req, {
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      source_id: source.get('id'),
      file_name: attachment.filename,
      content_type: attachment.contentType,
      file_size: attachment.size,
      file_data: new Buffer(attachment.content.data)
    })

    await EmailAttachment.forge({
      team_id: req.team.get('id'),
      email_id: email.get('id'),
      delta: index + 1,
      asset_id: asset.get('id')
    }).save(null, {
      transacting: req.trx
    })

  })

  await contactActivity(req, {
    user: req.user,
    contact,
    type: 'email',
    story: 'forwarded an email',
    object: email
  })

}

const contactsMailbox = {
  pattern: EMAIL_REGEX,
  receiver,
  processor
}

export default contactsMailbox
