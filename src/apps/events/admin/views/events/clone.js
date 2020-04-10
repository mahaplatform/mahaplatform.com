import EventForm from '../../components/eventform'
import PropTypes from 'prop-types'
import React from 'react'

class Clone extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  render() {
    return <EventForm />
  }


}

export default Clone
