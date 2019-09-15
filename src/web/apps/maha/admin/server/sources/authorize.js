import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import microsoft from './microsoft/authorize'
import instagram from './instagram/authorize'
import facebook from './facebook/authorize'
import dropbox from './dropbox/authorize'
import google from './google/authorize'
import box from './box/authorize'

const getUrlCreator = (source) => {
  if(source === 'facebook') return facebook
  if(source === 'google') return google
  if(source === 'microsoft') return microsoft
  if(source === 'instagram') return instagram
  if(source === 'dropbox') return dropbox
  if(source === 'box') return box
  return null
}

const authorize = async (req, res) => {

  const { user } = await loadUserFromToken('user_id', req.query.token)

  req.user = user

  const urlCreator = await getUrlCreator(req.params.source)

  const scope = req.query.scope ? req.query.scope.split(',') : []

  const state = `token:${req.query.token}|scope:${scope.join(',')}`

  const url = await urlCreator(req, { scope, state })

  res.redirect(301, url)

}

export default authorize
