import Section from '../components/section'
import React from 'react'

function Page({ config }) {
  return (
    <div className="maha-page">
      { config.sections.map((section, index) => (
        <Section config={ section } key={`block_${index}`} />
      )) }
    </div>
  )
}

export default Page
