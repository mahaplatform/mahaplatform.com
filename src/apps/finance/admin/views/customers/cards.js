import PropTypes from 'prop-types'
import React from 'react'

const Cards = ({ cards }) => {

  return (
    <table className="ui celled compact unstackable table">
      <thead>
        <tr>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        { cards.map((card, index) => (
          <tr key={`card_${index}`}>
            <td>{ card.description } </td>
          </tr>
        )) }
      </tbody>
    </table>
  )

}

Cards.propTypes = {
  cards: PropTypes.array
}

export default Cards
