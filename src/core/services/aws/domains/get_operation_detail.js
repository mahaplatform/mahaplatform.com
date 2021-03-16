import { route53Domains } from '@core/vendor/aws'

const getOperationDetail = async(req, { aws_operation_id }) => {

  const operation = await route53Domains.getOperationDetail({
    OperationId: aws_operation_id
  }).promise()

  return {
    status: operation.Status.toLowerCase()
  }

}

export default getOperationDetail
