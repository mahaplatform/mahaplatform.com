import Editor from '../../components/editor'
import { Page } from '@admin'

const mapResourcesToPage = (props, context) => ({
  datasets: `/api/admin/datasets/datasets/${props.params.dataset_id}`,
  fields: `/api/admin/datasets_types/${props.params.type_id}/fields`,
  record: `/api/admin/datasets/datasets/${props.params.dataset_id}/types/${props.params.type_id}/records/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Record',
  component: Editor
})

export default Page(mapResourcesToPage, mapPropsToPage)
