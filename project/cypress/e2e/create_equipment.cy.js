describe('Create a new equipment using admin account', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')
    })

    afterEach(() => {
        cy.contains('tr', 'test_fake_phone')
            .invoke('index')
            .then((index) => {
                cy.get(`#delete_${index}`).should('be.visible').click()
            })
    })

    it('should add a new equipment', function () {
        cy.get('#myModal').should('be.visible').click()
        cy.get('#new-material-name').type('test_fake_phone')
        cy.get('#new-material-tel').type('0632895410')
        cy.get('#new-material-version').type('V1523')
        cy.get('#ref-select').select('apple')
        cy.get('#create-eq').click()

        cy.get('#eq-list').contains('test_fake_phone')
        cy.get('#eq-list').contains('+33(0) 632895410')
        cy.get('#eq-list').contains('V1523')
        cy.get('#eq-list').contains('Pas d\'image.')
    })
})

describe('Attempt to create a new equipment using borrower account', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')
    })

    it('should not add a new equipment', function () {
        cy.get('#myModal').should('not.exist')

    })
})

