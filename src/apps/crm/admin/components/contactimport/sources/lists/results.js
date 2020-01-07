import PropTypes from 'prop-types'
import React from 'react'

class Lists extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { records } = this.props
    return (
      <div className="contactimport-contacts">
        { records.map((list, index) => (
          <div className="contactimport-contact" key={`contact_${index}`} onClick={ this._handleChoose.bind(this, list)}>
            <div className="contactimport-contact-label">
              { list.name } (
              { list.contact_count } members
              )
            </div>
            <div className="contactimport-contact-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _handleChoose(list) {
    this.props.onChoose(list.id)
  }

}

export default Lists
