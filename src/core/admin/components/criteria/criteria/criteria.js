import PropTypes from 'prop-types'
import Overview from './overview'
import Stack from '../../stack'
import React from 'react'

class Criteria extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    code: PropTypes.string,
    criteria: PropTypes.object,
    defaultValue: PropTypes.object,
    fields: PropTypes.array,
    panel: PropTypes.object,
    onChange: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onReset: PropTypes.func,
    onSave: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    fields: [],
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
    this._handlePush(Overview, this._getOverview())
  }

  _getOverview() {
    const { cid, code, criteria, defaultValue, fields, filter, panel, test } = this.props
    const { onChange, onCreate, onRemove, onReset, onSet, onTest, onUpdate } = this.props
    return {
      cid,
      code,
      criteria,
      defaultValue,
      fields,
      filter,
      panel,
      test,
      onChange,
      onCreate,
      onPop: this._handlePop,
      onPush: this._handlePush,
      onRemove,
      onReset,
      onSet,
      onTest,
      onUpdate
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