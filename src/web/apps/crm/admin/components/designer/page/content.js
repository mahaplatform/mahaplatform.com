import { types } from '../types'
import PropTypes from 'prop-types'
import React from 'react'

class Content extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  state = {}

  render() {
    return (
      <div className="content-types">
        { types.map((type, index) => (
          <div className="content-type" key={`type_${index}`}>
            <div className="content-type-icon">
              <i className={`fa fa-fw fa-${ type.icon }`} />
            </div>
            <div className="content-type-label">
              { type.label }
            </div>
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}


}

export default Content
