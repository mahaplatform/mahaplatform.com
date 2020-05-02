import { Search } from 'maha-admin'
import PropTypes from 'prop-types'
import states from './states'
import React from 'react'

class State extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  render() {
    return <Search { ...this._getSearch() } />
  }

  // componentDidMount() {
  //   const { defaultValue } = this.props
  //   if(defaultValue) this._handleSet(defaultValue)
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   const { value, operator } = this.state
  //   if(operator !== prevState.operator) {
  //     this._handleChange()
  //   }
  //   if(!_.isEqual(value, prevState.value)) {
  //     this._handleChange()
  //   }
  // }

  _getSearch() {
    console.log(states)
    return {
      defaultValue: null,
      label: name,
      multiple: true,
      options: states,
      search: true,
      text: 'text',
      value: 'value',
      onChange: this._handleUpdate
    }
  }
  //
  // _getMap() {
  //   return {
  //     onDone: this._handleUpdate
  //   }
  // }
  //
  // _getMapButton() {
  //   return {
  //     label: 'Draw Polygon',
  //     color: 'blue',
  //     handler: this._handleMap
  //   }
  // }
  //
  // _getOperators() {
  //   return [
  //     { value: '$adct', text: 'is in city' },
  //     { value: '$adcn', text: 'is in county' },
  //     { value: '$adst', text: 'is in state/province' },
  //     { value: '$adpc', text: 'is in postal code' },
  //     { value: '$addt', text: 'is within distance of' },
  //     { value: '$adsh', text: 'is inside polygon on map' }
  //   ]
  // }
  //
  // _getPanel() {
  //   const { value } = this.state
  //   const { name } = this.props
  //   return {
  //     title: name,
  //     leftItems: [
  //       { icon: 'chevron-left', handler: this._handleCancel }
  //     ],
  //     color: 'grey',
  //     buttons: [{
  //       label: 'Add Criteria',
  //       color: 'blue',
  //       disabled: value === null,
  //       handler: this._handleDone
  //     }]
  //   }
  // }
  //
  // _getRadioGroup() {
  //   const options = this._getOperators()
  //   const { operator } = this.state
  //   return {
  //     defaultValue: operator || options[0].value,
  //     options,
  //     onChange: this._handleOperator
  //   }
  // }
  //
  // _handleCancel() {
  //   this.props.onCancel()
  // }
  //
  // _handleChange() {
  //   const { operator, value } = this.state
  //   const { code } = this.props
  //   if(!value) return
  //   this.props.onChange({
  //     code,
  //     operator,
  //     value,
  //     data: null
  //   })
  // }
  //
  // _handleDone() {
  //   const { operator, value } = this.state
  //   const { code } = this.props
  //   this.props.onDone({
  //     code,
  //     operator,
  //     value,
  //     data: null
  //   })
  // }
  //
  // _handleMap() {
  //   this.context.modal.open(<Map { ...this._getMap() } />)
  // }
  //
  // _handleOperator(operator) {
  //   this.setState({ operator })
  // }
  //
  // _handleSet(defaultValue) {
  //   const operator = Object.keys(defaultValue)[0]
  //   const value = defaultValue[operator]
  //   this.setState({ value })
  // }
  //
  // _handleUpdate(value) {
  //   this.setState({ value })
  // }

}

export default State
