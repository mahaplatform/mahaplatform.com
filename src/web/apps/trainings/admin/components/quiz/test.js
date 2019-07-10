import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Quiz from './quiz.js'

describe('./src/web/apps/trainings/admin/components/quiz', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/quiz.js', () => {

    it('renders', async () => {

      const quiz = shallow(<Quiz />)

      expect(quiz.is('div.quiz')).to.be.true

    })

  })


})
