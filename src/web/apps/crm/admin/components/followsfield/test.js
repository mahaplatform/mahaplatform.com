import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Sharesfield from './sharesfield.js'

describe('./src/web/apps/crm/admin/components/sharesfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/sharesfield.js', () => {

    it('renders', async () => {

      const sharesfield = shallow(<Sharesfield />)

      expect(sharesfield.is('div.sharesfield')).to.be.true

    })

  })


})
