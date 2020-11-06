import { toFilter } from '../../criteria/utils'
import PropTypes from 'prop-types'
import Overview from './overview'
import Stack from '../../stack'
import React from 'react'

class Filter extends React.PureComponent {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.object,
    entity: PropTypes.string,
    fields: PropTypes.array,
    system: PropTypes.array,
    onChange: PropTypes.func,
    onClose: PropTypes.func
  }

  static defaultProps = {
    criteria: [],
    system: []
  }

  state = {
    cards: []
  }

  _handleChange = this._handleChange.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="maha-filter">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Overview, this._getOverview())
  }

  _getOverview() {
    const { code, entity, fields, system } = this.props
    return {
      code,
      entity,
      fields,
      system,
      onChange: this._handleChange,
      onPop: this._handlePop,
      onPush: this._handlePush
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleChange(criteria) {
    const filter = criteria ? toFilter(criteria) : { $and: [] }
    this.props.onChange(filter)
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

export default Filter
