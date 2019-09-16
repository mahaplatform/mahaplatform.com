import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import microsoft from './microsoft/authorize'
import instagram from './instagram/authorize'
import facebook from './facebook/authorize'
import dropbox from './dropbox/authorize'
import google from './google/authorize'
import box from './box/authorize'
import _ from 'lodash'

const getUrlCreator = (source) => {
  if(source === 'facebook') return facebook
  if(source === 'googledrive') return google
  if(source === 'googlephotos') return google
  if(source === 'googlecontacts') return google
  if(source === 'onedrive') return microsoft
  if(source === 'instagram') return instagram
  if(source === 'dropbox') return dropbox
  if(source === 'box') return box
  return null
}

const getType = (source) => {
  if(_.includes(['googledrive','onedrive','dropbox','box'], source)) return 'files'
  if(_.includes(['facebook','googlephotos','instagram'], source)) return 'photos'
  if(_.includes(['googlecontacts'], source)) return 'contacts'
  return null
}

const getScope = (source) => {
  if(source === 'facebook') return ['user_photos','public_profile','pages_show_list']
  if(source === 'googledrive') return ['userinfo.profile','userinfo.email','drive.readonly','drive.photos.readonly']
  if(source === 'googlephotos') return ['userinfo.profile','userinfo.email','photoslibrary.readonly']
  if(source === 'onedrive') return ['user.read','files.read.all']
  if(source === 'instagram') return ['basic']
  return []
}

const authorize = async (req, res) => {

  const { user } = await loadUserFromToken('user_id', req.query.token)

  req.user = user

  const urlCreator = getUrlCreator(req.params.source)

  const type = getType(req.params.source)

  const scope = getScope(req.params.source)

  const state = [
    `scope:${scope.join(',')}`,
    `source:${req.params.source}`,
    `token:${req.query.token}`,
    `type:${type}`
  ].join('|')

  const url = await urlCreator(req, { scope, state })

  res.redirect(301, url)

}

export default authorize
