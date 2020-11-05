import LessonSerializer from '@apps/training/serializers/lesson_serializer'
import Lesson from '@apps/training/models/lesson'

const lessonsRoute = async (req, res) => {

  const lessons = await Lesson.filterFetch({
    scope: (qb) => {
      qb.where('training_lessons.team_id', req.team.get('id'))
      qb.innerJoin('training_fulfillments', 'training_fulfillments.training_id', 'training_lessons.training_id')
      qb.where('training_fulfillments.id', req.params.id)
    },
    sort: {
      params: req.params.$sort,
      defaults: ['delta']
    },
    transacting: req.trx
  })

  res.status(200).respond(lessons, LessonSerializer)

}

export default lessonsRoute
