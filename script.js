const app = document.getElementById('app');

const structure = {
  type: {
    label: 'Type',
    children: {
      'Product': {
        label: 'Product',
        groups: {
          'Shampoo/Conditioner': [
            'Sulfate-free shampoo',
            'Hair mask/deep conditioner',
            'Clarifying & Detox Shampoo',
            'Hydrating Shampoo',
            'Rinse-out conditioner',
            'Leave-in conditioner',
            'Curl friendly shampoo and conditioner bars'
          ],
          'Styling Products': [
            'Mousse',
            'Curl Cream',
            'Leave-in conditioner',
            'Curl cream recipe',
            'Hair gel',
            'Flaxseed hair gel recipe',
            'Heat protectant',
            'Hair Oil'
          ]
        }
      },
      'Tools': {
        label: 'Tools',
        groups: {
          'Styling': [
            'Curl defining brush',
            'detangling comb',
            'Continuous spray bottle for water',
            'Diffuser',
            'Claw clip'
          ],
          'Protecting': [
            'Satin scrunchie',
            'Silk bonnet',
            'Silk pillowcase',
            'Microfiber hair towel',
            'Towel bonnet',
            'Cotton t-shirt'
          ]
        }
      },
      'Education': {
        label: 'Education',
        groups: {
          'Instructions': [
            'Flaxseed hair gel recipe',
            'Curl cream recipe',
            '"Plopping" instructions',
            'How to use a diffuser',
            'How to scrunch curls',
            'Finger styling instructions',
            'Detangling instructions',
            '"Squish to condish" method',
            'Deep conditioning guide',
            'Tips for refreshing curls',
            'Tips for curly hair cuts',
            'Chart of curl patterns'
          ],
          'Science': [
            'Explanation of curly hair science',
            'Chart of curl patterns',
            'How your hair holds moisture',
            'Guidance for scalp health',
            'Common mistakes and myths'
          ],
          'Influencers': [
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)'
          ]
        }
      }
    }
  },
  routine: {
    label: 'Routine',
    children: {
      'Washing': {
        label: 'Washing',
        groups: {
          'Washing': [
            'Clarifying & Detox Shampoo',
            'Sulfate-free shampoo',
            'Hydrating Shampoo',
            'Rinse-out conditioner',
            'Hair mask / Deep conditioner',
            'Leave-in conditioner',
            '"Squish to condish" method',
            'Deep conditioning guide',
            'Guidance for scalp health',
            'How your hair holds moisture',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'detangling comb',
            'Detangling instructions'
          ]
        }
      },
      'Drying': {
        label: 'Drying',
        groups: {
          'Drying': [
            'Micro-fiber hair towel',
            '"Plopping" instructions',
            'Cotton t-shirt',
            'Towel Bonnet',
            'Heat protectant',
            'Diffuser',
            'How to use a diffuser',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'Chart of curl patterns'
          ]
        }
      },
      'Styling': {
        label: 'Styling',
        groups: {
          'Styling': [
            'Curl defining brush',
            'Finger styling instructions',
            'Curl cream',
            'Mousse',
            'Hair oil',
            'Hair gel',
            'Homemade flax-seed hair gel recipe',
            'How to scrunch curls',
            'Satin scrunchies',
            'Claw clip',
            'Tips for curly hair cuts',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)'
          ]
        }
      },
      'Sleeping': {
        label: 'Sleeping',
        groups: {
          'Sleeping': [
            'Silk pillowcase',
            'Silk bonnet',
            'Satin scrunchies',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'Chart of curl patterns'
          ]
        }
      },
      'Touch up': {
        label: 'Touch up',
        groups: {
          'Touch up': [
            'Tips for refreshing curls',
            'Continuous spray bottle for water',
            'Hair oil',
            'Satin scrunchies',
            'Tips for curly hair cuts',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)'
          ]
        }
      }
    }
  }
};

const curlePatterns = ['1A', '2A', '3A', '4A', '1B', '2B', '3B', '4B', '1C', '2C', '3C', '4C'];

