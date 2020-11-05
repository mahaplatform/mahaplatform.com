import Fulfillment from '@apps/training/models/fulfillment'

const reviewsRoute = async (req, res) => {

  const fulfillments = await Fulfillment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.whereNotNull('overall_rating')
    qb.where('offering_id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['user.photo'],
    transacting: req.trx
  }).then(result => result.toArray())

  const props = ['overall','expectations','knowledge','presentation','content']

  const reviews = fulfillments.reduce((reviews, fulfillment) => ({
    ...props.reduce((items, prop) => ({
      ...items,
      [`${prop}_rating`]: {
        ...reviews[`${prop}_rating`],
        answers: reviews[`${prop}_rating`].answers.map(answer => ({
          ...answer,
          count: answer.count + (fulfillment.get(`${prop}_rating`) === answer.value ? 1 : 0)
        }))
      }
    }), {}),
    additional_feedback: {
      ...reviews.additional_feedback,
      answers: [
        ...reviews.additional_feedback.answers,
        fulfillment.get('additional_feedback')
      ]
    },
    total: reviews.total + 1
  }), {
    overall_rating: {
      question: 'How would you rate the overall quality of the presentation?',
      answers: [
        { value: 5, text: 'Excellent', count: 0 },
        { value: 4, text: 'Good', count: 0 },
        { value: 3, text: 'Average', count: 0 },
        { value: 2, text: 'Poor', count: 0 },
        { value: 1, text: 'Terrible', count: 0 }
      ]
    },
    expectations_rating: {
      question: 'How well did the training meet your expectations?',
      answers: [
        { value: 5, text: 'Extremely well', count: 0 },
        { value: 4, text: 'Very well', count: 0 },
        { value: 3, text: 'Moderately well', count: 0 },
        { value: 2, text: 'Slightly well', count: 0 },
        { value: 1, text: 'Not well at all', count: 0 }
      ]
    },
    knowledge_rating: {
      question: 'How do you rate the presenter\'s knowledge of the subject matter?',
      answers: [
        { value: 3, text: 'High', count: 0 },
        { value: 2, text: 'Average', count: 0 },
        { value: 1, text: 'Low', count: 0 }
      ]
    },
    presentation_rating: {
      question: 'How well did the presenter keep the presentation alive and interesting?',
      answers: [
        { value: 5, text: 'Extremely well', count: 0 },
        { value: 4, text: 'Very well', count: 0 },
        { value: 3, text: 'Moderately well', count: 0 },
        { value: 2, text: 'Slightly well', count: 0 },
        { value: 1, text: 'Not well at all', count: 0 }
      ]
    },
    content_rating: {
      question: 'Would you attend an additional training in the same / similar subject matter if given the opportunity?',
      answers: [
        { value: 4, text: 'Yes, definitely', count: 0 },
        { value: 3, text: 'Probably, depending on circumstances / topic', count: 0 },
        { value: 2, text: 'Probably not', count: 0 },
        { value: 1, text: 'Definitely not', count: 0 }
      ]
    },
    additional_feedback: {
      question: 'Please list any additional feedback you would like to provide, including suggested future staff training opportunities.',
      answers: []
    },
    total: 0
  })

  res.status(200).respond(reviews)

}

export default reviewsRoute
