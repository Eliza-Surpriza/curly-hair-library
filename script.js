const app = document.getElementById('app');

const structure = {
  type: {
    label: 'Type',
    children: {
      'Product': {
        label: 'Product',
        groups: {
          'Shampoo/Conditioner': [
            'Clarifying & Detox Shampoo',
            'Sulfate-free shampoo',
            'Hydrating Shampoo',
            'Rinse-out conditioner',
            'Hair mask/deep conditioner',
            'Leave-in conditioner',
            'Curl friendly shampoo and conditioner bars'
          ],
          'Styling Products': [
            'Mousse',
            'Curl Cream',
            'Hair Oil',
            'Leave-in conditioner',
            'Hair gel',
            'Flaxseed hair gel recipe',
            'Curl cream recipe',
            'Heat protectant'
          ]
        }
      },
      'Tools': {
        label: 'Tools',
        groups: {
          'Styling': [
            'Diffuser',
            'Curl defining brush',
            'Continuous spray bottle for water',
            'detangling comb',
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
            '“Plopping” instructions',
            'How to use a diffuser',
            'How to scrunch curls',
            'Finger styling instructions',
            'Tips for curly hair cuts',
            'Detangling instructions',
            '“Squish to condish” method',
            'Deep conditioning guide',
            'Tips for refreshing curls'
          ],
          'Science': [
            'Explanation of curly hair science',
            'Chart of curl patterns',
            'Explanation of hair porosity',
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
            'Hair mask/deep conditioner',
            'Leave-in conditioner',
            'Guidance for scalp health',
            'Explanation of hair porosity',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'detangling comb',
            'Detangling instructions',
            '“Squish to condish” method',
            'Deep conditioning guide'
          ]
        }
      },
      'Drying': {
        label: 'Drying',
        groups: {
          'Drying': [
            'Microfiber hair towel',
            'Heat protectant',
            'Diffuser',
            'Towel bonnet',
            '“Plopping” instructions',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'How to use a diffuser',
            'Cotton t-shirt'
          ]
        }
      },
      'Styling': {
        label: 'Styling',
        groups: {
          'Styling': [
            'Curl Cream',
            'Mousse',
            'Hair Oil',
            'Hair gel',
            'Flaxseed hair gel recipe',
            'Satin scrunchie',
            'Curl defining brush',
            'Tips for curly hair cuts',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'Finger styling instructions',
            'How to scrunch curls',
            'Claw clip'
          ]
        }
      },
      'Sleeping': {
        label: 'Sleeping',
        groups: {
          'Sleeping': [
            'Silk pillowcase',
            'Silk bonnet',
            'Satin scrunchie',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)'
          ]
        }
      },
      'Touch up': {
        label: 'Touch up',
        groups: {
          'Touch up': [
            'Hair Oil',
            'Satin scrunchie',
            'Continuous spray bottle for water',
            'Tips for curly hair cuts',
            'Chart of curl patterns',
            'Curly hair stylist influencer (professional experience)',
            'Influencer with curly hair (personal experience)',
            'Tips for refreshing curls'
          ]
        }
      }
    }
  }
};

const defaultTaskDefinitions = [
  { id: 1, prompt: 'Find Clarifying & Detox Shampoo.', target: 'Clarifying & Detox Shampoo', expectedFirstClick: '', viewKey: 'type', selectedKey: 'Product', groupName: 'Shampoo/Conditioner' },
  { id: 2, prompt: 'Find Mousse.', target: 'Mousse', expectedFirstClick: '', viewKey: 'type', selectedKey: 'Product', groupName: 'Styling Products' },
  { id: 3, prompt: 'Find Diffuser.', target: 'Diffuser', expectedFirstClick: '', viewKey: 'type', selectedKey: 'Tools', groupName: 'Styling' },
  { id: 4, prompt: 'Find Silk pillowcase.', target: 'Silk pillowcase', expectedFirstClick: '', viewKey: 'type', selectedKey: 'Tools', groupName: 'Protecting' },
  { id: 5, prompt: 'Find “Plopping” instructions.', target: '“Plopping” instructions', expectedFirstClick: '', viewKey: 'type', selectedKey: 'Education', groupName: 'Instructions' },
  { id: 6, prompt: 'Find Guidance for scalp health.', target: 'Guidance for scalp health', expectedFirstClick: '', viewKey: 'type', selectedKey: 'Education', groupName: 'Science' },
  { id: 7, prompt: 'Find the curly hair stylist influencer (professional experience).', target: 'Curly hair stylist influencer (professional experience)', expectedFirstClick: '', viewKey: 'type', selectedKey: 'Education', groupName: 'Influencers' },
  { id: 8, prompt: 'Find Satin scrunchie in the styling routine.', target: 'Satin scrunchie', expectedFirstClick: '', viewKey: 'routine', selectedKey: 'Styling', groupName: 'Styling' },
  { id: 9, prompt: 'Find Microfiber hair towel in the drying routine.', target: 'Microfiber hair towel', expectedFirstClick: '', viewKey: 'routine', selectedKey: 'Drying', groupName: 'Drying' },
  { id: 10, prompt: 'Find Hair Oil in the touch-up routine.', target: 'Hair Oil', expectedFirstClick: '', viewKey: 'routine', selectedKey: 'Touch up', groupName: 'Touch up' }
];

