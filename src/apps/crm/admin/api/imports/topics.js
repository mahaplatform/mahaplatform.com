import Program from '../../../models/program'
import List from '../../../models/topic'

const topicsRoute = async (req, res) => {

  const topics = await List.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const programs = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).fetchAll({
    withRelated: ['logo'],
    transacting: req.trx
  }).then(results => results.map(program => ({
    title: program.get('title'),
    logo: program.related('logo').get('path'),
    topics: topics.filter(topic => {
      return topic.get('program_id') === program.get('id')
    }).map(topic => ({
      id: topic.get('id'),
      title: topic.get('title')
    }))
  })).filter(program => {
    return program.topics.length > 0
  }))

  res.status(200).respond(programs)

}

export default topicsRoute
