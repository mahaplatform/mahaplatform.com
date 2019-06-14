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

const token = async (req, res) => {

  req.user = await User.query(qb => {
    qb.where('id', req.query.state)
  }).fetch({
    transacting: req.trx
  })

  const getData = async (source) => {

    if(source === 'facebook') return await facebook(req, res)

    if(source === 'google') return await google(req, res)

    if(source === 'microsoft') return await microsoft(req, res)

    if(source === 'instagram') return await instagram(req, res)

    if(source === 'dropbox') return await dropbox(req, res)

    if(source === 'box') return await box(req, res)

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
  }).save(null, {
    transacting: req.trx
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

const preview = async (req, res) => {

  if(req.params.source === 'box') await boxPreview(req, res)

  if(req.params.source === 'dropbox') await dropboxPreview(req, res)

}

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/:source/token', token)

server.get('/:source/preview', preview)

export default server
