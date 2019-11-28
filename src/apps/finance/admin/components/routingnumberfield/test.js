import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Routingnumberfield from './routingnumberfield.js'

describe('src/apps/finance/admin/components/routingnumberfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/routingnumberfield.js', () => {

    it('renders', async () => {

      const routingnumberfield = shallow(<Routingnumberfield />)

      expect(routingnumberfield.is('div.routingnumberfield')).to.be.true

    })

  })


})
