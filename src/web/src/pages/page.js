import PageComponent from '../components/page'
import fetchData from '../lib/fetch'
import PropTypes from 'prop-types'
import Error from 'next/error'
import React from 'react'

export default function Page({ errorCode, page, layout, website }) {
  if (errorCode) return <Error statusCode={ errorCode } />
  return <PageComponent page={ page } layout={ layout } website={ website } />
}

Page.propTypes = {
  errorCode: PropTypes.string,
  page: PropTypes.object,
  layout: PropTypes.object,
  website: PropTypes.object
}

const fetchLayout = async () => {
  return {
    errorCode: false,
    data: {
      id: 1,
      title: 'Basic Page',
      config: {
        sections: [
          {
            styles: {
              background: {
                background: {
                  type: 'color',
                  color: 'red'
                }
              }
            },
            content: {
              rows: [
                {
                  content: {
                    layout: [1],
                    columns: [
                      {
                        content: {
                          blocks: [
                            {
                              type: 'text',
                              content: {
                                text: 'foo'
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            type: 'content'
          },{
            styles: {
              background: {
                background: {
                  type: 'color',
                  color: 'red'
                }
              }
            },
            content: {
              rows: [
                {
                  content: {
                    layout: [1],
                    columns: [
                      {
                        content: {
                          blocks: [
                            {
                              type: 'text',
                              content: {
                                text: 'foo'
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }
}

function getPageEndpoint(website, query) {
  console.log(website)
  const { code, id, permalink } = query
  if(query.permalink) return `/api/websites/${code}/${permalink}`
  if(query.permalink) return `/api/websites/${code}/pages/${id}`
  if(website.home_id)  return `/api/websites/${code}/pages/${website.home_id}`
}

export async function getServerSideProps({ query }) {
  const website = await fetchData(`/api/websites/${query.code}`)
  if(website.errorCode) {
    return {
      props: { errorCode: website.errorCode }
    }
  }
  const endpoint = getPageEndpoint(website.data, query)
  const page = await fetchData(endpoint)
  if(page.errorCode) {
    return {
      props: { errorCode: page.errorCode }
    }
  }
  const layout = await fetchLayout()
  if(layout.errorCode) {
    return {
      props: { errorCode: layout.errorCode }
    }
  }
  return {
    props: {
      page: page.data,
      layout: layout.data,
      website: website.data
    }
  }
}
