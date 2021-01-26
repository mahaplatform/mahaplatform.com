import Queue from '@core/objects/queue'

const processor = async (req, job) => {
  console.log(job.data)
}

const TwilioStatusQueue = new Queue({
  queue: 'twilio',
  name: 'status',
  remove: false,
  processor
})

export default TwilioStatusQueue
