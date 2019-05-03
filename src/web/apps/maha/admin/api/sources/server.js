import socket from '../../../../../core/services/emitter'
import dropboxPreview from './dropbox/preview'
import Profile from '../../../models/profile'
import Source from '../../../models/source'
import microsoft from './microsoft/token'
import instagram from './instagram/token'
import facebook from './facebook/token'
import User from '../../../models/user'
import boxPreview from './box/preview'
import dropbox from './dropbox/token'
import google from './google/token'
import box from './box/token'
import express from 'express'
import path from 'path'

const token = async (req, res, next) => {

  req.user = await User.where({ id: req.query.state }).fetch()

  const getData = async (source) => {

    if(source === 'facebook') return await facebook(req, res, next)

    if(source === 'google') return await google(req, res, next)

    if(source === 'microsoft') return await microsoft(req, res, next)

    if(source === 'instagram') return await instagram(req, res, next)

    if(source === 'dropbox') return await dropbox(req, res, next)

    if(source === 'box') return await box(req, res, next)

    return null

  }

  const data = await getData(req.params.source)

  if(!data) return

  const source = await Source.where({ text: req.params.source }).fetch()

  await Profile.forge({
    team_id: req.user.get('team_id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    data
  }).save()

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

const preview = async (req, res, next) => {

  if(req.params.source === 'box') await boxPreview(req, res, next)

  if(req.params.source === 'dropbox') await dropboxPreview(req, res, next)

}

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/:source/token', token)

server.get('/:source/preview', preview)

export default server
