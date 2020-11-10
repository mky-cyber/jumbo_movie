let fixtures = {}

beforeEach(() => {
	cy.visit('/')
})

describe('Test front page', () => {
	it('Should contain search bar', ()=> {
		cy.get("[data-cy=search]").should('be.visible')
	})

	it('Should contain the list', () => {
		cy.get("[data-cy=list]").should('be.visible')
	})
})

