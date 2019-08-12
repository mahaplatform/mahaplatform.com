import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Loader from '../../loader'
import Button from '../../button'
import React from 'react'
import _ from 'lodash'

class Overview extends React.Component {

  static contextTypes = {
    criteria: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    code: PropTypes.string,
    entity: PropTypes.string,
    filters: PropTypes.array,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onEdit: PropTypes.func,
    onFetch: PropTypes.func,
    onNew: PropTypes.func
  }

  static defaultProps = {}

  _handleFetch = this._handleFetch.bind(this)
  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { entity, filters, status } = this.props
    const loading = _.includes(['pending','loading'], status)
    return (
      <ModalPanel { ...this._getPanel() }>
        { loading && <Loader /> }
        { !loading &&
          <div className="maha-criteria-list-overview">
            <div className="maha-criteria-list-items">
              <div className={ this._getClass(null) } onClick={ this._handleChoose.bind(this, null) }>
                <div className="maha-criteria-list-item-label">
                  All { _.capitalize(pluralize(entity)) }
                </div>
              </div>
              { filters && filters.map((filter, index) => (
                <div className={ this._getClass(filter.id) } key={`filter_${index}`} onClick={ this._handleEdit.bind(this, filter) }>
                  <div className="maha-criteria-list-item-label">
                    { filter.title }
                  </div>
                </div>
              )) }
              <div className="maha-criteria-list-item">
                <Button { ...this._getButton() } />
              </div>
            </div>
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { active, filters, onChange } = this.props
    if(active !== prevProps.active) {
      const filter = filters.find(filter => filter.id === active)
      const criteria = filter ? filter.criteria : { $and: [] }
      onChange(criteria)
    }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getButton() {
    return {
      label: '+ New Filter',
      className: 'maha-criteria-list-item-label',
      handler: this._handleNew
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
      color: 'grey'
    }
  }

  _handleChoose(id) {
    this.props.onChoose(id)
  }

  _handleFetch() {
    const { code } = this.props
    this.props.onFetch(code)
  }

  _handleJoin() {
    const { network } = this.context
    const { code } = this.props
    const channel = `/admin/${code}/filters`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { code } = this.props
    const channel = `/admin/${code}/filters`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleNew() {
    this.props.onNew()
  }

  _handleEdit(filter, e) {
    this.props.onEdit(filter)
    e.stopPropagation()
  }

}

export default Overview
