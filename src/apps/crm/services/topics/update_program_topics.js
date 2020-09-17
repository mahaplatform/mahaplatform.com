import removeFromTopics from './remove_from_topics'
import addToTopics from './add_to_topics'
import _ from 'lodash'

const updateProgramTopics = async(req, params) => {

  const { contact, program, topic_ids } = params

  await program.load('topics', {
    transacting: req.trx
  })

  const program_ids = program.related('topics').map(topic => topic.get('id'))

  await contact.load('topics', {
    transacting: req.trx
  })

  const existing_ids = contact.related('topics').toArray().map(item => {
    return item.id
  })

  const existing_program_ids = existing_ids.filter(id => {
    return _.includes(program_ids, id)
  })

  const add_ids = topic_ids.filter(id => {
    return !_.includes(existing_program_ids, id)
  })

  if(add_ids.length > 0) {
    await addToTopics(req, {
      topic_ids: add_ids,
      contact
    })
  }

  const remove_ids = existing_program_ids.filter(id => {
    return !_.includes(topic_ids, id)
  })

  if(remove_ids.length > 0) {
    await removeFromTopics(req, {
      topic_ids: remove_ids,
      contact
    })
  }

}

export default updateProgramTopics
