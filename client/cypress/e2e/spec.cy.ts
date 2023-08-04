describe('Render routes', () => {

  it('should render the root route', () => {

    cy.visit('http://localhost:5173');
    cy.contains('wee three');
  })

  it('should render the /wee route', () => {

    cy.visit('http://localhost:5173/wee');
    cy.get('.wee-view').should('exist');
  })

});

describe('Load components', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/wee');
  });

  it('should load the wee-view component', () => {
    cy.get('.wee-view').should('exist');
  });

  it('should load the object-info component', () => {
    cy.get('.object-info').should('exist');
  });

  it('should load the popover picker component', () => {
    cy.get('.picker').should('exist');
  });
});

describe('Button functionality', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/wee');
  });

  it('should change the model when nav prev button is clicked', () => {
    cy.get('.object-info .details h3')
      .invoke('text')
      .as('originalText')
      .then(originalText => {
        cy.get('.nav-prev').click();
        cy.get('.object-info .details h3')
          .invoke('text')
          .should('not.eq', originalText);
      });
  });

  it('should change the model when nav next button is clicked', () => {
    cy.get('.object-info .details h3')
      .invoke('text')
      .as('originalText')
      .then(originalText => {
        cy.get('.nav-next').click();
        cy.get('.object-info .details h3')
          .invoke('text')
          .should('not.eq', originalText);
      });
  });

})

// test button click functionality
  // it('should load the navigation buttons', () => {
  //   cy.get('.nav-prev').should('exist');
  //   cy.get('.nav-next').should('exist');
  // })