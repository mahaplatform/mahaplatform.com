import React, { Fragment } from 'react'
import fetchData from '../lib/fetch'
import PropTypes from 'prop-types'
import Error from 'next/error'
import Head from 'next/head'

const Store = ({ errorCode, store, program, team }) => {
  if (errorCode) return <Error statusCode={ errorCode } />
  return (
    <Fragment>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href={`${process.env.ASSET_CDN_HOST}/css/semantic.min.css`} rel="stylesheet" />
        <link href={`${process.env.ASSET_CDN_HOST}/css/font-awesome.min.css`} rel="stylesheet" />
        <title>{ store.title }</title>
        <link rel="apple-touch-icon" type="image/jpeg" sizes="180x180" href={`${process.env.ADMIN_HOST}/imagecache/fit=cover&w=180&h=180${program.logo || team.logo}`} />
        <link rel="shortcut icon" type="image/jpeg" sizes="180x180" href={`${process.env.ADMIN_HOST}/imagecache/fit=cover&w=180&h=180${program.logo || team.logo}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={ store.title } />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={ store.url } />
      </Head>
      <p>{ store.title }</p>
    </Fragment>
  )
}

Store.propTypes = {
  errorCode: PropTypes.number,
  store: PropTypes.object,
  program: PropTypes.object,
  team: PropTypes.object
}

export async function getServerSideProps({ query }) {
  const res = await fetchData(`/api/stores/stores/${query.code}`)
  if(res.errorCode) {
    return {
      props: { errorCode: res.errorCode }
    }
  }
  return {
    props: res.data
  }
}

export default Store
