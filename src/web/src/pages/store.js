import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import axios from 'axios'

const Store = ({ cdn_host, host, store, program, team }) => {
  return (
    <Fragment>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href={`${cdn_host}/css/semantic.min.css`} rel="stylesheet" />
        <link href={`${cdn_host}/css/font-awesome.min.css`} rel="stylesheet" />
        <title>{ store.title }</title>
        <link rel="apple-touch-icon" type="image/jpeg" sizes="180x180" href={`${host}/imagecache/fit=cover&w=180&h=180${program.logo || team.logo}`} />
        <link rel="shortcut icon" type="image/jpeg" sizes="180x180" href={`${host}/imagecache/fit=cover&w=180&h=180${program.logo || team.logo}`} />
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
  cdn_host: PropTypes.string,
  host: PropTypes.string,
  store: PropTypes.object,
  program: PropTypes.object,
  team: PropTypes.object
}

export async function getServerSideProps({ query }) {
  console.log('story', query)
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/stores/stores/${query.code}`,
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

export default Store
