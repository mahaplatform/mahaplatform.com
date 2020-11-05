import { createAssetFromUrl } from '@apps/maha/services/assets'
import Queue from '@core/objects/queue'
import User from '@apps/maha/models/user'
import Contact from '../models/contact'

const processor = async (req, job) => {

  const contact = await Contact.query(qb => {
    qb.where('id', job.data.contact_id)
  }).fetch({
    transacting: req.trx
  })

  req.user = await User.query(qb => {
    qb.where('id', job.data.user_id)
  }).fetch({
    transacting: req.trx
  })

  const asset = await createAssetFromUrl(req, {
    url: job.data.url
  })

  await contact.save({
    photo_id: asset.get('id')
  },{
    patch: true,
    transacting: req.trx
  })

}

const ContactImportPhotoQueue = new Queue({
  name: 'contactimport_photo',
  processor
})

export default ContactImportPhotoQueue
