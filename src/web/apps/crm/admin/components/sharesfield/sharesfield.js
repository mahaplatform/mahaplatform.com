import { TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'
import _ from 'lodash'

const services = {
  facebook: {
    service: 'facebook',
    text: 'Share'
  },
  forwardtofriend: {
    service: 'forwardtofriend',
    text: 'Forward'
  },
  linkedin: {
    service: 'linkedin',
    text: 'Share'
  },
  pinterest: {
    service: 'pinterest',
    text: 'Pin'
  },
  twitter: {
    service: 'twitter',
    text: 'Tweet'
  }
}

class Sharesfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    networks: PropTypes.array,
    options: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)
  _handleClick = this._handleClick.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { networks, options } = this.props
    return (
      <div className="sharesfield">
        { networks.map((network, index) => (
          <div className="sharesfield-network" key={`network_${index}`}>
            <div className="sharesfield-network-handle">
              <i className="fa fa-bars" />
            </div>
            <div className="sharesfield-network-icon">
              <img src={`/images/emails/solid-color-${ network.service }-96.png`} />
            </div>
            <div className="sharesfield-network-details">
              <TextField { ...this._getTextField(network, index) }/>
            </div>
            <div className="sharesfield-network-remove" onClick={ this._handleRemove.bind(this, index)}>
              <i className="fa fa-trash-o" />
            </div>
          </div>
        )) }
        { options.length > 0 &&
          <div className="sharesfield-network-add" onClick={ this._handleClick }>
            <div className="sharesfield-network-add-icon">
              <i className="fa fa-plus" />
            </div>
            <div className="sharesfield-network-add-label">
              Add Service
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { networks } = this.props
    if(!_.isEqual(networks, prevProps.networks)) {
      this.props.onChange(networks)
    }
  }

  _getNew() {
    const { networks, options } = this.props
    return {
      options,
      onAdd: this._handleAdd,
      onBack: this._handlePop
    }
  }

  _getOptions() {
    const { networks } = this.props
    const options = ['facebook','twitter','forwardtofriend','pinterest','linkedin']
    return options.filter(service => {
      return _.find(networks, { service }) === undefined
    })
  }

  _getTextField(network, index) {
    return {
      placeholder: services[network.service].text,
      defaultValue: network.text,
      onChange: this._handleUpdate.bind(this, network, index)
    }
  }

  _handleAdd(value) {
    const network = services[value]
    this.props.onAdd(network)
    this.context.form.pop()
  }

  _handleClick() {
    this.context.form.push(<New { ...this._getNew() } />)
  }

  _handlePop() {
    this.context.form.pop()
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleUpdate(network, index, text) {
    this.props.onUpdate(index, {
      ...network,
      text
    })
  }

}

export default Sharesfield
