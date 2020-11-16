import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import constantcontact from './constantcontact/authorize'
import microsoft from './microsoft/authorize'
import qualtrics from './qualtrics/authorize'
import mailchimp from './mailchimp/authorize'
import instagram from './instagram/authorize'
import facebook from './facebook/authorize'
import dropbox from './dropbox/authorize'
import twitter from './twitter/authorize'
import google from './google/authorize'
import box from './box/authorize'
import _ from 'lodash'

const getUrlCreator = (service) => {
  if(_.includes(['googledrive','googlephotos','googlecontacts','gmail'], service)) return google
  if(_.includes(['outlook','onedrive'], service)) return microsoft
  if(service === 'facebook') return facebook
  if(service === 'constantcontact') return constantcontact
  if(service === 'qualtrics') return qualtrics
  if(service === 'instagram') return instagram
  if(service === 'mailchimp') return mailchimp
  if(service === 'dropbox') return dropbox
  if(service === 'twitter') return twitter
  if(service === 'box') return box
  return null
}

const getScope = (service, type) => {
  if(service === 'facebook' && type === 'posts') return ['pages_show_list','manage_pages','publish_pages']
  if(service === 'facebook' && type === 'photos') return ['user_photos','public_profile','pages_show_list']
  if(service === 'googledrive') return ['userinfo.profile','userinfo.email','drive.readonly','drive.photos.readonly']
  if(service === 'googlephotos') return ['userinfo.profile','userinfo.email','photoslibrary.readonly']
  if(service === 'googlecontacts') return ['userinfo.profile','userinfo.email','contacts.readonly']
  if(service === 'qualtrics') return ['offline']
  if(service === 'outlook' && type === 'contacts') return ['user.read','contacts.read']
  if(service === 'outlook' && type === 'emails') return []
  if(service === 'onedrive') return ['user.read','files.read.all']
  if(service === 'constantcontact') return ['authorization_code']
  if(service === 'outlook') return ['user.read','mail.read']
  if(service === 'mailchimp') return ['authorization_code']
  if(service === 'twitter') return ['authorization_code']
  if(service === 'instagram') return ['basic']
  return []
}

const authorize = async (req, res) => {

  const { user } = await loadUserFromToken('user_id', req.query.token)

  req.user = user

  const scope = getScope(req.params.source, req.query.type)

  const state = [
    `scope:${scope.join(',')}`,
    `source:${req.params.source}`,
    `token:${req.query.token}`,
    `type:${req.query.type}`
  ].join('|')

  const urlCreator = getUrlCreator(req.params.source)

  const url = await urlCreator(req, { scope, state })

  res.redirect(301, url)

}

export default authorize