const canonicalTargetMap = {
  'flax seed hair gel recipe': 'Flaxseed hair gel recipe',
  '"plopping" instructions': '“Plopping” instructions',
  'plopping instructions': '“Plopping” instructions',
  'leave in conditioner': 'Leave-in conditioner',
  'tips for curly cuts': 'Tips for curly hair cuts',
  'chart of curl patterns': 'Chart of curl patterns',
  'curl defining brush': 'Curl defining brush',
  'influencer with curly hair': 'Influencer with curly hair (personal experience)',
  'explanation of hair porosity': 'Explanation of hair porosity',
  'diffuser': 'Diffuser'
};

function shuffleArray(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function parseCsvRows(text) {
  const rows = [];
  let currentRow = [];
  let currentValue = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (char === '"') {
      if (inQuotes && text[index + 1] === '"') {
        currentValue += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[index + 1] === '\n') {
        index += 1;
      }
      currentRow.push(currentValue);
      if (currentRow.some((value) => value.trim() !== '')) {
        rows.push(currentRow.map((value) => value.trim()));
      }
      currentRow = [];
      currentValue = '';
      continue;
    }

    currentValue += char;
  }

  if (currentValue.length || currentRow.length) {
    currentRow.push(currentValue);
    if (currentRow.some((value) => value.trim() !== '')) {
      rows.push(currentRow.map((value) => value.trim()));
    }
  }

  return rows;
}

let baseTaskDefinitions = [...defaultTaskDefinitions];
let taskDefinitions = shuffleArray(baseTaskDefinitions);

async function loadTaskDefinitions() {
  try {
    const response = await fetch('./tree sort tasks - Sheet1.csv');
    if (!response.ok) {
      taskDefinitions = shuffleArray(defaultTaskDefinitions);
      return;
    }

    const text = await response.text();
    const rows = parseCsvRows(text);
    if (rows.length < 2) {
      taskDefinitions = shuffleArray(defaultTaskDefinitions);
      return;
    }

    const headers = rows[0].map((header) => header.trim().toLowerCase());
    const parsed = rows.slice(1).map((row) => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = (row[index] || '').trim();
      });
      return record;
    }).filter((record) => record['task description'] && record['intended goal']);

    const loadedTasks = parsed.map((record, index) => {
      const rawTarget = record['intended goal'];
      const prompt = record['task description'];
      const normalizedGoal = rawTarget.toLowerCase();
      const isOpenEnded = normalizedGoal === 'open ended';
      const target = isOpenEnded ? '' : (canonicalTargetMap[normalizedGoal] || rawTarget);
      return {
        id: index + 1,
        prompt,
        target,
        expectedFirstClick: record['predicted first click'] || '',
        isOpenEnded,
        viewKey: 'type',
        selectedKey: 'Products',
        groupName: 'Tasks'
      };
    });

    if (loadedTasks.length) {
      baseTaskDefinitions = loadedTasks;
    } else {
      baseTaskDefinitions = [...defaultTaskDefinitions];
    }
    taskDefinitions = shuffleArray(baseTaskDefinitions);
  } catch (error) {
    baseTaskDefinitions = [...defaultTaskDefinitions];
    taskDefinitions = shuffleArray(baseTaskDefinitions);
  }
}

const STORAGE_KEY = 'curly-hair-library-run-history';
const browseLog = [];

const state = {
  isTesting: false,
  page: 'home',
  taskIndex: 0,
  currentTask: null,
  taskInstructionVisible: false,
  canConfirmFound: false,
  currentPath: [],
  previousClickTime: null,
  taskLog: [],
  activeRun: null,
  runHistory: loadRunHistory()
};

function loadRunHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const isRunGrouped = parsed.every((item) => item && item.runId && Array.isArray(item.tasks));
    if (isRunGrouped) {
      return parsed;
    }

    const looksLegacyTaskList = parsed.every((item) => item && (item.taskNumber || item.taskPrompt));
    if (looksLegacyTaskList && parsed.length > 0) {
      return [{
        runId: createRunId(),
        startedAt: parsed[parsed.length - 1].startedAt || new Date().toISOString(),
        finishedAt: parsed[0].endedAt || new Date().toISOString(),
        tasks: parsed.map((legacy) => ({
          taskId: `T${String(legacy.taskNumber || 0).padStart(2, '0')}`,
          taskNumber: legacy.taskNumber || 0,
          taskPrompt: legacy.taskPrompt || '',
          target: legacy.target || '',
          status: legacy.status || 'miss',
          clickCount: legacy.clickCount || 0,
          totalSeconds: legacy.totalSeconds || 0,
          startedAt: legacy.startedAt || '',
          endedAt: legacy.endedAt || '',
          foundItClickedAt: '',
          endpointSelection: '',
          pathSummary: '',
          events: legacy.events || []
        }))
      }];
    }

    return [];
  } catch (error) {
    return [];
  }
}

function saveRunHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.runHistory));
}

function isOpenEndedScenario(promptText) {
  if (!promptText) return false;
  return promptText.toLowerCase() === 'when you wake up your hair is frizzy and you want to know how to tame it. find something that can help.';
}

function createRunId() {
  const iso = new Date().toISOString().replace(/[:.]/g, '-');
  const suffix = Math.random().toString(36).slice(2, 7);
  return `run-${iso}-${suffix}`;
}

function startTestRun() {
  taskDefinitions = shuffleArray(baseTaskDefinitions);
  state.activeRun = {
    runId: createRunId(),
    startedAt: new Date().toISOString(),
    finishedAt: null,
    tasks: []
  };
  state.isTesting = true;
  state.page = 'home';
  state.taskIndex = 0;
  state.currentTask = getCurrentTask();
  state.taskInstructionVisible = true;
  state.canConfirmFound = false;
  state.taskLog = [];
  state.previousClickTime = null;
  state.currentPath = [];
}

function closeActiveRunIfNeeded() {
  if (!state.activeRun) return;
  if (!state.activeRun.tasks.length) {
    state.activeRun = null;
    return;
  }
  state.activeRun.finishedAt = new Date().toISOString();
  state.runHistory.unshift(state.activeRun);
  state.activeRun = null;
  saveRunHistory();
}

function getCurrentTask() {
  return taskDefinitions[state.taskIndex] || null;
}

function getGroupEntries(category) {
  return Object.entries(category.groups || {});
}

function getTotalBlockCount(category) {
  return getGroupEntries(category).reduce((total, [, items]) => total + items.length, 0);
}

function getSummaryLabel(category) {
  const groupEntries = getGroupEntries(category);
  if (groupEntries.length === 1) {
    return `${getTotalBlockCount(category)} blocks`;
  }
  return `${groupEntries.length} subcategories`;
}

function getDirectGroupName(category) {
  const groupNames = Object.keys(category.groups || {});
  return groupNames.length === 1 ? groupNames[0] : null;
}

function addBrowseLog(action, value) {
  browseLog.push({
    time: new Date().toISOString(),
    action,
    value
  });
  renderBrowseLog();
}

function renderBrowseLog() {
  const logOutput = document.getElementById('browse-log-output');
  if (!logOutput) return;
  logOutput.textContent = JSON.stringify(browseLog, null, 2);
}

function addTaskLog(action, value) {
  const now = Date.now();
  const secondsSincePrevious = state.previousClickTime ? ((now - state.previousClickTime) / 1000).toFixed(3) : '0.000';
  state.previousClickTime = now;

  state.taskLog.push({
    taskNumber: state.taskIndex + 1,
    taskPrompt: state.currentTask ? state.currentTask.prompt : 'N/A',
    time: new Date().toISOString(),
    action,
    value,
    seconds_since_previous_click: Number(secondsSincePrevious),
    path: state.currentPath.slice()
  });
}

function exportCsv(rows, filename) {
  if (!rows.length) {
    rows = [{ taskNumber: '', taskPrompt: '', status: '', clickCount: '', totalSeconds: '', startedAt: '', endedAt: '', target: '' }];
  }

  const headers = Object.keys(rows[0]);
  const csvLines = [headers.join(',')];

  rows.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header] ?? '';
      const normalized = Array.isArray(value) ? value.join(' > ') : value;
      const stringValue = String(normalized).replace(/"/g, '""');
      return `"${stringValue}"`;
    });
    csvLines.push(values.join(','));
  });

  const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function timestampForFilename() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

function isTrackedClickAction(action) {
  return action === 'navigation'
    || action === 'select'
    || action === 'leaf'
    || action === 'found_it_click'
    || action === 'gave_up';
}

function firstClickValue(events) {
  if (!Array.isArray(events)) return '';
  const firstClickEvent = events.find((event) => isTrackedClickAction(event.action));
  return firstClickEvent ? (firstClickEvent.value || '') : '';
}

