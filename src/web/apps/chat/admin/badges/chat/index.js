import { connect } from 'react-redux'
import { count } from './selectors'
import PropTypes from 'prop-types'
import React from 'react'

class ChatBadge extends React.Component {

  static contextTypes = {
    portal: PropTypes.object
  }

  static propTypes = {
    count: PropTypes.number,
    unread_status: PropTypes.string
  }

  render() {
    const { count } = this.props
    return (
      <div className="maha-badge" title={`${count} unread`}>
        { count > 0 &&
          <div className="maha-badge-label">
            { count > 99 ? '99+' : count }
          </div>
        }
        <i className="fa fa-fw fa-comment" />
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { count } = this.props
    if(count !== prevProps.count) {
      this.context.portal.updateUnseen(count - prevProps.count)
    }
  }

}

const mapStateToProps = (state, props) => ({
  count: count(state, props),
  unread_status: state.chat.root.unread_status
})

export default connect(mapStateToProps)(ChatBadge)
