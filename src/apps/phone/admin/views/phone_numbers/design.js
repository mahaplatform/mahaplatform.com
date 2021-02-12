import VoiceDesigner from '@apps/campaigns/admin/components/voice_designer'
import PropTypes from 'prop-types'
import { Page } from '@admin'
import React from 'react'

class Designer extends React.Component {

  static propTypes = {
    phone_number: PropTypes.object,
    current: PropTypes.object,
    versions: PropTypes.array
  }

  render() {
    return <VoiceDesigner { ...this._getVoiceDesigner() } />
  }

  _getVoiceDesigner() {
    const { current, phone_number, versions } = this.props
    return {
      campaign: {
        phone_number,
        direction: 'inbound',
        status: 'active',
        steps: current.value.steps
      },
      endpoint: `/api/admin/phone/phone_numbers/${phone_number.id}/workflow`,
      program: phone_number.program,
      versions
    }
  }

}

const mapResourcesToPage = (props, context) => ({
  phone_number: `/api/admin/phone/phone_numbers/${props.params.id}`,
  versions: `/api/admin/maha_phone_numbers/${props.params.id}/config/versions`,
  current: `/api/admin/maha_phone_numbers/${props.params.id}/config/versions/current`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Voice Workflow',
  component: Designer
})

export default Page(mapResourcesToPage, mapPropsToPage)
