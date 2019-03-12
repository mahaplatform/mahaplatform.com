import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Commitments extends React.Component {

  static propTypes = {
    selected: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { selected } = this.props
    return (
      <div className="competencies-resources-items">
        { selected.map((item, index) => (
          <div className="competencies-resources-item" key={`item_${index}`} onClick={ this._handleClick.bind(this, item) }>
            <div className="competencies-resources-item-toggle">
              <i className="fa fa-fw fa-check-circle" />
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

  _handleClick(item) {
    this.props.onChoose(item)
  }

  _handleView(item, e) {
    e.stopPropagation()
    console.log(item.url)
  }

}

const mapStateToProps = (state, props) => ({
  selected: state.competencies.commitments.selected
})

export default connect(mapStateToProps)(Commitments)
