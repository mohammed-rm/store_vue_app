describe('Edit equipment using admin account', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')

        // create a test equipment
        cy.get('#myModal').should('be.visible').click()
        cy.get('#new-material-name').type('test_fake_phone')
        cy.get('#new-material-tel').type('0632895410')
        cy.get('#new-material-version').type('V1523')
        cy.get('#ref-select').select('apple')
        cy.get('#create-eq').click()

    })

    afterEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()
        cy.contains('tr', 'new_name')
            .invoke('index')
            .then((index) => {
                cy.get(`#delete_${index}`).should('be.visible').click()
            })
    })


    it('should change equipment properties', function () {
        // edit equipment
        cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        cy.contains('Edit').should('be.visible').click()

        // remove actual inputs
        cy.get('#input-field-name').clear()
        cy.get('#input-field-name').type("new_name")

        cy.get('#input-field-ref').clear()
        cy.get('#input-field-ref').type("AP100")

        cy.get('#input-field-version').clear()
        cy.get('#input-field-version').type("V2000")

        cy.get('#input-field-tel').clear()
        cy.get('#input-field-tel').type("0765894352")

        // update equipment properties
        cy.contains("Save").should("exist").click()

        // check the new changes
        cy.contains('Statut : Disponible').should('be.visible')
        cy.contains('Téléphone : new_name').should('be.visible')
        cy.contains('Référence : AP100').should('be.visible')
        cy.contains('Version : V2000').should('be.visible')
        cy.contains('N° Téléphone : +33 (0)765894352').should('be.visible')

        // delete test equipment
        /*cy.visit('http://localhost:8080')
        cy.contains('tr', 'new_namejkjkjk')
            .invoke('index')
            .then(async (index) => {
                await cy.get(`#delete_${index}`).should('be.visible').click()
            })*/
    })

    it('should not change equipment properties', function () {
        // connect as borrower

        cy.visit('http://localhost:8080')
        /*cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')*/

        // edit equipment
        //cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        //cy.contains('Edit').should('not.exist')
    })

})


/*describe('Edit equipment using borrower account', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')

        // create a test equipment
        cy.get('#myModal').should('be.visible').click()
        cy.get('#new-material-name').type('phone')
        cy.get('#new-material-tel').type('0757895436')
        cy.get('#new-material-version').type('V1523')
        cy.get('#ref-select').select('apple')
        cy.contains('Submit').should('be.visible').click()

    })

    it('should not change equipment properties', function () {
        // connect as borrower
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()
        //cy.url().should('include', '/')

        // edit equipment
        //cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        //cy.contains('Edit').should('not.exist')
    })

})*/
