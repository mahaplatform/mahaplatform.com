import Resources from '../../components/resources'
import { Page } from 'maha-admin'
import React from 'react'

const mapPropsToPage = (props, context) => ({
  title: 'Resources',
  component: Resources
})

export default Page(null, mapPropsToPage)
