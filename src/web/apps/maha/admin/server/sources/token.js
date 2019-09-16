import { createAsset, createAssetFromUrl } from '../../../services/assets'
import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import socket from '../../../../../core/services/emitter'
import Profile from '../../../models/profile'
import Source from '../../../models/source'
import microsoft from './microsoft/token'
import instagram from './instagram/token'
import facebook from './facebook/token'
import dropbox from './dropbox/token'
import google from './google/token'
import box from './box/token'

const getProfileCreator = (source) => {
  if(source === 'facebook') return facebook
  if(source === 'google') return google
  if(source === 'microsoft') return microsoft
  if(source === 'instagram') return instagram
  if(source === 'dropbox') return dropbox
  if(source === 'box') return box
  return null
}

const getPhotoId = async (req, { source_id, photo_url, photo_data }) => {

  if(photo_url) {
    return await createAssetFromUrl(req, {
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id'),
      url: photo_url
    }).then(asset => asset.get('id'))
  }

  if(photo_data) {
    return await createAsset(req, {
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id'),
      source_id,
      file_name: 'avatar.jpg',
      file_data: photo_data
    }).then(asset => asset.get('id'))
  }

  return null

}

const extractState = (state) => {
  const parts = state.split('|')
  return parts.reduce((state,part) => {
    const [key, value] = part.split(':')
    return {
      ...state,
      [key]: value
    }
  }, {})
}

const token = async (req, res) => {

  const state = extractState(req.query.state)

  const { user } = await loadUserFromToken('user_id', state.token)

  req.user = user

  const profileCreator = getProfileCreator(req.params.source)

  const profiles = await profileCreator(req.query.code, state.scope.split(','))

  if(!profiles) return res.render('token')

  const source = await Source.where({
    text: state.source
  }).fetch({
    transacting: req.trx
  })

  await Promise.mapSeries(profiles, async(data) => {

    const profile = await Profile.scope({
      team: req.team
    }).query(qb => {
      qb.where('source_id', source.get('id'))
      qb.where('profile_id', data.profile_id)
    }).fetch({
      transacting: req.trx
    })

    if(profile) return

    const photo_id = await getPhotoId(req, {
      source_id: source.get('id'),
      photo_url: data.photo_url,
      photo_data: data.photo_data
    })

    await Profile.forge({
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id'),
      source_id: source.get('id'),
      photo_id,
      profile_id: data.profile_id,
      username: data.username,
      data: data.data,
      type: state.type
    }).save(null, {
      transacting: req.trx
    })

  })

  await socket.in(`/admin/users/${req.user.get('id')}`).emit('message', {
    target: `/admin/${req.params.source}/authorized`,
    action: 'refresh'
  })

  await socket.in(`/admin/users/${req.user.get('id')}`).emit('message', {
    target: '/admin/account/profiles',
    action: 'refresh'
  })

  res.render('token')

}

export default token