const canonicalTargetMap = {
  'flax seed hair gel recipe': 'Homemade flax-seed hair gel recipe',
  'homemade flax-seed hair gel recipe': 'Homemade flax-seed hair gel recipe',
  'flaxseed hair gel recipe': 'Homemade flax-seed hair gel recipe',
  '"plopping" instructions': '"Plopping" instructions',
  'plopping instructions': '"Plopping" instructions',
  'leave in conditioner': 'Leave-in conditioner',
  'tips for curly cuts': 'Tips for curly hair cuts',
  'chart of curl patterns': 'Chart of curl patterns',
  'curl defining brush': 'Curl defining brush',
  'influencer with curly hair': 'Influencer with curly hair (personal experience)',
  'explanation of hair porosity': 'How your hair holds moisture',
  'how your hair holds moisture': 'How your hair holds moisture',
  'diffuser': 'Diffuser',
  'micro-fiber hair towel': 'Micro-fiber hair towel',
  'microfiber hair towel': 'Micro-fiber hair towel',
  'hair mask / deep conditioner': 'Hair mask / Deep conditioner',
  'hair mask/deep conditioner': 'Hair mask / Deep conditioner',
  'towel bonnet': 'Towel Bonnet',
  'homemade flaxseed hair gel recipe': 'Homemade flax-seed hair gel recipe'
};

const state = {
  currentView: 'home',
  navigationStack: [],
  currentCategory: null,
  currentRoutine: null,
  currentItem: null,
  searchQuery: ''
};

function renderNavigation() {
  const navHtml = `
    <div class="mode-controls">
      <div class="quick-browse-label">* quick browse *</div>
      <div class="nav-category-group">
        <div class="nav-category">
          <button class="mode-toggle" data-category="products">products</button>
          <div class="dropdown-menu" id="products-dropdown">
            <div class="dropdown-item" data-category="Product" data-group="Shampoo/Conditioner">Shampoo/Conditioner</div>
            <div class="dropdown-item" data-category="Product" data-group="Styling Products">Styling Products</div>
          </div>
        </div>
        <div class="nav-category">
          <button class="mode-toggle" data-category="tools">tools</button>
          <div class="dropdown-menu" id="tools-dropdown">
            <div class="dropdown-item" data-category="Tools" data-group="Styling">Styling</div>
            <div class="dropdown-item" data-category="Tools" data-group="Protecting">Protecting</div>
          </div>
        </div>
        <div class="nav-category">
          <button class="mode-toggle" data-category="education">education</button>
          <div class="dropdown-menu" id="education-dropdown">
            <div class="dropdown-item" data-category="Education" data-group="Instructions">Instructions</div>
            <div class="dropdown-item" data-category="Education" data-group="Science">Science</div>
            <div class="dropdown-item" data-category="Education" data-group="Influencers">Influencers</div>
          </div>
        </div>
      </div>
      <div class="search-container">
        <input type="text" class="search-bar" id="search-input" placeholder="search" />
        <span class="search-icon">🔍</span>
      </div>
    </div>
  `;
  
  return navHtml;
}

function renderHome() {
  const routinesHtml = Object.keys(structure.routine.children)
    .map(routine => `
      <div class="routine-card" data-routine="${routine}">
        ${routine}
      </div>
    `)
    .join('');

  const curlCardsHtml = curlePatterns
    .map(pattern => `
      <div class="curl-card" data-curl-pattern="${pattern}">
        ${pattern}
      </div>
    `)
    .join('');

  return `
    ${renderNavigation()}
    <p class="routine-label">* find help at every step of the routine *</p>
    <div class="routine-grid">
      ${routinesHtml}
    </div>
    <p class="curl-section-label">* get to know your unique curls *</p>
    <div class="item-grid">
      ${curlCardsHtml}
    </div>
  `;
}

