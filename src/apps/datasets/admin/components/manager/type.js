import { Audit, Container, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Type extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    audits: PropTypes.array,
    dataset: PropTypes.object,
    type: PropTypes.object
  }

  render() {
    return (
      <div className="datasets-manager-container">
        <div className="datasets-manager-panel">
          <List { ...this._getList() } />
        </div>
      </div>
    )
  }

  _getList() {
    const { audits, type } = this.props
    return {
      items: [
        { label: 'Title', content: type.title },
        { component: <Audit entries={ audits } /> }
      ],
      footer: <Comments entity={`datasets_types/${type.id}`} />
    }
  }

}

const mapResources = (props, context) => ({
  audits: `/api/admin/datasets_types/${props.type.id}/audits`
})

export default Container(mapResources)(Type)
