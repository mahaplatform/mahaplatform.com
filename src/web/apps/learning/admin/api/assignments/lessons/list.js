import LessonSerializer from '../../../../serializers/lesson_serializer'
import Lesson from '../../../../models/lesson'

const listRoute = async (req, res) => {

  const lessons = await Lesson.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('learning_assignments', 'learning_assignments.training_id', 'learning_lessons.training_id')
    qb.where('learning_assignments.id', req.params.assignment_id)
  }).sort({
    sort: req.params.$sort,
    defaultSort: ['delta']
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(lessons, LessonSerializer)

}

export default listRoute