function renderCategoryPage(category, group) {
  const categoryData = structure.type.children[category];
  if (!categoryData || !categoryData.groups[group]) {
    return renderHome();
  }

  const items = categoryData.groups[group];
  const itemsHtml = items
    .map(item => `
      <div class="item-card" data-item="${item}">
        ${item}
      </div>
    `)
    .join('');

  return `
    ${renderNavigation()}
    ${renderBreadcrumb(['home', category, group])}
    <h1 class="page-title">${group}</h1>
    <div class="item-grid">
      ${itemsHtml}
    </div>
  `;
}

function renderRoutinePage(routine) {
  const routineData = structure.routine.children[routine];
  if (!routineData) {
    return renderHome();
  }

  const items = routineData.groups[routine] || [];
  const itemsHtml = items
    .map(item => `
      <div class="item-card" data-item="${item}">
        ${item}
      </div>
    `)
    .join('');

  return `
    ${renderNavigation()}
    ${renderBreadcrumb(['home', routine])}
    <h1 class="page-title">${routine}</h1>
    <div class="item-grid">
      ${itemsHtml}
    </div>
  `;
}

function renderDetailPage(itemName) {
  return `
    ${renderNavigation()}
    ${renderBreadcrumb(['home', itemName])}
    <h1 class="page-title">${itemName}</h1>
    <div class="detail-box">
      <p style="margin: 0; color: #532618; font-size: 18px;">
        This page displays detailed information about ${itemName}.
      </p>
    </div>
  `;
}

function renderBreadcrumb(path) {
  const breadcrumbItems = path.map((item, index) => {
    if (index === 0) {
      return `<a class="breadcrumb-link" href="#" data-breadcrumb="home">home</a>`;
    }
    return `<a class="breadcrumb-link" href="#" data-breadcrumb="${item}">${item.toLowerCase()}</a>`;
  }).join('<span class="breadcrumb-separator"> / </span>');

  return `<div class="breadcrumb">${breadcrumbItems}</div>`;
}

function render() {
  let content = '';

  if (state.currentView === 'home') {
    content = renderHome();
  } else if (state.currentView === 'category') {
    content = renderCategoryPage(state.currentCategory, state.currentGroup);
  } else if (state.currentView === 'routine') {
    content = renderRoutinePage(state.currentRoutine);
  } else if (state.currentView === 'detail') {
    content = renderDetailPage(state.currentItem);
  }

  app.innerHTML = content;
  attachEventListeners();
}

function attachEventListeners() {
  // Navigation category buttons
  document.querySelectorAll('[data-category="products"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dropdown = document.getElementById('products-dropdown');
      dropdown.classList.toggle('active');
    });
  });

  document.querySelectorAll('[data-category="tools"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dropdown = document.getElementById('tools-dropdown');
      dropdown.classList.toggle('active');
    });
  });

  document.querySelectorAll('[data-category="education"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dropdown = document.getElementById('education-dropdown');
      dropdown.classList.toggle('active');
    });
  });

  // Dropdown items
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      const group = item.dataset.group;
      state.currentView = 'category';
      state.currentCategory = category;
      state.currentGroup = group;
      render();
    });
  });

  // Routine cards
  document.querySelectorAll('.routine-card').forEach(card => {
    card.addEventListener('click', () => {
      const routine = card.dataset.routine;
      state.currentView = 'routine';
      state.currentRoutine = routine;
      render();
    });
  });

  // Item cards
  document.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = card.dataset.item;
      state.currentView = 'detail';
      state.currentItem = item;
      render();
    });
  });

  // Curl pattern cards
  document.querySelectorAll('.curl-card').forEach(card => {
    card.addEventListener('click', () => {
      const pattern = card.dataset.curlPattern;
      state.currentView = 'detail';
      state.currentItem = pattern;
      render();
    });
  });

  // Breadcrumb links
  document.querySelectorAll('.breadcrumb-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.breadcrumb;
      if (target === 'home') {
        state.currentView = 'home';
      }
      render();
    });
  });

  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      state.searchQuery = query;
      // TODO: Implement search filtering
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-category]') && !e.target.closest('.dropdown-menu')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
      });
    }
  });
}

// Initialize
render();
