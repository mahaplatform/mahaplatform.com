import { getOperationDetail } from '@core/services/aws/domains'
import _ from 'lodash'

const checkOperation = async(req, { domain }) => {

  const result = await getOperationDetail(req, {
    aws_operation_id: domain.get('aws_operation_id')
  })

  if(result.status === 'successful') {
    await domain.save({
      ...domain.type === 'registration' ? {
        registration_status: 'success'
      } : {},
      ...domain.type === 'transfer' ? {
        transfer_status: 'success'
      } : {},
      status: 'active'
    }, {
      transacting: req.trx,
      patch: true
    })
  }

  if(_.includes(['failed','error'], result.status)) {
    await domain.save({
      ...domain.type === 'registration' ? {
        registration_status: 'failed'
      } : {},
      ...domain.type === 'transfer' ? {
        transfer_status: 'failed'
      } : {},
      status: 'failed'
    }, {
      transacting: req.trx,
      patch: true
    })
  }

}

export default checkOperation
