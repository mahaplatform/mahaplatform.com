import { Page } from 'maha-admin'
import React from 'react'

const getTasks = () => ({})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Channel',
  component: <div>email</div>,
  tasks: getTasks(props.user, resources)
})

export default Page(null, mapPropsToPage)
