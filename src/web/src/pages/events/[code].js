import PropTypes from 'prop-types'
import axios from 'axios'
import React from 'react'

const Event = ({ event }) => {
  return (
    <p>{ event.title }</p>
  )
}

Event.propTypes = {
  event: PropTypes.object
}

export async function getStaticPaths() {
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/events/events`,
    json: true
  })
  return {
    paths: result.data.data.map(event => ({
      params: { code: event.code }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/events/events/${params.code}`,
    json: true
  })
  return {
    props: result.data.data
  }
}

export default Event
