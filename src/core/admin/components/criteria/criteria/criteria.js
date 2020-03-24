import PropTypes from 'prop-types'
import Overview from './overview'
import Stack from '../../stack'
import React from 'react'
import _ from 'lodash'

class Criteria extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    code: PropTypes.string,
    criteria: PropTypes.object,
    defaultValue: PropTypes.array,
    display: PropTypes.array,
    fields: PropTypes.array,
    items: PropTypes.array,
    panel: PropTypes.object,
    standalone: PropTypes.bool,
    test: PropTypes.array,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onReset: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onTest: PropTypes.func
  }

  static defaultProps = {
    fields: [],
    standalone: true,
    onChange: () => {}
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleDefault(defaultValue)
    this._handlePush(Overview, this._getOverview.bind(this))
  }

  _handleDefault(defaultValue) {
    const value = defaultValue.length === 0 ? [{
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      data: null,
      field: null,
      value: null,
      parent: null,
      operator: '$and'
    }] : defaultValue
    this.props.onSet(value)
  }

  componentDidUpdate(prevProps) {
    const { items, test } = this.props
    if(!_.isEqual(items, prevProps.items)) {
      this.props.onChange(items)
    }
    if(!_.isEqual(test, prevProps.test)) {
      this.props.onChange(test || items)
    }
  }

  _getOverview() {
    const { cid, code, display, fields, panel, standalone, test } = this.props
    const { onChange, onCreate, onRemove, onReset, onSet, onTest } = this.props
    return {
      cid,
      code,
      criteria: display,
      fields,
      panel,
      standalone,
      test,
      onChange,
      onCreate,
      onPop: this._handlePop,
      onPush: this._handlePush,
      onRemove,
      onReset,
      onSet,
      onTest
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

}

export default Criteria
