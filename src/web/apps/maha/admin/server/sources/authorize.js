import microsoft from './microsoft/authorize'
import instagram from './instagram/authorize'
import facebook from './facebook/authorize'
import dropbox from './dropbox/authorize'
import google from './google/authorize'
import User from '../../../models/user'
import box from './box/authorize'

const getUrl = async (req, { source }) => {

  if(source === 'facebook') return await facebook(req)

  if(source === 'google') return await google(req)

  if(source === 'microsoft') return await microsoft(req)

  if(source === 'instagram') return await instagram(req)

  if(source === 'dropbox') return await dropbox(req)

  if(source === 'box') return await box(req)

  return null

}

const authorize = async (req, res) => {

  req.user = await User.query(qb => {
    qb.where('id', req.query.user_id)
  }).fetch({
    transacting: req.trx
  })

  const url = await getUrl(req, {
    source: req.params.source
  })

  res.redirect(301, url)

}

export default authorize