function buildClickTrail(events) {
  if (!Array.isArray(events)) return '';
  return events
    .filter((event) => isTrackedClickAction(event.action))
    .map((event, index) => `${index + 1}. ${event.action}: ${event.value || ''}`)
    .join(' | ');
}

function createActionButton(label, className, handler, detailText = '') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;

  if (detailText) {
    button.innerHTML = `<strong>${label}</strong><small>${detailText}</small>`;
  } else {
    button.textContent = label;
  }

  button.addEventListener('click', handler);
  return button;
}

function createBreadcrumb(items) {
  const wrapper = document.createElement('div');
  wrapper.className = 'breadcrumb';

  items.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'breadcrumb-link';
    button.textContent = item.label;
    button.addEventListener('click', item.action);
    wrapper.appendChild(button);

    if (index < items.length - 1) {
      const separator = document.createElement('span');
      separator.className = 'breadcrumb-separator';
      separator.textContent = '>';
      wrapper.appendChild(separator);
    }
  });

  return wrapper;
}

function updateCurrentPath(path) {
  state.currentPath = path.filter(Boolean);
}

function renderModeControls() {
  const controls = document.createElement('div');
  controls.className = 'mode-controls';

  const browseButton = document.createElement('button');
  browseButton.type = 'button';
  browseButton.className = `mode-toggle ${state.page === 'home' && !state.isTesting ? 'active' : ''}`;
  browseButton.textContent = 'Browse Mode';
  browseButton.addEventListener('click', () => {
    if (state.isTesting) {
      closeActiveRunIfNeeded();
    }
    state.isTesting = false;
    state.page = 'home';
    state.taskIndex = 0;
    state.currentTask = null;
    state.taskInstructionVisible = false;
    state.canConfirmFound = false;
    state.taskLog = [];
    state.previousClickTime = null;
    state.currentPath = [];
    renderHome();
  });

  const testButton = document.createElement('button');
  testButton.type = 'button';
  testButton.className = `mode-toggle ${state.isTesting ? 'active' : ''}`;
  testButton.textContent = 'Test Mode';
  testButton.addEventListener('click', () => {
    startTestRun();
    renderInstructionScreen();
  });

  const resultsButton = document.createElement('button');
  resultsButton.type = 'button';
  resultsButton.className = `mode-toggle ${state.page === 'results' ? 'active' : ''}`;
  resultsButton.textContent = 'Results';
  resultsButton.addEventListener('click', () => {
    if (state.isTesting) {
      closeActiveRunIfNeeded();
    }
    state.isTesting = false;
    state.page = 'results';
    state.taskIndex = 0;
    state.currentTask = null;
    state.taskInstructionVisible = false;
    state.canConfirmFound = false;
    state.taskLog = [];
    state.previousClickTime = null;
    state.currentPath = [];
    renderResultsPage();
  });

  controls.appendChild(browseButton);
  controls.appendChild(testButton);
  controls.appendChild(resultsButton);
  return controls;
}

function renderTaskHeader() {
  if (!state.isTesting || !state.currentTask) return null;

  const taskHeader = document.createElement('div');
  taskHeader.className = 'task-banner';

  const taskTitle = document.createElement('div');
  taskTitle.className = 'task-title';
  taskTitle.textContent = `Task ${state.taskIndex + 1} of ${taskDefinitions.length}`;

  const taskPrompt = document.createElement('div');
  taskPrompt.className = 'task-prompt';
  taskPrompt.textContent = state.currentTask.prompt;

  const taskActions = document.createElement('div');
  taskActions.className = 'task-actions';

  const giveUpButton = document.createElement('button');
  giveUpButton.type = 'button';
  giveUpButton.className = 'task-button give-up-button';
  giveUpButton.textContent = 'I give up';
  giveUpButton.addEventListener('click', () => {
    addTaskLog('gave_up', 'user chose to give up');
    completeCurrentTask('gave_up');
  });

  if (state.canConfirmFound) {
    const foundButton = document.createElement('button');
    foundButton.type = 'button';
    foundButton.className = 'task-button found-button';
    foundButton.textContent = 'I found it';
    foundButton.addEventListener('click', () => {
      if (isCurrentTaskTargetSelected()) {
        addTaskLog('found_it_click', 'user clicked found it at target');
      } else {
        addTaskLog('found_it_click', 'user clicked found it at non-target block');
      }
      completeCurrentTask('completed');
    });
    taskActions.appendChild(foundButton);
  }
  taskActions.appendChild(giveUpButton);
  taskHeader.appendChild(taskTitle);
  taskHeader.appendChild(taskPrompt);
  taskHeader.appendChild(taskActions);

  return taskHeader;
}

