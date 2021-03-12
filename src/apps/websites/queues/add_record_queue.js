import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {
  //
  // const domain = await Domain.query(qb => {
  //   qb.where('id', job.datas.id)
  // }).fetch({
  //   transacting: req.trx
  // })
  //
  // await createZone(req, {
  //   website
  // })

}

const AddRecordQueue = new Queue({
  queue: 'worker',
  name: 'add_record',
  processor
})

export default AddRecordQueue
