import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Linkfield from './linkfield.js'

describe('src/web/admin/components/form/linkfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/linkfield.js', () => {

    it('renders', async () => {

      const linkfield = shallow(<Linkfield />)

      expect(linkfield.is('div.linkfield')).to.be.true

    })

  })


})
