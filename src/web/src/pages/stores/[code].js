import PropTypes from 'prop-types'
import axios from 'axios'
import React from 'react'

const Store = ({ store }) => {
  return (
    <p>{ store.title }</p>
  )
}

Store.propTypes = {
  store: PropTypes.object
}

export async function getStaticPaths() {
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/stores/stores`,
    json: true
  })
  return {
    paths: result.data.data.map(form => ({
      params: { code: form.code }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/stores/stores/${params.code}`,
    json: true
  })
  return {
    props: result.data.data
  }
}

export default Store
