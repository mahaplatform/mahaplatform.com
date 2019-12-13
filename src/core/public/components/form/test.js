import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Form from './form.js'

describe('src/core/public/components/form', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/form.js', () => {

    it('renders', async () => {

      const form = shallow(<Form />)

      expect(form.is('div.form')).to.be.true

    })

  })


})
