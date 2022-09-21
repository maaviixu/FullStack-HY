import { checkPropTypes } from "prop-types"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tauno Testaaja',
      username: 'ttauno',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ttauno')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Tauno Testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ttauno')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Tauno Testaaja logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ttauno', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Taunon testit')
      cy.get('#author-input').type('Testaava Tauno')
      cy.get('#url-input').type('www.taunontestit.fi')
      cy.get('#create-blog-button').click()
      cy.contains('a new blog Taunon testit by Testaava Tauno is added')
    })

    describe('and some blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Taunon blogi', author: 'Tauno', url:'www.taunonsivut.fi', likes: '0' })
        cy.createBlog({ title: 'Yrjön blogi', author: 'Yrjö', url:'www.yrjönnsivut.fi', likes: '0'  })
        cy.createBlog({ title: 'Jorman blogi', author: 'Jorma', url:'www.jormansivut.fi', likes: '0' })
      })

      it('likes can be added', function () {
        cy.contains('Jorman blogi').parent().as('jorma')
        cy.get('@jorma').find('button').contains('view').click()
        cy.get('@jorma').find('button').contains('like').click()
        cy.get('@jorma').find('span').contains('1')
      })

      it('blog can be removed', function () {
        cy.contains('Jorman blogi').parent().as('jorma')
        cy.get('@jorma').find('button').contains('view').click()
        cy.get('@jorma').find('button').contains('remove').click()
        cy.get('html').should('not.contain', 'Jorman blogi')
      })

      it('blogs are ordered by likes', function() {
        cy.contains('Jorman blogi').parent().as('jorma')
        cy.get('@jorma').find('button').contains('view').click()
        cy.get('@jorma').find('button').contains('like').click()
        cy.get('@jorma').find('button').contains('hide').click()
        cy.get('.blog').eq(0).should('contain', 'Jorman blogi')
      })
    })
  })
})