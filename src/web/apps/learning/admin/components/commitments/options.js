import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Options extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    records: PropTypes.array,
    selected: PropTypes.array,
    onChoose: PropTypes.func
  }

  link = null

  render() {
    const { records } = this.props
    return (
      <div className="competencies-resources-items">
        { records.map((item, index) => (
          <div className="competencies-resources-item" key={`item_${index}`} onClick={ this._handleClick.bind(this, item) }>
            <div className="competencies-resources-item-toggle">
              <i className={`fa fa-fw fa-${this._getIcon(item)}`} />
            </div>
            <div className="competencies-resources-item-detail">
              <strong>{ item.title }</strong>
              <div>{ item.description }</div>
              { (item.url || item.asset) &&
                <div className="link" onClick={ this._handleView.bind(this, item) }>
                  View Resource
                </div>
              }
            </div>
          </div>
        ))}
        <a target="_blank" ref={ node => this.link = node} />
      </div>
    )
  }

  _getIcon(item) {
    const { selected } = this.props
    return _.find(selected, { resource: { id: item.id } }) ? 'check-circle' : 'circle-o'
  }

  _handleClick(item) {
    this.props.onChoose(item)
  }

  _handleView(resource, e) {
    const { router } = this.context
    e.stopPropagation()
    if(resource.asset_id) return router.history.push(`/admin/assets/${resource.asset_id}`)
    if(resource.url) {
      this.link.href = resource.url
      this.link.click()
    }
  }

}

const mapStateToProps = (state, props) => ({
  selected: state.competencies.commitments.selected
})

export default connect(mapStateToProps)(Options)
