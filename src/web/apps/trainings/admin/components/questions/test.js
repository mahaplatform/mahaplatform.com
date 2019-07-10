import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Questions from './questions.js'

describe('./src/web/apps/trainings/admin/components/questions', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/questions.js', () => {

    it('renders', async () => {

      const questions = shallow(<Questions />)

      expect(questions.is('div.questions')).to.be.true

    })

  })


})
