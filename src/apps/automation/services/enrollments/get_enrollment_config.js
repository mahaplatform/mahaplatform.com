import { renderWorkflow } from '@apps/automation/services/workflows'
import { getPublished } from '@apps/maha/services/versions'

const getEnrollmentConfig = async (req, { parent }) => {

  const version = await getPublished(req, {
    versionable_type: parent.tableName,
    versionable_id: parent.get('id'),
    key: 'config'
  })

  const config = await renderWorkflow(req, {
    code: 'abcdef',
    config: version.get('value')
  })

  return config

}

export default getEnrollmentConfig
