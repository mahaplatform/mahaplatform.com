import Infinite from '../../infinite'
import Criteria from '../criteria'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'
import _ from 'lodash'

class Designer extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.object,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    fields: PropTypes.array,
    format: PropTypes.any,
    text: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    filter: {}
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    return (
      <div className="maha-criteria-designer">
        <div className="maha-criteria-designer-filter">
          <Criteria { ...this._getCriteria() } />
        </div>
        <div className="maha-criteria-designer-results">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    console.log('designer', defaultValue)
    if(defaultValue) this.setState({
      filter: defaultValue
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { filter } = this.state
    if(!_.isEqual(filter, prevState.filter)) {
      this.props.onChange(filter)
    }
  }

  _getCriteria() {
    const { fields, entity } = this.props
    const { filter } = this.state
    return {
      defaultValue: filter,
      panel: {
        title: 'Filters'
      },
      entity,
      fields,
      onChange: this._handleChange
    }
  }

  _getInfinite() {
    const { endpoint } = this.props
    const { filter } = this.state
    return {
      endpoint,
      filter,
      layout: Results,
      props: this._getResults()
    }
  }

  _getResults() {
    const { format, text, value } = this.props
    return {
      format,
      text,
      value
    }
  }

  _handleChange(filter) {
    this.setState({ filter })
  }

}

export default Designer
