import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Design extends React.Component {

  static contextTypes = {}

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleDone = this._handleDone.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { config } = this.props
    return {
      showHeader: false,
      onChange: this._handleChange,
      sections: [
        {
          fields: [
            { label: 'Footer Text', name: 'header', type: 'textarea', defaultValue: config.background_color }
          ]
        }
      ]
    }
  }

  _handleDone() {
    this.props.onPop()
  }

  _handleChange(data) {
    this.props.onUpdate('page', data)
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.form_designer[props.cid].config
})

export default connect(mapStateToProps)(Design)
