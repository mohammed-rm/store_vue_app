describe("Manage users", () => {

    const number = Math.floor(Math.random() * 1000000)

    beforeEach(() => {
        cy.visit("http://localhost:8080/login")
        cy.get("#email1").type("admindev@gmail.com")
        cy.get("#password1").type("admindev")
        cy.get("#connection-button").click()
        cy.url().should("include", "/")
        cy.visit("http://localhost:8080/admin")
    })

    it("should create a new user : admin account", function () {
        cy.get("#myModal").should("be.visible").click()
        cy.get("#new-user-name").type(`TestUser_${number}`)
        cy.get("#new-user-forname").type(`Account_${number}`)
        cy.get("#new-user-matricule").type(`SE-${number}`)
        cy.get("#role-other").click()
        cy.get("#new-user-email").type(`testuseraccount${number}@gmail.com`)
        cy.get("#new-user-pw").type("testuseraccount")
        cy.contains("Submit").should("be.visible").click()

        cy.visit("http://localhost:8080/admin")
        cy.contains("tr > td", `TestUser_${number}`).should("be.visible")
        cy.contains("tr > td", `Account_${number}`).should("be.visible")
        cy.contains("tr > td", `testuseraccount${number}@gmail.com`).should("be.visible")

    });

    it("should display user's profile : admin account", function () {
        cy.contains("tr > td", `TestUser_${number}`).should("be.visible").click()
        cy.contains(`Nom : TestUser_${number}`).should("be.visible")
        cy.contains(`Prénom : Account_${number}`).should("be.visible")
        cy.contains(`Email : testuseraccount${number}@gmail.com`).should("be.visible")
        cy.contains(`Matricule : SE-${number}`).should("be.visible")
        cy.contains("Rôle : Emprunteur").should("be.visible")
    });

    it("should edit created user account : admin account", function () {
        cy.contains("tr > td", `TestUser_${number}`).should("be.visible").click()
        cy.contains("Edit").should("be.visible").click()
        cy.get("#input-field-name").clear().type("TestUserEdited")
        cy.get("#input-field-forname").clear().type("AccountEdited")
        cy.get("#input-field-matricule").clear().type("SE-654321")
        cy.contains("Save").should("be.visible").click()
        cy.wait(8000)
    });

    it("should delete user's profile : admin account", function () {
        cy.contains("tr", "TestUserEdited")
            .invoke("index")
            .then((index) => {
                cy.get(`#delete-user_${index}`).should("be.visible").click()
            })

        cy.contains("tr > td", `TestUserEdited`).should("not.exist")
    });

    it("should not be able to access admin page : borrower account", function () {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()
        cy.visit('http://localhost:8080/admin').should('not.exist')
    });
})


