import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Assignmentfield from './assignmentfield.js'

describe('./src/web/core/admin/components/form/assignmentfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/assignmentfield.js', () => {

    it('renders', async () => {

      const assignmentfield = shallow(<Assignmentfield />)

      expect(assignmentfield.is('div.assignmentfield')).to.be.true

    })

  })


})
