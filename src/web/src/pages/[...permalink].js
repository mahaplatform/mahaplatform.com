import { useRouter } from 'next/router'
import React from 'react'

const Pages = () => {
  const router = useRouter()
  const { permalink } = router.query

  return <p>Post: {permalink}</p>
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { permalink: ['forms','forms','abc'] } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      a: 1,
      b: 2
    }
  }
}
export default Pages
