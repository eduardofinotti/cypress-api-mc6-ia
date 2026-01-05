
Cypress.Commands.add('criarAgendamento', (payload, options = {}) => {
	return cy.request({
		method: 'POST',
		url: '/booking',
		headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
		body: payload,
		...options,
	});
});