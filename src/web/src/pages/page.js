import Page from '../components/page'
import axios from 'axios'

const fetchWebsite = async (code) => {
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/websites/${code}`,
    method: 'get'
  })
  return result.data.data
}

const fetchPage = async (code, permalink) => {
  const result = await axios({
    url: `${process.env.WEB_HOST}/api/websites/${code}/${permalink}`,
    method: 'get'
  })
  return result.data.data
}

const fetchLayout = async () => {
  return {
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

export async function getServerSideProps({ query }) {
  console.log('page', query)
  const website = await fetchWebsite(query.code)
  const page = await fetchPage(query.code, query.permalink)
  const layout = await fetchLayout()
  return {
    props: {
      page,
      website,
      layout
    }
  }
}

export default Page
