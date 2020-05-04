import ProgramToken from '../../tokens/program'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class CheckboxesField extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    filter: PropTypes.object,
    multiple: PropTypes.bool,
    items: PropTypes.array,
    sections: PropTypes.object,
    selected: PropTypes.array,
    status: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    multiple: true,
    text: 'title',
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    const { sections, text } = this.props
    return (
      <div className="crm-checkboxesfield">
        { sections.map((section, index) => (
          <div className="crm-checkboxesfield-section" key={`section_${index}`}>
            <div className="crm-checkboxesfield-header">
              <ProgramToken { ...section } />
            </div>
            <div className="crm-checkboxesfield-items">
              { section.items.map((item, index) => (
                <div className="crm-checkboxesfield-item" key={`item_${index}`} onClick={ this._handleToggle.bind(this, item)}>
                  <div className="crm-checkboxesfield-item-icon">
                    { this._getChecked(item) ?
                      <i className="fa fa-check-circle" /> :
                      <i className="fa fa-circle-o" />
                    }
                  </div>
                  <div className="crm-checkboxesfield-item-label">
                    { item[text] }
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
      return value ? item === _.get(option, value) : _.isEqual(item, option)
    }) !== undefined
  }

  _handleToggle(item) {
    const { multiple, value } = this.props
    const chosen = value ? _.get(item, value) : item
    this.props.onToggle(multiple, chosen)
  }

  _handleChange() {
    const { selected } = this.props
    this.props.onChange(selected)
  }

}

export default CheckboxesField
