import React, { Fragment } from 'react'
import fetchData from '../lib/fetch'
import PropTypes from 'prop-types'
import Error from 'next/error'
import Head from 'next/head'

const Form = ({ errorCode, form, program, team }) => {
  if (errorCode) return <Error statusCode={ errorCode } />
  return (
    <Fragment>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href={`${process.env.WEB_ASSET_CDN_HOST}/css/semantic.min.css`} rel="stylesheet" />
        <link href={`${process.env.WEB_ASSET_CDN_HOST}/css/font-awesome.min.css`} rel="stylesheet" />
        <title>{ form.title }</title>
        <link rel="apple-touch-icon" type="image/jpeg" sizes="180x180" href={`${process.env.WEB_HOST}/imagecache/fit=cover&w=180&h=180${program.logo || team.logo}`} />
        <link rel="shortcut icon" type="image/jpeg" sizes="180x180" href={`${process.env.WEB_HOST}/imagecache/fit=cover&w=180&h=180${program.logo || team.logo}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={ form.title } />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={ form.url } />
        { form.config.seo.description.length > 0 &&
          <meta property="og:description" content={ form.config.seo.description } />
        }
        { form.config.seo.image &&
          <Fragment>
            <meta property="og:image" content={`${process.env.WEB_HOST}/imagecache/fit=cover&w=1200&h=630&q=100${form.config.seo.image}`} />
            <meta property="og:secure_url" content={`${process.env.WEB_HOST}/imagecache/fit=cover&w=1200&h=630&q=100${form.config.seo.image}`} />
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
  errorCode: PropTypes.number,
  form: PropTypes.object,
  program: PropTypes.object,
  team: PropTypes.object
}

export async function getServerSideProps({ query }) {
  const res = await fetchData(`/api/forms/forms/${query.code}`)
  if(res.errorCode) {
    return {
      props: { errorCode: res.errorCode }
    }
  }
  return {
    props: res.data
  }
}

export default Form
