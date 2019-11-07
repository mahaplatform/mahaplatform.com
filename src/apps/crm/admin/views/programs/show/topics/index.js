import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'
import New from './new'

const Topics = ({ program, topics }) => {

  const list = {
    items: topics.map((topic, index) => ({
      component: (props) => (
        <div className="token">
          { topic.title }
        </div>
      )
    })),
    empty: {
      icon: 'book',
      title: 'No Topics',
      text: 'There are no topics for this program',
      button: program.access_type === 'manage' ? {
        label: 'Add Topic',
        modal: <New program_id={ program.id } />
      } : null
    },
    buttons: program.access_type === 'manage' && topics.length > 0 ? [
      { label: 'Add Topic', color: 'blue', modal: <New program_id={ program.id } /> }
    ] : null
  }

  return <List { ...list } />

}

Topics.propTypes = {
  program: PropTypes.object,
  topics: PropTypes.array
}

export default Topics
