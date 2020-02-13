import ModalPanel from '../../modal_panel'
import Infinite from '../../infinite'
import Criteria from '../criteria'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

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
    onDone: PropTypes.func
  }

  state = {
    filter: {}
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criteria-designer">
          <div className="maha-criteria-designer-filter">
            <Criteria { ...this._getCriteria() } />
          </div>
          <div className="maha-criteria-designer-results">
            <Infinite { ...this._getInfinite() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      filter: defaultValue
    })
  }

  _getCriteria() {
    const { fields, entity } = this.props
    return {
      title: 'Filter',
      cancelIcon: null,
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

  _getPanel() {
    const { title } = this.props
    return {
      title,
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
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

  _handleDone() {
    const { filter } = this.state
    this.props.onDone(filter)
  }

}

export default Designer
