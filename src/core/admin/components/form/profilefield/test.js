import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Profilefield from './profilefield.js'

describe('src/apps/crm/admin/components/profilefield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/profilefield.js', () => {

    it('renders', async () => {

      const profilefield = shallow(<Profilefield />)

      expect(profilefield.is('div.profilefield')).to.be.true

    })

  })


})
