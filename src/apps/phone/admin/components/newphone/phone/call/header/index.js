import PropTypes from 'prop-types'
import Program from './program'
import Contact from './contact'
import User from './user'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    call: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { call, program } = this.props
    const { contact, direction, from, to, from_user, to_user } = call
    return (
      <div className="maha-phone-call-header">
        { direction === 'inbound' && !contact &&
          <span>no contact</span>
        }
        { direction === 'inbound' &&contact &&
          <Contact contact={ contact } from={ from }/>
        }
        { direction === 'inbound' && from_user &&
          <User user={ from_user } />
        }
        { direction === 'outbound' &&
          <Program program={ program } />
        }
        <div className="maha-phone-call-header-link">
          <i className="fa fa-arrow-right" />
        </div>
        { direction === 'inbound' &&
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
