import { TeamToken, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Teams = ({ teams }) => {

  const items = teams.map((team, index) => ({
    component: <TeamToken { ...team } />
  }))

  return <List items={ items } />

}

Teams.propTypes = {
  teams: PropTypes.array
}

export default Teams
