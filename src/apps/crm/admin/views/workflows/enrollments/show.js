import { Page } from 'maha-admin'

const getTabs = ({ workflow }) => {

  const items = []

  return { items }

}

const getTasks = ({ list }) => []

const mapResourcesToPage = (props, context) => ({
  workflow: `/api/admin/crm/workflows/${props.params.workflow_id}/enrollments/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Enrollment',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
