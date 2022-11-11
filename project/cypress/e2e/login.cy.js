describe('Login page with different credentials', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
    })

    it('should have all required elements displayed', () => {
        cy.get('#email1').should('be.visible')
        cy.get('#password1').should('be.visible')
        cy.get('#connection-button').should('be.visible')
    })

    it('should log in with valid credentials, and connect user as an admin', () => {
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()

        cy.url().should('include', '/')
        cy.get('#connection-button').should('not.exist')
        cy.contains('Log Out').should('be.visible')
        cy.contains('#nav-list', 'Administration').should('exist')
    })

    it('should log in with valid credentials, and connect user as a borrower with restricted rights', () => {
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()

        cy.url().should('include', '/')
        cy.get('#connection-button').should('not.exist')
        cy.contains('Log Out').should('be.visible')
        cy.contains('#nav-list', 'Administration').should('not.exist')
    })

    it('should not log in with invalid credentials', () => {
        cy.get('#email1').type('invalid@gmail.com')
        cy.get('#password1').type('invalid')
        cy.get('#connection-button').click()

        cy.url().should('include', '/login')
        cy.get('#connection-button').should('be.visible')
    })
})
