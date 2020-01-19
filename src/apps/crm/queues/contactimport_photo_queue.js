import { createAssetFromUrl } from '../../maha/services/assets'
import Queue from '../../../core/objects/queue'
import User from '../../maha/models/user'
import Contact from '../models/contact'

const processor = async (job, trx) => {

  const contact = await Contact.query(qb => {
    qb.where('id', job.data.contact_id)
  }).fetch({
    withRelated: ['team'],
    transacting: trx
  })

  const user = await User.query(qb => {
    qb.where('id', job.data.user_id)
  }).fetch({
    transacting: trx
  })

  const req = {
    team: contact.related('team'),
    user,
    trx
  }

  const asset = await createAssetFromUrl(req, {
    url: job.data.url
  })

  await contact.save({
    photo_id: asset.get('id')
  },{
    patch: true,
    transacting: trx
  })

}

const failed = async (job, err) => {}

const ContactImportPhotoQueue = new Queue({
  name: 'contactimport_photo',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default ContactImportPhotoQueue
