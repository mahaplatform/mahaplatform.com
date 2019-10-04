import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Preview extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    user: PropTypes.object,
    onBack: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleSend = this._handleSend.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config, user } = this.props
    return {
      title: 'Send Preview',
      onCancel: this._handleBack,
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      buttons: [
        { label: 'Send', color: 'red', handler: this._handleSend }
      ],
      sections: [
        {
          fields: [
            { type: 'hidden', name: 'config', defaultValue: config },
            { label: 'To', type: 'emailfield', name: 'to', required: true, defaultValue: user.email }
          ]
        }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleSend() {

  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Preview)