function renderInstructionScreen() {
  app.innerHTML = '';
  app.appendChild(renderModeControls());

  const panel = document.createElement('div');
  panel.className = 'instruction-panel';

  const title = document.createElement('h2');
  title.textContent = `Task ${state.taskIndex + 1}`;

  const prompt = document.createElement('p');
  prompt.textContent = state.currentTask ? state.currentTask.prompt : 'Task prompt';

  const continueButton = document.createElement('button');
  continueButton.type = 'button';
  continueButton.className = 'primary-button';
  continueButton.textContent = 'Okay';
  continueButton.addEventListener('click', () => {
    state.taskInstructionVisible = false;
    state.canConfirmFound = false;
    state.taskLog = [];
    state.previousClickTime = null;
    state.page = 'home';
    renderHome();
  });

  panel.appendChild(title);
  panel.appendChild(prompt);
  panel.appendChild(continueButton);
  app.appendChild(panel);
}

function isCurrentTaskTargetSelected() {
  if (!state.isTesting || !state.currentTask) return false;
  return state.currentPath.includes(state.currentTask.target);
}

function completeCurrentTask(status) {
  if (!state.isTesting || !state.currentTask || !state.activeRun) return;

  const totalSeconds = state.taskLog.reduce((sum, event) => sum + Number(event.seconds_since_previous_click || 0), 0);
  const startTime = state.taskLog.length ? state.taskLog[0].time : new Date().toISOString();
  const foundItEvent = state.taskLog.find((event) => event.action === 'found_it_click');
  const endpointSelection = state.currentPath[state.currentPath.length - 1] || '';
  const trackedClickEvents = state.taskLog.filter((event) => isTrackedClickAction(event.action));
  const pathSummary = buildClickTrail(state.taskLog);
  const taskOrdinal = state.taskIndex + 1;
  const taskIdentifier = state.currentTask && state.currentTask.id ? state.currentTask.id : taskOrdinal;
  const hasDefinedGoal = Boolean(state.currentTask.target);
  const matchedGoal = hasDefinedGoal && endpointSelection === state.currentTask.target;
  let asFiled = 'miss';
  if (status === 'gave_up') {
    asFiled = 'miss';
  } else if (state.currentTask.isOpenEnded || !hasDefinedGoal) {
    asFiled = 'open';
  } else if (matchedGoal) {
    asFiled = 'hit';
  }

  const taskRecord = {
    taskId: `T${String(taskIdentifier).padStart(2, '0')}`,
    taskNumber: taskIdentifier,
    taskPrompt: state.currentTask.prompt,
    target: state.currentTask.target,
    expectedFirstClick: state.currentTask.expectedFirstClick || '',
    isOpenEnded: Boolean(state.currentTask.isOpenEnded),
    status,
    asFiled,
    clickCount: trackedClickEvents.length,
    totalSeconds: Number(totalSeconds.toFixed(3)),
    startedAt: startTime,
    endedAt: new Date().toISOString(),
    foundItClickedAt: foundItEvent ? foundItEvent.time : '',
    endpointSelection,
    pathSummary,
    events: state.taskLog.slice()
  };

  state.activeRun.tasks.push(taskRecord);

  if (state.taskIndex < taskDefinitions.length - 1) {
    state.taskIndex += 1;
    state.currentTask = getCurrentTask();
    state.taskLog = [];
    state.canConfirmFound = false;
    state.previousClickTime = null;
    state.taskInstructionVisible = true;
    state.currentPath = [];
    renderInstructionScreen();
  } else {
    state.activeRun.finishedAt = new Date().toISOString();
    state.runHistory.unshift(state.activeRun);
    state.activeRun = null;
    saveRunHistory();
    state.isTesting = false;
    state.currentTask = null;
    state.canConfirmFound = false;
    state.taskLog = [];
    state.previousClickTime = null;
    state.currentPath = [];
    renderHome();
  }
}

