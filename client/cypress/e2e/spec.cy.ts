import defaultObjects from '../fixtures/objects.json';

beforeEach(() => {
  cy.intercept({
    method: 'GET',
    url: '/models/category/*'
  }, (req) => {
    // Extract the category from the URL
    const category = req.url.split('/').pop();

    // Filter the fixture data based on the category
    const filteredData = defaultObjects.filter((object) => object.category === category);

    req.reply(filteredData); // Respond with the filtered data
  }).as('getCategory');
})

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

describe('Navigation button functionality', () => {

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

describe('Scene button functionality', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/wee');
  });

  it('should change the scene to "light" when "Light" button clicked', () => {
    cy.contains('button', 'Light').click();
    cy.get('.wee-view.light').should('exist');
  });

  it('should change the scene to "glass" when "Glass" button clicked', () => {
    cy.contains('button', 'Glass').click();
    cy.get('.wee-view.glass').should('exist');
  });

  it('should change the scene to "dark" when "Dark" button clicked', () => {
    cy.contains('button', 'Dark').click();
    cy.get('.wee-view.dark').should('exist');
  });

});

describe('Popover picker functionality', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/wee');
  });

  it('should open the popover when the picker is clicked', () => {
    cy.get('.swatch').click();
    cy.get('.popover').should('exist');
  });

  it('should close the popover when the user clicks outside', () => {
    cy.get('.swatch').click();
    cy.get('.popover').should('exist');
    cy.get('.details').click();
    cy.get('.popover').should('not.exist');
  });

});