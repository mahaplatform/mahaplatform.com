import Section from '../components/section'
import React from 'react'

function Page({ config }) {
  return (
    <>
      { config.sections.map((section, index) => (
        <Section config={ section } key={`block_${index}`} />
      )) }
    </>
  )
}

export default Page
