import { createAsset, createAssetFromUrl } from '../../../services/assets'
import socket from '../../../../../core/services/emitter'
import Profile from '../../../models/profile'
import Source from '../../../models/source'
import microsoft from './microsoft/token'
import instagram from './instagram/token'
import facebook from './facebook/token'
import User from '../../../models/user'
import dropbox from './dropbox/token'
import google from './google/token'
import box from './box/token'

const getData = async (req, { source }) => {

  if(source === 'facebook') return await facebook(req)

  if(source === 'google') return await google(req)

  if(source === 'microsoft') return await microsoft(req)

  if(source === 'instagram') return await instagram(req)

  if(source === 'dropbox') return await dropbox(req)

  if(source === 'box') return await box(req)

  return null

}

const getPhoto = async (req, { source_id, photo_url, photo_data }) => {

  if(photo_url) {
    return await createAssetFromUrl(req, {
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id'),
      url: photo_url
    })
  }

  if(photo_data) {
    return await createAsset(req, {
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id'),
      source_id,
      file_name: 'avatar.jpg',
      file_data: photo_data
    })
  }

  return null

}

const token = async (req, res) => {

  req.user = await User.query(qb => {
    qb.where('id', req.query.state)
  }).fetch({
    transacting: req.trx
  })

  const profiles = await getData(req, {
    source: req.params.source
  })

  if(!profiles) return res.render('token')

  await Promise.mapSeries(profiles, async(data) => {

    const profile = await Profile.scope({
      team: req.team
    }).query(qb => {
      qb.where('profile_id', data.profile_id)
    }).fetch({
      transacting: req.trx
    })

    if(profile) return

    const source = await Source.where({
      text: req.params.source
    }).fetch({
      transacting: req.trx
    })

    const photo = await getPhoto(req, {
      source_id: source.get('id'),
      photo_url: data.photo_url,
      photo_data: data.photo_data
    })

    await Profile.forge({
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id'),
      source_id: source.get('id'),
      photo_id: photo ? photo.get('id') : null,
      profile_id: data.profile_id,
      username: data.username,
      email: data.email,
      data: data.data
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
