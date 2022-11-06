describe('Login page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
    })

    it('should have all required elements displayed', () => {
        cy.get('#email1').should('be.visible')
        cy.get('#password1').should('be.visible')
        cy.get('#connection-button').should('be.visible')
    })

    it('should log in with valid credentials', () => {
        cy.get('#email1').type('junior@gmail.com')
        cy.get('#password1').type('junior')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')
    })

    it('should not log in with invalid credentials', () => {
        cy.get('#email1').type('invalid@gmail.com')
        cy.get('#password1').type('invalid')
        cy.get('#connection-button').click()
        cy.url().should('include', '/login')
    })
})
