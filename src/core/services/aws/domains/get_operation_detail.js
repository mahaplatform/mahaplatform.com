import { route53Domains } from '@core/vendor/aws'

const getOperationDetail = async(req, { operation_id }) => {

  const operation = await route53Domains.getOperationDetail({
    OperationId: operation_id
  }).promise()

  console.log({ operation })

  return {
    status: operation.Status
  }

}

export default getOperationDetail