function renderResultsPanel() {
  const panel = document.createElement('section');
  panel.className = 'results-panel';

  const title = document.createElement('h3');
  title.textContent = 'Saved Results';

  const actions = document.createElement('div');
  actions.className = 'result-actions';

  const exportCsvButton = document.createElement('button');
  exportCsvButton.type = 'button';
  exportCsvButton.className = 'primary-button';
  exportCsvButton.textContent = 'Export CSV';
  exportCsvButton.addEventListener('click', () => {
    const csvRows = [];
    state.runHistory.forEach((run) => {
      const tasks = Array.isArray(run.tasks) ? run.tasks : [];
      if (!tasks.length) {
        csvRows.push({
          runId: run.runId || '',
          startedAt: run.startedAt || '',
          finishedAt: run.finishedAt || '',
          taskId: '',
          scenario: '',
          expectedTarget: '',
          endpoint: '',
          asFiled: '',
          seconds: '',
          clicks: '',
          expectedFirstClick: '',
          actualFirstClick: '',
          path: '',
          foundItClickedAt: ''
        });
        return;
      }

      tasks.forEach((task) => {
        csvRows.push({
          runId: run.runId || '',
          startedAt: run.startedAt || '',
          finishedAt: run.finishedAt || '',
          taskId: task.taskId || `T${String(task.taskNumber || '').padStart(2, '0')}`,
          scenario: task.taskPrompt || '',
          expectedTarget: task.isOpenEnded ? '' : (task.target || ''),
          endpoint: task.endpointSelection || '',
          asFiled: task.asFiled || (task.status === 'completed' ? 'hit' : 'miss'),
          seconds: task.totalSeconds ?? '',
          clicks: task.clickCount ?? '',
          expectedFirstClick: task.expectedFirstClick || '',
          actualFirstClick: firstClickValue(task.events),
          path: task.pathSummary || buildClickTrail(task.events),
          foundItClickedAt: task.foundItClickedAt || ''
        });
      });
    });
    exportCsv(csvRows, `curly-hair-library-results-${timestampForFilename()}.csv`);
  });

  const exportJsonButton = document.createElement('button');
  exportJsonButton.type = 'button';
  exportJsonButton.className = 'secondary-button';
  exportJsonButton.textContent = 'Export JSON';
  exportJsonButton.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state.runHistory, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curly-hair-library-results.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.className = 'secondary-button danger-button';
  clearButton.textContent = 'Clear All Runs';
  clearButton.addEventListener('click', () => {
    state.runHistory = [];
    saveRunHistory();
    renderResultsPage();
  });

  actions.appendChild(exportCsvButton);
  actions.appendChild(exportJsonButton);
  actions.appendChild(clearButton);

  const list = document.createElement('div');
  list.className = 'run-list';

  if (!state.runHistory.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No saved runs yet.';
    list.appendChild(empty);
  } else {
    state.runHistory.forEach((run) => {
      const runRow = document.createElement('div');
      runRow.className = 'run-row';

      const runHeading = document.createElement('div');
      const startedText = run.startedAt ? new Date(run.startedAt).toLocaleString() : 'Unknown';
      const finishedText = run.finishedAt ? new Date(run.finishedAt).toLocaleString() : 'Unknown';
      runHeading.innerHTML = `<strong>Run ID: ${run.runId || '(unknown)'}</strong><div>Started: ${startedText}</div><div>Finished: ${finishedText}</div>`;
      runRow.appendChild(runHeading);

      const tasks = Array.isArray(run.tasks) ? run.tasks : [];
      tasks.forEach((task) => {
        const taskRow = document.createElement('div');
        taskRow.className = 'run-row';
        const isOpenEndedTask = Boolean(task.isOpenEnded) || isOpenEndedScenario(task.taskPrompt);
        const taskTypeLine = isOpenEndedTask ? '<div>Task type: Open-ended task</div>' : '';
        taskRow.innerHTML = `
          <div><strong>${task.taskId || `Task ${task.taskNumber || ''}`}</strong></div>
          <div>${task.taskPrompt || ''}</div>
          ${taskTypeLine}
          <div>Status: ${task.status || ''}</div>
          <div>Clicks: ${task.clickCount ?? 0}</div>
          <div>Target: ${task.target || ''}</div>
          <div>Found it clicked at: ${task.foundItClickedAt || 'N/A'}</div>
        `;
        runRow.appendChild(taskRow);
      });

      list.appendChild(runRow);
    });
  }

  panel.appendChild(title);
  panel.appendChild(actions);
  panel.appendChild(list);
  return panel;
}

function renderResultsPage() {
  state.page = 'results';
  app.innerHTML = '';
  app.appendChild(renderModeControls());
  app.appendChild(renderResultsPanel());
}

function renderHome() {
  state.page = 'home';
  state.canConfirmFound = false;
  app.innerHTML = '';
  app.appendChild(renderModeControls());

  if (state.isTesting) {
    if (state.taskInstructionVisible) {
      renderInstructionScreen();
      return;
    }

    const taskBanner = renderTaskHeader();
    if (taskBanner) {
      app.appendChild(taskBanner);
    }
  }

  const homeLayout = document.createElement('div');
  homeLayout.className = 'home-layout';

  Object.entries(structure).forEach(([viewKey, section]) => {
    const panel = document.createElement('section');
    panel.className = 'section-panel';

    const heading = document.createElement('h2');
    heading.className = 'section-header';
    heading.textContent = `Browse by ${section.label}`;
    panel.appendChild(heading);

    const optionGrid = document.createElement('div');
    optionGrid.className = 'option-grid';

    Object.keys(section.children).forEach((option) => {
      const category = section.children[option];
      const directGroupName = getDirectGroupName(category);
      const button = createActionButton(option, 'option-card', () => {
        if (state.isTesting) {
          addTaskLog('select', `${section.label}: ${option}${directGroupName ? ` > ${directGroupName}` : ''}`);
        } else {
          addBrowseLog('select', `${section.label}: ${option}${directGroupName ? ` > ${directGroupName}` : ''}`);
        }

        if (directGroupName) {
          renderLeafList(viewKey, option, directGroupName);
        } else {
          renderCategoryView(viewKey, option);
        }
      }, getSummaryLabel(category));
      optionGrid.appendChild(button);
    });

    panel.appendChild(optionGrid);
    homeLayout.appendChild(panel);
  });

  app.appendChild(homeLayout);
}

