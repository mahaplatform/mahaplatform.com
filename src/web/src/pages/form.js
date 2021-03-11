import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import axios from 'axios'

const Form = ({ cdn_host, host, form, program, team }) => {
  return (
    <Fragment>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href={`${cdn_host}/css/semantic.min.css`} rel="stylesheet" />
        <link href={`${cdn_host}/css/font-awesome.min.css`} rel="stylesheet" />
        <title>{ form.title }</title>
        <link rel="apple-touch-icon" type="image/jpeg" sizes="180x180" href={`${host}/imagecache/fit=cover&w=180&h=180${program.logo || team.logo}`} />
        <link rel="shortcut icon" type="image/jpeg" sizes="180x180" href={`${host}/imagecache/fit=cover&w=180&h=180${program.logo || team.logo}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={ form.title } />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={ form.url } />
        { form.config.seo.description.length > 0 &&
          <meta property="og:description" content={ form.config.seo.description } />
        }
        { form.config.seo.image &&
          <Fragment>
            <meta property="og:image" content={`${host}/imagecache/fit=cover&w=1200&h=630&q=100${form.config.seo.image}`} />
            <meta property="og:secure_url" content={`${host}/imagecache/fit=cover&w=1200&h=630&q=100${form.config.seo.image}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </Fragment>
        }
      </Head>
      <p>{ form.title }</p>
    </Fragment>
  )
}

Form.propTypes = {
  cdn_host: PropTypes.string,
  host: PropTypes.string,
  form: PropTypes.object,
  program: PropTypes.object,
  team: PropTypes.object
}

export async function getServerSideProps({ query }) {
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/forms/forms/${query.code}`,
    json: true
  })
  return {
    props: {
      cdn_host: process.env.WEB_ASSET_CDN_HOST,
      web_host: process.env.WEB_HOST,
      ...result.data.data
    }
  }
}

export default Form
