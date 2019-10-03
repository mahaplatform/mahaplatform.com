import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Overview from './overview.js'

describe('src/web/core/admin/components/criteria/overview', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/overview.js', () => {

    it('renders', async () => {

      const overview = shallow(<Overview />)

      expect(overview.is('div.overview')).to.be.true

    })

  })


})
