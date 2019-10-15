import LessonSerializer from '../../../serializers/lesson_serializer'
import Lesson from '../../../models/lesson'

const lessonsRoute = async (req, res) => {

  const lessons = await Lesson.scope(qb => {
    qb.where('training_lessons.team_id', req.team.get('id'))
  }).query(qb => {
    qb.innerJoin('training_fulfillments', 'training_fulfillments.training_id', 'training_lessons.training_id')
    qb.where('training_fulfillments.id', req.params.id)
  }).sort({
    sort: req.params.$sort,
    defaultSort: ['delta']
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(lessons, LessonSerializer)

}

export default lessonsRoute
