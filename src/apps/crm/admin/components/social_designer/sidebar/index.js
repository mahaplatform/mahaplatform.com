import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

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
    attachment: 'none'
  }

  _handleChange = this._handleChange.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { attachment } = this.state
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
            { label: 'Message', name: 'message', type: 'textarea', defaultValue: config.message },
            { label: 'Attachment', name: 'attachment', type: 'radiogroup', options: ['none','photos','link'], defaultValue: attachment },
            ...this._getAttachmentField()
          ]
        }
      ]
    }
  }

  _getAttachmentField() {
    const { attachment } = this.state
    const { config } = this.props
    if(attachment === 'photos') {
      return [
        { label: 'Photos', name: 'photos', type: 'attachmentfield', multiple: true, formatter: (asset) => asset, prompt: 'Add Photos', defaultValue: config.photos }
      ]
    }
    if(attachment === 'link') {
      return [
        { label: 'Link', name: 'link', type: 'textfield', defaultValue: config.link }
      ]
    }
    return []
  }

  _handleChange(config) {
    this.props.onUpdate(config)
  }

  _handleChangeField(key, value) {
    if(key === 'attachment') {
      this.setState({
        attachment: value
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
