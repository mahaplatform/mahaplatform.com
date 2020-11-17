import PropTypes from 'prop-types'
import { Menu } from '@admin'
import Payment from './payment'
import Contact from './contact'
import Custom from './custom'
import React from 'react'
import _ from 'lodash'

class Fields extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    fields: PropTypes.array,
    form: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    return (
      <div className="designer-fields">
        <Menu { ...this._getMenu() } />
      </div>
    )
  }

  _getMenu() {
    const { form } = this.props
    const bank_status = _.get(form.program, 'bank.status')
    return {
      type: 'pointing',
      items: [
        { label: 'Contact', component:  <Contact { ...this._getFields() } /> },
        { label: 'Custom', component: <Custom { ...this._getFields() } /> },
        ...bank_status === 'active' ? [
          { label: 'Payment', component: <Payment { ...this._getFields() } />  }
        ] : []
      ]
    }
  }

  _getFields() {
    return this.props
  }

}

export default Fields
