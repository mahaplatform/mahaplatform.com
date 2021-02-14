import VoiceDesigner from '@apps/campaigns/admin/components/voice_designer'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    phone_number: PropTypes.object
  }

  render() {
    return <VoiceDesigner { ...this._getVoiceDesigner() } />
  }

  _getVoiceDesigner() {
    const { phone_number } = this.props
    return {
      campaign: {
        phone_number,
        direction: 'inbound',
        status: 'active'
      },
      entity: `maha_phone_numbers/${phone_number.id}`,
      program: phone_number.program
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  phone_number: `/api/admin/phone/phone_numbers/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Workflow',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
