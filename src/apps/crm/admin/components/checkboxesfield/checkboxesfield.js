import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class CheckboxesField extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    filters: PropTypes.object,
    items: PropTypes.array,
    sections: PropTypes.object,
    selected: PropTypes.array,
    status: PropTypes.string,
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
      <div className="checkboxesfield">
        { Object.keys(sections).map((id, index) => (
          <div className="checkboxesfield-section" key={`section_${index}`}>
            <div className="checkboxesfield-header">
              { sections[id].title }
            </div>
            <div className="checkboxesfield-items">
              { sections[id].items.map((item, index) => (
                <div className="checkboxesfield-item" key={`item_${index}`} onClick={ this._handleToggle.bind(this, item)}>
                  <div className="checkboxesfield-item-icon">
                    { item.checked ?
                      <i className="fa fa-check-circle" /> :
                      <i className="fa fa-circle-o" />
                    }
                  </div>
                  <div className="checkboxesfield-item-label">
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
    const { defaultValue, endpoint, filters, onFetch, onSet } = this.props
    const query = filters ? { filters } : null
    if(defaultValue) onSet(defaultValue)
    onFetch(endpoint, query)
  }

  componentDidUpdate(prevProps) {
    const { selected, status, onChange, onReady } = this.props
    if(status !== prevProps.status && status === 'ready') {
      onReady()
    }
    if(!_.isEqual(selected, prevProps.selected)) {
      onChange(selected)
    }
  }

  _handleToggle(item) {
    this.props.onToggle(item.id)
  }

}

export default CheckboxesField
