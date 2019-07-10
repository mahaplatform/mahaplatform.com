import LessonSerializer from '../../../../serializers/lesson_serializer'
import Lesson from '../../../../models/lesson'

const listRoute = async (req, res) => {

  const lessons = await Lesson.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('training_assignments', 'training_assignments.training_id', 'training_lessons.training_id')
    qb.where('training_assignments.id', req.params.assignment_id)
  }).sort({
    sort: req.params.$sort,
    defaultSort: ['delta']
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(lessons, LessonSerializer)

}

export default listRoute
