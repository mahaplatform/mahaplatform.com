import ImageField from '../../../imagefield'
import * as options from '../../variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Page extends React.Component {

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
      this.props.onUpdate('page', config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Page',
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
            { label: 'Background Color', name: 'background_color', type: 'colorfield', defaultValue: config.background_color }
          ]
        }, {
          label: 'Form',
          fields: [
            { label: 'Background Color', name: 'form_background_color', type: 'colorfield', defaultValue: config.form_background_color },
            { label: 'Width', name: 'form_width', type: 'dropdown', options: options.form_widths, defaultValue: config.form_width }
          ]
        }, {
          label: 'Cover',
          fields: [
            { label: 'Image', name: 'cover_image', type: ImageField, defaultValue: config.cover_image },
            { label: 'Position', name: 'cover_image_position', type: 'dropdown', options: options.cover_positions, defaultValue: config.cover_image_position },
            { label: 'Justification', name: 'cover_image_justification', type: 'dropdown', options: options.cover_justifications, defaultValue: config.cover_image_justification },
            { label: 'Width', name: 'cover_image_width', type: 'dropdown', options: options.cover_widths, defaultValue: config.cover_image_width }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      background_color: null,
      cover_image: null,
      cover_image_position: 0,
      cover_image_justification: null,
      cover_image_width: null
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
  config: state.crm.form_designer[props.cid].config.page
})

export default connect(mapStateToProps)(Page)
