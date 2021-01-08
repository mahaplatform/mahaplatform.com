import Raw from '@apps/analytics/models/raw'

export const createBad = async(req, { message }) => {

  await Raw.forge({
    data: message.data.payload.enriched,
    errors: {
      messages: message.data.failure.messages.reduce((errors,error) => [
        ...errors,
        ...error.error ? [error.error] : [],
        ...error.expectation ? [error] : []
      ], [])
    },
    status: 'bad'
  }).save(null, {
    transacting: req.trx
  })

}
