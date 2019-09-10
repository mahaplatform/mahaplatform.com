import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Numbers = ({ program }) => {

  const numbers = [
    { id: 1, number: '(607)123-4567' }
  ]

  const list = {}

  list.items = [
    ...numbers.map((number, index) => ({
      component: (
        <div className="token" key={`sender_${index}`}>
          { number.number }
        </div>
      )
    }))
  ]

  return <List { ...list } />

}

Numbers.propTypes = {
  program: PropTypes.object
}

export default Numbers
