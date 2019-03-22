import Details from '../components/details'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

class Component extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    message: PropTypes.object
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return <Details { ...this._getDetails() } />
  }

  _getDetails() {
    const { message } = this.props
    return {
      message,
      onDone: this._handleBack
    }
  }

  _handleBack() {
    const { router } = this.context
    router.goBack()
  }

}

const mapResourcesToPage = (props, context) => ({
  message: `/api/admin/chat/channels/${props.params.channel_id}/messages/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Message',
  component: Component,
  rights: []
})

export default Page(mapResourcesToPage, mapPropsToPage)
