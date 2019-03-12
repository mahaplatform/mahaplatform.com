import Explorer from '../../components/explorer'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context) => ({
  title: 'Resources',
  component: () => <Explorer plan_id="4" />
})

export default Page(null, mapPropsToPage)
