import { generateScreenshot } from '../services/email'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  await generateScreenshot(req, {
    email_campaign_id: job.data.email_campaign_id,
    email_id: job.data.email_id,
    template_id: job.data.template_id
  })

}

const GenerateScreenshotQueue = new Queue({
  name: 'generate_screenshot',
  processor
})

export default GenerateScreenshotQueue
