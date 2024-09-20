describe("Login", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/")
  })
  it("Should try to log in with all users", () => {
    cy.fixture("login-data.json").then((loginData) => {
      loginData.users.forEach((user) => {
        cy.get("#user-name").type(user.username)
        cy.get("#password").type(user.password, { log: false })
        cy.get("#login-button").click()
        if (user.username === "standard_user") {
          cy.url().should("include", "/inventory.html")
          cy.get(".bm-burger-button").click()
          cy.get("#logout_sidebar_link").click()
        } else {
          cy.get(".error")
            .should("have.length", 3)
            .then((errorMessage) => {
              cy.wrap(errorMessage)
                .last()
                .invoke("text")
                .should("be.oneOf", [
                  "Epic sadface: Sorry, this user has been locked out.",
                  "Epic sadface: Username and password do not match any user in this service",
                ])
            })
        }
      })
    })
  })
})