import PropTypes from 'prop-types'
import axios from 'axios'
import React from 'react'

const Form = ({ form }) => {
  return (
    <p>{ form.title }</p>
  )
}

Form.propTypes = {
  form: PropTypes.object
}

export async function getStaticPaths() {
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/forms/forms`,
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
    url: `${process.env.WEB_HOST}/api/forms/forms/${params.code}`,
    json: true
  })
  return {
    props: result.data.data
  }
}

export default Form
