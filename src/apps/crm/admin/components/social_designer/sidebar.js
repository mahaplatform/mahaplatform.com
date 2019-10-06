import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Sidebar extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    profiles: PropTypes.array,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  state = {
    attachment: 'none',
    profile: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      title: 'Post',
      onChange: this._handleChange,
      onChangeField: this._handleChangeField,
      cancelText: null,
      saveText: null,
      buttons: [
        { label: 'Save', color: 'red', handler: this._handleSave }
      ],
      sections: [
        {
          fields: [
            { label: 'Profile', name: 'profile', type: 'profilefield', formatter: (profile) => profile, defaultValue: config.profile },
            ...this._getProfileFields(),
            ...this._getAttachmentField()
          ]
        }
      ]
    }
  }

  _getProfileFields() {
    const { attachment, profile } = this.state
    const { config } = this.props
    if(profile) {
      if(profile.service === 'instagram') {
        return [
          { label: 'Photos', name: 'photos', type: 'attachmentfield', multiple: true, formatter: (asset) => asset, prompt: 'Add Photos', defaultValue: config.photos },
          { label: 'Caption', name: 'message', type: 'textarea', defaultValue: config.message }
        ]
      } else if(profile.service === 'twitter') {
        return [
          { label: 'Tweet', name: 'message', type: 'textarea', maxLength: 280, defaultValue: config.message },
          { label: 'Attachment', name: 'attachment', type: 'radiogroup', options: this._getAttachmentOptions(), defaultValue: attachment }
        ]
      } else if(profile.service === 'facebook') {
        return [
          { label: 'Post', name: 'message', type: 'textarea', defaultValue: config.message },
          { label: 'Attachment', name: 'attachment', type: 'radiogroup', options: this._getAttachmentOptions(), defaultValue: attachment }
        ]
      }
    }
    return []
  }

  _getAttachmentOptions() {
    const { profile } = this.state
    return profile.service === 'instagram' ? ['photos'] : ['photos','link']
  }

  _getAttachmentField() {
    const { attachment } = this.state
    const { config } = this.props
    if(attachment === 'photos') {
      return [
        { label: 'Photos', name: 'photos', type: 'attachmentfield', multiple: true, formatter: (asset) => asset, prompt: 'Add Photos', defaultValue: config.photos }
      ]
    } else if(attachment === 'link') {
      return [
        { label: 'Link', name: 'link', type: 'linkfield', defaultValue: config.link }
      ]
    }
    return []
  }

  _handleChange(config) {
    this.props.onUpdate(config)
  }

  _handleChangeField(key, value) {
    if(_.includes['attachment','profile'], key) {
      this.setState({
        [key]: value
      })
    }
  }

  _handleSave() {

  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.social_designer[props.cid].config
})

export default connect(mapStateToProps)(Sidebar)
