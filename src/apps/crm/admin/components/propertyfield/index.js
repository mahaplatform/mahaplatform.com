import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class PropertyField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    properties: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    property: null
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleLookup = this._handleLookup.bind(this)

  render() {
    const { property } = this.state
    return (
      <div className="maha-input">
        <div className="maha-input-field" onClick={ this._handleLookup }>
          { property ?
            <div className="maha-input-token">
              { property.label }
            </div> :
            <div className="maha-input-placeholder">
              Choose a property
            </div>
          }
        </div>
        { property &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      property: defaultValue
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { property } = this.state
    if(!_.isEqual(property, prevState.property)) {
      this.props.onChange(property ? property.name : null)
    }
  }

  _getChooser() {
    const { properties } = this.props
    return {
      properties,
      onChoose: this._handleChoose
    }
  }

  _handleChoose(property) {
    this.setState({ property })
  }

  _handleClear(e) {
    e.preventDefault()
    this.setState({
      property: null
    })
  }

  _handleLookup() {
    this.context.form.push(Chooser, this._getChooser())
  }

}

export default PropertyField
