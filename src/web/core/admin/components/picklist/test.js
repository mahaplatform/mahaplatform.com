import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Picklist from './picklist.js'

describe('./src/web/core/admin/components/picklist', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/picklist.js', () => {

    it('renders', async () => {

      const picklist = shallow(<Picklist />)

      expect(picklist.is('div.picklist')).to.be.true

    })

  })


})
