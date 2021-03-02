import ValidateQueue from '@analytics/queues/validate_queue'
import Raw from '@analytics/models/raw'
import path from 'path'
import fs from 'fs'

const data = fs.readFileSync(path.join(__dirname, 'spacer.gif'))

const collectRoute = async (req, res) => {

  if(req.body.data) {

    await Promise.mapSeries(req.body.data, async (data) => {

      const raw = await Raw.forge({
        data: {
          ...data,
          ip: data.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          ua: data.ua || req.headers['user-agent'],
          refr: data.refr || req.headers['referer']
        },
        validation_status: 'pending',
        enrichment_status: 'pending',
        modeling_status: 'pending'
      }).save(null, {
        transacting: req.analytics
      })

      await ValidateQueue.enqueue(req, {
        id: raw.get('id')
      })

    })

  }

  return res.status(200).type('image/gif').send(data)

}

export default collectRoute
