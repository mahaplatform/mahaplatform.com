import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Loader from '../../loader'
import pluralize from 'pluralize'
import React from 'react'
import _ from 'lodash'

class Overview extends React.Component {

  static contextTypes = {
    criteria: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    code: PropTypes.string,
    entity: PropTypes.string,
    filters: PropTypes.array,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onFetch: PropTypes.func,
    onNew: PropTypes.func
  }

  static defaultProps = {}

  _handleNew = this._handleNew.bind(this)

  render() {
    const { entity, filters, status } = this.props
    if(status === 'loading') return <Loader />
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-criteria-list-overview">
          <div className="maha-criteria-list-items">
            <div className={ this._getClass(null) } onClick={ this._handleChoose.bind(this, null) }>
              <div className="maha-criteria-list-item-label">
                All { _.capitalize(pluralize(entity)) }
              </div>
            </div>
            { filters && filters.map((filter, index) => (
              <div className={ this._getClass(filter.id) } key={`filter_${index}`} onClick={ this._handleChoose.bind(this, filter.id) }>
                <div className="maha-criteria-list-item-label">
                  { filter.title }
                </div>
                <div className="maha-criteria-list-item-icon">
                  <i className="fa fa-pencil" />
                </div>
              </div>
            )) }
            <div className="maha-criteria-list-item" onClick={ this._handleNew }>
              <div className="maha-criteria-list-item-label">
                + New Filter
              </div>
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { code } = this.props
    this.props.onFetch(code)
  }

  componentDidUpdate(prevProps) {
    const { active, filters, onChange } = this.props
    if(active !== prevProps.active) {
      const filter = filters.find(filter => filter.id === active)
      const criteria = filter ? filter.criteria : { $and: [] }
      onChange(criteria)
    }
  }

  _getClass(id) {
    const { active } = this.props
    const classes = ['maha-criteria-list-item']
    if(id === active) classes.push('active')
    return classes.join(' ')
  }

  _getPanel() {
    return {
      title: 'Filter Results',
      color: 'lightgrey'
    }
  }

  _handleChoose(id) {
    this.props.onChoose(id)
  }

  _handleNew() {
    this.props.onNew()
  }

}

export default Overview
