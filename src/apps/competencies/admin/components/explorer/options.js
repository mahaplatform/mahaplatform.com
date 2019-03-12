import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Options extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    selected: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="competencies-resources-items">
        { records.map((item, index) => (
          <div className="competencies-resources-item" key={`item_${index}`}>
            <div className="competencies-resources-item-toggle" onClick={ this._handleClick.bind(this, item) }>
              <i className={`fa fa-fw fa-${this._getIcon(item)}`} />
            </div>
            <div className="competencies-resources-item-detail">
              <strong>{ item.title }</strong>
              <div>{ item.description }</div>
              { item.url &&
                <div className="link" onClick={ this._handleView.bind(this, item) }>View Resource</div>
              }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getIcon(item) {
    const { selected } = this.props
    return _.includes(selected, item.id) ? 'check-circle' : 'circle-o'
  }

  _handleClick(item) {
    this.props.onChoose(item)
  }

  _handleView(item) {
    console.log(item.url)
  }

}

const mapStateToProps = (state, props) => ({
  selected: state.competencies.explorer.selected
})

export default connect(mapStateToProps)(Options)
