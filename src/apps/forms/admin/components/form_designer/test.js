import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import FormDesigner from './form_designer.js'

describe('src/apps/forms/admin/components/form_designer', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/form-designer.js', () => {

    it('renders', async () => {

      const form-designer = shallow(<FormDesigner />)

      expect(form-designer.is('div.form-designer')).to.be.true

    })

  })


})
