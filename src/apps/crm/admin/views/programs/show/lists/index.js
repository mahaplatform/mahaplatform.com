import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'
import Edit from './edit'
import New from './new'

const Lists = ({ lists, program }) => {

  const list = {
    items: lists.map((list, index) => ({
      tasks: [
        { label: 'Edit List', modal: <Edit list={ list } /> }
      ],
      component: (props) => (
        <div className="token">
          { list.title }
        </div>
      )
    })),
    empty: {
      icon: 'th-list',
      title: 'No Lists',
      text: 'There are no lists for this program',
      button: program.access_type === 'manage' ? {
        label: 'Add List',
        modal: <New program_id={ program.id } />
      } : null
    },
    buttons: program.access_type === 'manage' && lists.length > 0 ? [
      { label: 'Add List', color: 'blue', modal: <New program_id={ program.id } /> }
    ] : null
  }

  return <List { ...list } />

}

Lists.propTypes = {
  lists: PropTypes.array,
  program: PropTypes.object
}

export default Lists