function renderView(viewKey, selectedKey) {
  const view = structure[viewKey];
  const sectionLabel = view.label;
  updateCurrentPath([view.label, selectedKey]);
  state.canConfirmFound = false;

  app.innerHTML = '';
  app.appendChild(renderModeControls());

  if (state.isTesting) {
    const taskBanner = renderTaskHeader();
    if (taskBanner) {
      app.appendChild(taskBanner);
    }
  }

  app.appendChild(createBreadcrumb([
    { label: 'Home', action: () => { if (state.isTesting) addTaskLog('navigation', 'home'); else addBrowseLog('navigation', 'home'); renderHome(); } }
  ]));

  const titleRow = document.createElement('div');
  titleRow.className = 'title-row';
  titleRow.textContent = sectionLabel;
  app.appendChild(titleRow);

  const panel = document.createElement('div');
  panel.className = 'section-panel';

  const listGrid = document.createElement('div');
  listGrid.className = 'list-grid';

  Object.keys(view.children).forEach((option) => {
    const category = view.children[option];
    const directGroupName = getDirectGroupName(category);
    const blockCount = getTotalBlockCount(category);
    const button = createActionButton(option, 'detail-box', () => {
      if (state.isTesting) {
        addTaskLog('select', `${sectionLabel}: ${option}${directGroupName ? ` > ${directGroupName}` : ''}`);
      } else {
        addBrowseLog('select', `${sectionLabel}: ${option}${directGroupName ? ` > ${directGroupName}` : ''}`);
      }
      if (directGroupName) {
        renderLeafList(viewKey, option, directGroupName);
      } else {
        renderCategoryView(viewKey, option);
      }
    }, `${blockCount} blocks`);
    listGrid.appendChild(button);
  });

  panel.appendChild(listGrid);
  app.appendChild(panel);
}

function renderCategoryView(viewKey, selectedKey) {
  const view = structure[viewKey];
  const category = view.children[selectedKey];
  updateCurrentPath([view.label, selectedKey]);
  state.canConfirmFound = false;

  app.innerHTML = '';
  app.appendChild(renderModeControls());

  if (state.isTesting) {
    const taskBanner = renderTaskHeader();
    if (taskBanner) {
      app.appendChild(taskBanner);
    }
  }

  const breadcrumbItems = [
    { label: 'Home', action: () => { if (state.isTesting) addTaskLog('navigation', 'home'); else addBrowseLog('navigation', 'home'); renderHome(); } },
    { label: selectedKey, action: () => { if (state.isTesting) addTaskLog('navigation', `${view.label}: ${selectedKey}`); else addBrowseLog('navigation', `${view.label}: ${selectedKey}`); renderCategoryView(viewKey, selectedKey); } }
  ];

  app.appendChild(createBreadcrumb(breadcrumbItems));

  const titleRow = document.createElement('div');
  titleRow.className = 'title-row';
  titleRow.textContent = selectedKey;
  app.appendChild(titleRow);

  const panel = document.createElement('div');
  panel.className = 'section-panel';

  const listGrid = document.createElement('div');
  listGrid.className = 'list-grid';

  Object.keys(category.groups).forEach((groupName) => {
    const itemCount = category.groups[groupName].length;
    const button = createActionButton(groupName, 'detail-box', () => {
      if (state.isTesting) {
        addTaskLog('select', `${view.label}: ${selectedKey} > ${groupName}`);
      } else {
        addBrowseLog('select', `${view.label}: ${selectedKey} > ${groupName}`);
      }
      renderLeafList(viewKey, selectedKey, groupName);
    }, `${itemCount} blocks`);
    listGrid.appendChild(button);
  });

  panel.appendChild(listGrid);
  app.appendChild(panel);
}

