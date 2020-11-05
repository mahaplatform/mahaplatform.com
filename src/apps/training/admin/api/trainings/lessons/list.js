import LessonSerializer from '@apps/training/serializers/lesson_serializer'
import Lesson from '@apps/training/models/lesson'

const listRoute = async (req, res) => {

  const lessons = await Lesson.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('training_id', req.params.training_id)
    },
    sort: {
      params: req.params.$sort,
      allowed: ['delta']
    },
    transacting: req.trx
  })

  res.status(200).respond(lessons, LessonSerializer)

}

export default listRoute
