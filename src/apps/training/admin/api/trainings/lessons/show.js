import LessonSerializer from '@apps/training/serializers/lesson_serializer'
import Lesson from '@apps/training/models/lesson'

const showRoute = async (req, res) => {

  const lesson = await Lesson.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!lesson) return res.status(404).respond({
    code: 404,
    message: 'Unable to load lesson'
  })

  res.status(200).respond(lesson, LessonSerializer)

}

export default showRoute
