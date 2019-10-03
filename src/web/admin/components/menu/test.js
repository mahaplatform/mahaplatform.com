import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Menu from './menu.js'

describe('./src/web/core/admin/components/menu', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/menu.js', () => {

    it('renders', async () => {

      const menu = shallow(<Menu />)

      expect(menu.is('div.menu')).to.be.true

    })

  })


})
