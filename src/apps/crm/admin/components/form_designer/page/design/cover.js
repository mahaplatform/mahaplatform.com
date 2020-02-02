import ImageField from '../../../imagefield'
import * as options from '../../variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Cover extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleReset = this._handleReset.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate('cover', config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Cover',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Image', name: 'image', type: ImageField, defaultValue: config.image },
            { label: 'Caption', name: 'caption', type: 'htmlfield', defaultValue: config.caption },
            { label: 'Position', name: 'position', type: 'dropdown', options: options.cover_positions, defaultValue: config.position },
            { label: 'Justification', name: 'image_justification', type: 'dropdown', options: options.cover_justifications, defaultValue: config.image_justification },
            { label: 'Width', name: 'width', type: 'dropdown', options: options.cover_widths, defaultValue: config.width }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      image: null,
      image_justification: 'center',
      caption: null,
      position: 'left',
      width: 1
    }
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleDone() {
    this.props.onPop()
  }

  _handleReset() {
    this.setState({
      config: this._getDefault()
    })
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.form_designer[props.cid].config.cover
})

export default connect(mapStateToProps)(Cover)