function renderLeafList(viewKey, selectedKey, groupName) {
  const view = structure[viewKey];
  const selectedCategory = view.children[selectedKey];
  const directGroupName = getDirectGroupName(selectedCategory);
  const items = view.children[selectedKey].groups[groupName];
  updateCurrentPath([view.label, selectedKey, groupName]);
  state.canConfirmFound = false;

  app.innerHTML = '';
  app.appendChild(renderModeControls());

  if (state.isTesting) {
    const taskBanner = renderTaskHeader();
    if (taskBanner) {
      app.appendChild(taskBanner);
    }
  }

  const breadcrumbItems = [
    { label: 'Home', action: () => { if (state.isTesting) addTaskLog('navigation', 'home'); else addBrowseLog('navigation', 'home'); renderHome(); } },
    {
      label: selectedKey,
      action: () => {
        if (state.isTesting) addTaskLog('navigation', `${view.label}: ${selectedKey}`); else addBrowseLog('navigation', `${view.label}: ${selectedKey}`);
        if (directGroupName) {
          renderLeafList(viewKey, selectedKey, directGroupName);
        } else {
          renderCategoryView(viewKey, selectedKey);
        }
      }
    }
  ];

  if (groupName !== selectedKey) {
    breadcrumbItems.push({
      label: groupName,
      action: () => { if (state.isTesting) addTaskLog('navigation', `${view.label}: ${selectedKey} > ${groupName}`); else addBrowseLog('navigation', `${view.label}: ${selectedKey} > ${groupName}`); renderLeafList(viewKey, selectedKey, groupName); }
    });
  }

  app.appendChild(createBreadcrumb(breadcrumbItems));

  const titleRow = document.createElement('div');
  titleRow.className = 'title-row';
  titleRow.textContent = groupName;
  app.appendChild(titleRow);

  const panel = document.createElement('div');
  panel.className = 'section-panel';

  const listGrid = document.createElement('div');
  listGrid.className = 'list-grid';

  items.forEach((item) => {
    const button = createActionButton(item, 'detail-box', () => {
      if (state.isTesting) {
        addTaskLog('leaf', `${view.label}: ${selectedKey} > ${groupName} > ${item}`);
      } else {
        addBrowseLog('leaf', `${view.label}: ${selectedKey} > ${groupName} > ${item}`);
      }
      renderLeaf(viewKey, selectedKey, groupName, item);
    });
    listGrid.appendChild(button);
  });

  panel.appendChild(listGrid);
  app.appendChild(panel);
}

function renderLeaf(viewKey, selectedKey, groupName, leaf) {
  updateCurrentPath([structure[viewKey].label, selectedKey, groupName, leaf]);
  state.canConfirmFound = true;
  const selectedCategory = structure[viewKey].children[selectedKey];
  const directGroupName = getDirectGroupName(selectedCategory);

  app.innerHTML = '';
  app.appendChild(renderModeControls());

  if (state.isTesting) {
    const taskBanner = renderTaskHeader();
    if (taskBanner) {
      app.appendChild(taskBanner);
    }
  }

  const breadcrumbItems = [
    { label: 'Home', action: () => { if (state.isTesting) addTaskLog('navigation', 'home'); else addBrowseLog('navigation', 'home'); renderHome(); } },
    {
      label: selectedKey,
      action: () => {
        if (state.isTesting) addTaskLog('navigation', `${structure[viewKey].label}: ${selectedKey}`); else addBrowseLog('navigation', `${structure[viewKey].label}: ${selectedKey}`);
        if (directGroupName) {
          renderLeafList(viewKey, selectedKey, directGroupName);
        } else {
          renderCategoryView(viewKey, selectedKey);
        }
      }
    }
  ];

  if (groupName !== selectedKey) {
    breadcrumbItems.push({
      label: groupName,
      action: () => { if (state.isTesting) addTaskLog('navigation', `${structure[viewKey].label}: ${selectedKey} > ${groupName}`); else addBrowseLog('navigation', `${structure[viewKey].label}: ${selectedKey} > ${groupName}`); renderLeafList(viewKey, selectedKey, groupName); }
    });
  }

  if (leaf !== groupName) {
    breadcrumbItems.push({
      label: leaf,
      action: () => { if (state.isTesting) addTaskLog('navigation', `${structure[viewKey].label}: ${selectedKey} > ${groupName} > ${leaf}`); else addBrowseLog('navigation', `${structure[viewKey].label}: ${selectedKey} > ${groupName} > ${leaf}`); renderLeaf(viewKey, selectedKey, groupName, leaf); }
    });
  }

  app.appendChild(createBreadcrumb(breadcrumbItems));

  const titleRow = document.createElement('div');
  titleRow.className = 'title-row';
  titleRow.textContent = leaf;
  app.appendChild(titleRow);

  const detailPanel = document.createElement('div');
  detailPanel.className = 'detail-panel';
  const detailBox = document.createElement('div');
  detailBox.className = 'detail-box';
  detailBox.innerHTML = `
    <strong>You selected: ${leaf}</strong>
    <small>Placeholder page</small>
  `;
  detailPanel.appendChild(detailBox);
  app.appendChild(detailPanel);

}

loadTaskDefinitions().then(() => {
  renderHome();
});
