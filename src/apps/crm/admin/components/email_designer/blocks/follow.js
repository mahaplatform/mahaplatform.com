import FollowsField from '../../followsfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Follow extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    onDone: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

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
      this.props.onUpdate(config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Social Share Block',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      tabs: [
        {
          label: 'Content',
          sections: [
            {
              fields: [
                { name: 'networks', type: FollowsField, defaultValue: config.networks }
              ]
            }
          ]
        }, {
          label: 'Style',
          sections: [
            {
              fields: [
                { label: 'Background', name: 'background_color', type: 'colorfield', defaultValue: config.background_color }
              ]
            }, {
              label: 'Button Style',
              fields: [
                { label: 'Background', name: 'button_background_color', type: 'colorfield', defaultValue: config.button_background_color },
                { label: 'Rounded Corners', name: 'button_border_radius', type: 'range', min: 0, max: 20, defaultValue: config.button_border_radius }
              ]
            }
          ]
        }, {
          label: 'Settings',
          sections: [
            {
              fields: [
                { type: 'fields', fields: [
                  { label: 'Icon Style', name: 'icon_style', type: 'dropdown', options: ['solid','outline'], defaultValue: config.icon_style },
                  { label: 'Icon Color', name: 'icon_color', type: 'dropdown', options: ['color','dark','gray','light'], defaultValue: config.icon_color }
                ] },
                { label: 'Align', name: 'align', type: 'dropdown', options: ['left','center','right'], defaultValue: config.align }
              ]
            }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      align: 'center',
      icon_style: 'outline',
      icon_color: 'dark',
      button_background_color: null,
      button_border_radius: 0,
      networks: [
        { service: 'facebook', url: 'http://facebook.com' },
        { service: 'twitter', url: 'http://twitter.com' },
        { service: 'website', url: 'http://yourwebsite.com' }
      ]
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
    this.props.onDone()
  }

}

export default Follow
