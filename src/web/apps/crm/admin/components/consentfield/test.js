import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Consentfield from './consentfield.js'

describe('./src/web/apps/crm/admin/components/consentfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/consentfield.js', () => {

    it('renders', async () => {

      const consentfield = shallow(<Consentfield />)

      expect(consentfield.is('div.consentfield')).to.be.true

    })

  })


})
