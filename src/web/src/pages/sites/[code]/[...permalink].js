import PropTypes from 'prop-types'
import React from 'react'

const Page = ({ page, site }) => {
  return <p>{site.title} : {page.title}</p>
}

Page.propTypes = {
  page: PropTypes.object,
  site: PropTypes.object
}

const fetchSite = (code) => {
  console.log('fetchSite', code)
  return {
    id: 1,
    title: 'CCE Tompkins'
  }
}

const fetchPage = (code, permlink) => {
  console.log('fetchPage', code, permlink)
  return {
    id: 1,
    title: 'HomePage'
  }
}

export async function getServerSideProps({ params }) {
  const site = await fetchSite(params.code)
  const page = await fetchPage(params.code, params.permalink.join('/'))
  return {
    props: {
      site,
      page
    }
  }
}

export default Page
