import Program from '../../../models/program'
import List from '../../../models/list'

const listsRoute = async (req, res) => {

  const lists = await List.query(qb => {
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
    lists: lists.filter(list => {
      return list.get('program_id') === program.get('id')
    }).map(list => ({
      id: list.get('id'),
      title: list.get('title')
    }))
  })).filter(program => {
    return program.lists.length > 0
  }))

  res.status(200).respond(programs)

}

export default listsRoute
