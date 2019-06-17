import Member from '../../models/member'
import _ from 'lodash'

export const canApprove = async (req, trx) => {

  const members = await Member.query(qb => {
    qb.joinRaw('inner join expenses_projects on expenses_projects.id=expenses_members.project_id and expenses_projects.is_active=?', true)
    qb.where('expenses_members.user_id', req.user.get('id'))
    qb.where('expenses_members.is_active', true)
  }).fetchAll({
    withRelated: ['member_type'],
    transacting: req.trx
  })

  return members.reduce((allowed, member) => {
    return !allowed ? (member.get('member_type_id') != 3) : true
  }, false)

}

export const isAdmin = (req, trx) => {

  return _.includes(req.rights, 'expenses:access_reports')

}

export const isOwnerOrAdmin = async (req, trx) => {

  if(isAdmin(req, trx)) return true

  return await canApprove(req, trx)

}
