import List from '../../../components/list'

import PropTypes from 'prop-types'
import React from 'react'

class Emails extends React.Component {

  static propTypes = {
    emails: PropTypes.array,
    workflow: PropTypes.object
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return <List { ...this._getList() } />
  }

  _getList() {
    const { emails, workflow } = this.props
    return {
      format: (email) => (
        <div className="token">
          { email.title }
        </div>
      ),
      items: emails,
      route: (email) => `/admin/crm/workflows/${workflow.code}/emails/${email.code}`
    }
  }

  _handleChoose() {
    this.context.router.push('/admin/crm/workflows')
  }

}
export default Emails
