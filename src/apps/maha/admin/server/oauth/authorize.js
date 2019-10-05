import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import microsoft from './microsoft/authorize'
import instagram from './instagram/authorize'
import facebook from './facebook/authorize'
import dropbox from './dropbox/authorize'
import twitter from './twitter/authorize'
import google from './google/authorize'
import box from './box/authorize'
import _ from 'lodash'

const getUrlCreator = (service) => {
  if(_.includes(['googledrive','googlephotos','googlecontacts','gmail'], service)) return google
  if(_.includes(['outlookcontacts','outlook','onedrive'], service)) return microsoft
  if(_.includes(['facebookphotos','facebook'], 'facebook')) return facebook
  if(service === 'twitter') return twitter
  if(service === 'instagram') return instagram
  if(service === 'dropbox') return dropbox
  if(service === 'box') return box
  return null
}

const getType = (service) => {
  if(_.includes(['googledrive','onedrive','dropbox','box'], service)) return 'files'
  if(_.includes(['facebookphotos','googlephotos','instagram'], service)) return 'photos'
  if(_.includes(['googlecontacts','outlookcontacts'], service)) return 'contacts'
  if(_.includes(['facebook','twitter'], service)) return 'posts'
  if(_.includes(['gmail','outlook'], service)) return 'email'
  return null
}

const getScope = (service) => {
  if(service === 'facebook') return ['pages_show_list','manage_pages','publish_pages']
  if(service === 'facebookphotos') return ['user_photos','public_profile','pages_show_list']
  if(service === 'googledrive') return ['userinfo.profile','userinfo.email','drive.readonly','drive.photos.readonly']
  if(service === 'googlephotos') return ['userinfo.profile','userinfo.email','photoslibrary.readonly']
  if(service === 'googlecontacts') return ['userinfo.profile','userinfo.email','contacts.readonly']
  if(service === 'gmail') return ['userinfo.profile','userinfo.email','gmail.readonly']
  if(service === 'outlookcontacts') return ['user.read','contacts.read']
  if(service === 'onedrive') return ['user.read','files.read.all']
  if(service === 'outlook') return ['user.read','mail.read']
  if(service === 'instagram') return ['basic']
  return []
}

const authorize = async (req, res) => {

  const { user } = await loadUserFromToken('user_id', req.query.token)

  req.user = user

  const type = getType(req.params.source)

  const scope = getScope(req.params.source)

  const state = [
    `scope:${scope.join(',')}`,
    `source:${req.params.source}`,
    `token:${req.query.token}`,
    `type:${type}`
  ].join('|')

  const urlCreator = getUrlCreator(req.params.source)

  const url = await urlCreator(req, { scope, state })

  res.redirect(301, url)

}

export default authorize
