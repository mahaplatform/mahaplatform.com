import PropTypes from 'prop-types'
import Program from './program'
import Contact from './contact'
import User from './user'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    call: PropTypes.object
  }

  render() {
    const { call } = this.props
    const { contact, direction, from, to, program, from_user, to_user } = call.call
    return (
      <div className="maha-phone-call-header">
        { program && direction === 'outbound' && !from_user &&
          <Program program={ program } />
        }
        { contact && direction === 'inbound' &&
          <Contact contact={ contact } from={ from }/>
        }
        { from_user &&
          <User user={ from_user } />
        }
        <div className="maha-phone-call-header-link">
          <i className="fa fa-arrow-right" />
        </div>
        { program && direction === 'inbound' &&
          <Program program={ program } />
        }
        { contact && direction === 'outbound' &&
          <Contact contact={ contact } from={ from } />
        }
        { to_user &&
          <User user={ to_user } to={ to } />
        }
      </div>
    )
  }

}

export default Header
