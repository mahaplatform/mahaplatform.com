import { activity } from '../../../../../core/services/routes/activities'
import AppraisalSerializer from '../../../serializers/appraisal_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { updateResponsibilities } from '../../../services/appraisals'
import socket from '../../../../../core/services/routes/emitter'
import Appraisal from '../../../models/appraisal'

const updateRoute = async (req, res) => {

  const appraisal = await Appraisal.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['responsibilities'],
    transacting: req.trx
  })

  if(!appraisal) return res.status(404).respond({
    code: 404,
    message: 'Unable to load appraisal'
  })

  const ratings = ['documentation','attendance','health_safety','inclusiveness','adaptability','self_development','communication','teamwork','service_minded','stewardship','motivation','employee_communication','delegation','recruitment_retention']

  await appraisal.save({
    ...whitelist(req.body, [
      'employee_position_description_updated','employee_position_description_comments','accomplishments','challenges','job_goals','development_goals','additional_comments','supervisor_position_description_updated','supervisor_position_description_comments',
      ...ratings.reduce((ratings, rating) => {
        return [...ratings,`${rating}_rating`,`${rating}_comments`]
      }, [])
    ])
  }, {
    patch: true,
    transacting: req.trx
  })

  await updateResponsibilities(req, appraisal, {
    responsibilities: req.body.responsibilities
  })

  await activity(req, {
    story: 'updated {object}',
    object: appraisal
  })

  await socket.refresh(req, [
    { channel: `/admin/users/${appraisal.get('employee_id')}`, target: '/admin/appraisals/appraisals' },
    { channel: `/admin/users/${appraisal.get('supervisor_id')}`, target: '/admin/appraisals/appraisals/employees' },
    `/admin/appraisals/appraisals/${appraisal.get('id')}`,
    '/admin/appraisals/appraisals/report'
  ])

  await appraisal.load(['supervisor','employee','audit.story','audit.user.photo','responsibilities.responsibility_type'], {
    transacting: req.trx
  })

  res.status(200).respond(appraisal, AppraisalSerializer)

}

export default updateRoute
