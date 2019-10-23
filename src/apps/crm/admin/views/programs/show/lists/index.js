import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'
import New from './new'

const Lists = ({ lists, program }) => {

  const list = {
    items: lists.map((list, index) => ({
      component: (props) => (
        <div className="token">
          { list.title }
        </div>
      )
    })),
    empty: {
      icon: 'book',
      title: 'No topics',
      text: 'There are no topics for this program',
      button: {
        label: 'Add List',
        modal: <New program_id={ program.id } />
      }
    },
    buttons: lists.length > 0 ? [
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
