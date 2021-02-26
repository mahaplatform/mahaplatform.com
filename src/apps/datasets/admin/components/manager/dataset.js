import { Audit, Container, Comments, List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Dataset extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    audits: PropTypes.object,
    dataset: PropTypes.object
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
    const { audits, dataset } = this.props
    return {
      items: [
        { label: 'Title', content: dataset.title },
        { component: <Audit entries={ audits } /> }
      ],
      footer: <Comments entity={`datasets_datasets/${dataset.id}`} />
    }
  }

}

const mapResources = (props, context) => ({
  audits: `/api/admin/datasets_datasets/${props.dataset.id}/audits`
})

export default Container(mapResources)(Dataset)
