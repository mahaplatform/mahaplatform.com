import ProgramToken from '../../tokens/program'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class CheckboxesField extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    items: PropTypes.array,
    sections: PropTypes.object,
    selected: PropTypes.array,
    status: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    const { sections } = this.props
    return (
      <div className="crm-checkboxesfield">
        { Object.keys(sections).map((id, index) => (
          <div className="crm-checkboxesfield-section" key={`section_${index}`}>
            <div className="crm-checkboxesfield-header">
              <ProgramToken { ...sections[id] } />
            </div>
            <div className="crm-checkboxesfield-items">
              { sections[id].items.map((item, index) => (
                <div className="crm-checkboxesfield-item" key={`item_${index}`} onClick={ this._handleToggle.bind(this, item)}>
                  <div className="crm-checkboxesfield-item-icon">
                    { this._getChecked(item) ?
                      <i className="fa fa-check-circle" /> :
                      <i className="fa fa-circle-o" />
                    }
                  </div>
                  <div className="crm-checkboxesfield-item-label">
                    { item.title }
                  </div>
                </div>
              )) }
            </div>
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, endpoint, filter, onFetch, onSet } = this.props
    const query = filter ? { $filter: filter } : null
    if(defaultValue) onSet(defaultValue)
    onFetch(endpoint, query)
  }

  componentDidUpdate(prevProps) {
    const { selected, status, onReady } = this.props
    if(status !== prevProps.status && status === 'ready') {
      onReady()
    }
    if(!_.isEqual(selected, prevProps.selected)) {
      this._handleChange()
    }
  }

  _getChecked(option) {
    const { selected, value } = this.props
    if(!selected) return false
    return selected.find(item => {
      return value ? option === _.get(item, value) : _.isEqual(item, option)
    }) !== undefined
  }

  _handleToggle(item) {
    const { value } = this.props
    const chosen = value ? _.get(item, value) : item
    this.props.onToggle(chosen)
  }

  _handleChange() {
    const { selected } = this.props
    this.props.onChange(selected)
  }

}

export default CheckboxesField
