import PropTypes from 'prop-types'
import React from 'react'

class Items extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="competencies-resources-items">
        { records.map((item, index) => (
          <div className="competencies-resources-item" key={`item_${index}`}>
            <div className="competencies-resources-item-detail" onClick={ this._handleClick.bind(this, item) }>
              { item.title }
            </div>
            <div className="competencies-resources-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleClick(item) {
    this.props.onChoose(item)
  }

}

export default Items
