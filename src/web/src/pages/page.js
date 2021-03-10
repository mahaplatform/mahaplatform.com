import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'

const Page = ({ page, site }) => {
  const router = useRouter()
  return (
    <>
      <p>Site: {site.title}</p>
      <p>Page: {page.title}</p>
      <p>Permalink: { router.query.permalink }</p>
    </>
  )
}

Page.propTypes = {
  page: PropTypes.object,
  site: PropTypes.object
}

const fetchSite = (code) => {
  return code === 'abc' ? {
    id: 1,
    title: 'CCE Tompkins'
  } : {
    id: 2,
    title: 'CCE Ulster'
  }
}

const fetchPage = (code, permlink) => {
  return permlink === 'def' ? {
    id: 1,
    title: 'HomePage'
  } : {
    id: 2,
    title: 'LandingPage'
  }
}

export async function getServerSideProps({ query }) {
  const site = await fetchSite(query.code)
  const page = await fetchPage(query.code, query.permalink)
  return {
    props: {
      site,
      page
    }
  }
}

export default Page
