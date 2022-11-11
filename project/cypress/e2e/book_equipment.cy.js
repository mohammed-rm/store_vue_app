describe('Manage equipments', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')

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

    afterEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')

        cy.contains('tr', 'test_fake_phone')
            .invoke('index')
            .then((index) => {
                cy.get(`#delete_${index}`).should('be.visible').click()
            })
    });

    it('should be able to book equipment : admin account', function () {
        cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        cy.contains('Réserver maintenant').should('be.visible').click()
        cy.get('td').contains(14).should('be.visible').click()
        cy.get('td').contains(20).should('be.visible').click()
        cy.contains('Valider').should('be.visible').click()

        for (let i = 14; i <= 20; i++) {
            cy.get('td').contains(i).should('be.disabled')
        }
    });

    it('should not be able to book equipment : borrower account', function () {
        // login with borrower account
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()

        cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        cy.contains('Réserver maintenant').should('be.visible').click()
        cy.get('td').contains(21).should('be.visible').click()
        cy.get('td').contains(27).should('be.visible').click()
        cy.contains('Valider').should('be.visible').click()

        for (let i = 21; i <= 27; i++) {
            cy.get('td').contains(i).should('be.disabled')
        }
    });

})
