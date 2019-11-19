import Member from '../../models/member'
import _ from 'lodash'

export const canApprove = async (req) => {

  const members = await Member.query(qb => {
    qb.joinRaw('inner join finance_projects on finance_projects.id=finance_members.project_id')
    qb.where('finance_members.user_id', req.user.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  return members.reduce((allowed, member) => {
    return !allowed ? (member.get('type') !== 'member') : true
  }, false)

}

export const isAdmin = (req) => {
  return _.includes(req.rights, 'finance:access_reports')
}

export const isOwnerOrAdmin = async (req) => {
  return !isAdmin(req) ? canApprove(req) : true
}
