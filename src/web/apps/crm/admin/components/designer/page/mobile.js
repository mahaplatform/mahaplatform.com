import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Mobile extends React.Component {

  static contextTypes = {}

  static propTypes = {
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  _getForm() {
    const { config } = this.props
    return {
      title: 'Mobile',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      cancelText: <i className="fa fa-chevron-left" />,
      saveText: null,
      sections: [
        {
          fields: []
        }
      ]
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleChange(data) {
    this.props.onUpdate('design.mobile', data)
  }

}

export default Mobile
