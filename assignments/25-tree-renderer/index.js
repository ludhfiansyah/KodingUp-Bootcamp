'use strict';

function renderTree(data, container) {
  const ul = document.createElement('ul');

  for (const key in data) {
    const li = document.createElement('li');
    li.textContent = key;

    const children = data[key];

    if (Object.keys(children).length > 0) {
      renderTree(children, li);
    }

    ul.append(li);
  }

  container.append(ul);
}

const curriculum = {
  Mathematics: {
    Algebra: {},
    Calculus: {
      Derivatives: {},
      Integrals: {},
    },
  },
  Physics: {
    Thermodynamics: {
      'Heat Transfer': {
        Convection: {},
        Radiation: {},
      },
    },
  },
};

const shopping = {
  Groceries: {
    Produce: {
      Apples: {},
      Bananas: {},
    },
    Dairy: {},
  },
};

const container = document.getElementById('root');

renderTree(shopping, container);
renderTree(curriculum, container);
