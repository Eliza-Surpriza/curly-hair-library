(function () {
  'use strict';

  const TASKS = [
    "You've heard that knowing your curl type can help you pick better products. Using this website, figure out what curl type you have and what it means.",
    "Your hair has been feeling weighed down and greasy lately. Find a product on this website that might help with that.",
    "You've heard of something called 'flaxseed gel' and want to know more. See if you can find information about it on this website.",
    "You want to protect your curls overnight. Find a tool or accessory on this website that could help.",
    "You're not sure how to dry your curls without causing frizz. Find guidance on this website for the drying step of your routine.",
    "You've noticed your hair sometimes feels dry even after conditioning. Find information on this website that might explain why.",
    "Imagine you're just starting to take care of your curly hair and don't know where to begin. Spend a few minutes exploring this website and tell us what you find helpful."
  ];

  const STORAGE_KEY = 'curly-hair-test-sessions';

  const state = {
    active: false,
    participantId: null,
    taskOrder: [],
    currentTaskIndex: 0,
    sessionStartTime: null,
    taskStartTime: null,
    currentTaskClicks: [],
    currentSession: null
  };

  let timerInterval = null;

  // ── Utils ─────────────────────────────────────────────

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function fmtDuration(ms) {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

  function getSessions() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function saveSessions(sessions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }

  // ── Init ──────────────────────────────────────────────

  function init() {
    createToggleBtn();
    attachTracking();
  }

  // ── Toggle Button ─────────────────────────────────────

  function createToggleBtn() {
    const btn = document.createElement('button');
    btn.id = 'tm-toggle-btn';
    btn.textContent = '🧪';
    btn.title = 'Testing Controls';
    document.body.appendChild(btn);
    btn.addEventListener('click', onToggleClick);
  }

  function onToggleClick() {
    if (state.active) {
      if (confirm('Exit testing mode? Current task data will be saved.')) {
        finalizeCurrentTask();
        endSession();
      }
    } else {
      showMainMenu();
    }
  }

  // ── Main Menu ─────────────────────────────────────────

  function showMainMenu() {
    const hasSessions = getSessions().length > 0;
    showModal(`
      <h2>Testing Controls</h2>
      <div class="tm-modal-buttons">
        <button id="tm-start-btn">▶ Start New Session</button>
        ${hasSessions ? '<button id="tm-results-btn">📋 View Results</button>' : ''}
      </div>
    `, (modal) => {
      modal.querySelector('#tm-start-btn').addEventListener('click', () => {
        modal.remove();
        showParticipantModal();
      });
      modal.querySelector('#tm-results-btn')?.addEventListener('click', () => {
        modal.remove();
        showResultsPanel();
      });
    });
  }

  // ── Start Session ─────────────────────────────────────

  function showParticipantModal() {
    showModal(`
      <h2>New Session</h2>
      <label for="tm-pid-input">Participant ID / Name</label>
      <input id="tm-pid-input" type="text" placeholder="e.g. P001 or Alex" />
      <p class="tm-recording-hint">🎙 Start your voice recording the moment you click <strong>Start ▶</strong></p>
      <div class="tm-modal-buttons">
        <button id="tm-cancel-pid">Cancel</button>
        <button id="tm-confirm-pid">Start ▶</button>
      </div>
    `, (modal) => {
      const input = modal.querySelector('#tm-pid-input');
      input.focus();
      modal.querySelector('#tm-cancel-pid').addEventListener('click', () => modal.remove());
      const start = () => {
        const id = input.value.trim();
        if (!id) { input.classList.add('tm-input-error'); return; }
        modal.remove();
        startSession(id);
      };
      modal.querySelector('#tm-confirm-pid').addEventListener('click', start);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') start(); });
    });
  }

  function startSession(participantId) {
    const now = Date.now();
    Object.assign(state, {
      active: true,
      participantId,
      taskOrder: shuffle([...Array(TASKS.length).keys()]),
      currentTaskIndex: 0,
      sessionStartTime: now,
      taskStartTime: now,
      currentTaskClicks: [],
      currentSession: {
        participantId,
        sessionStart: new Date().toISOString(),
        tasks: []
      }
    });

    const btn = document.getElementById('tm-toggle-btn');
    btn.textContent = '🧪 Exit';
    btn.classList.add('tm-active');

    renderBanner();
  }

  // ── Task Banner ───────────────────────────────────────

  function renderBanner() {
    document.getElementById('tm-task-banner')?.remove();
    clearInterval(timerInterval);

    const { currentTaskIndex, taskOrder } = state;
    const taskNum = currentTaskIndex + 1;
    const taskText = TASKS[taskOrder[currentTaskIndex]];
    const isLast = taskNum === TASKS.length;

    const banner = document.createElement('div');
    banner.id = 'tm-task-banner';
    banner.innerHTML = `
      <div class="tm-banner-inner">
        <div class="tm-banner-info">
          <span class="tm-task-counter">Task ${taskNum} of ${TASKS.length}</span>
          <p class="tm-task-text">"${taskText}"</p>
        </div>
        <div class="tm-banner-controls">
          <button class="tm-next-btn" id="tm-next-btn">
            ${isLast ? 'End Session ✓' : 'Next Task →'}
          </button>
        </div>
      </div>
    `;
    document.body.insertBefore(banner, document.body.firstChild);

    // Push site header down so banner doesn't overlap
    const headerEl = document.querySelector('.site-header');
    if (headerEl) headerEl.style.marginTop = banner.offsetHeight + 'px';

    state.taskStartTime = Date.now();

    // Timer runs silently in background to track recording timestamps
    timerInterval = setInterval(() => {}, 1000);

    document.getElementById('tm-next-btn').addEventListener('click', onNextTask);
  }

  function onNextTask() {
    finalizeCurrentTask();
    state.currentTaskIndex++;
    state.currentTaskClicks = [];

    if (state.currentTaskIndex >= TASKS.length) {
      endSession();
    } else {
      renderBanner();
    }
  }

  function finalizeCurrentTask() {
    const { currentTaskIndex, taskOrder, taskStartTime, currentTaskClicks, currentSession, sessionStartTime } = state;
    if (currentTaskIndex >= TASKS.length) return;
    const endTime = Date.now();
    currentSession.tasks.push({
      taskNumber: currentTaskIndex + 1,
      taskText: TASKS[taskOrder[currentTaskIndex]],
      durationMs: endTime - taskStartTime,
      durationFormatted: fmtDuration(endTime - taskStartTime),
      taskStartRecordingTime: fmtDuration(taskStartTime - sessionStartTime),
      taskEndRecordingTime: fmtDuration(endTime - sessionStartTime),
      clicks: [...currentTaskClicks]
    });
  }

  function endSession() {
    clearInterval(timerInterval);

    const sessions = getSessions();
    sessions.push(state.currentSession);
    saveSessions(sessions);

    document.getElementById('tm-task-banner')?.remove();
    const headerEl = document.querySelector('.site-header');
    if (headerEl) headerEl.style.marginTop = '';

    state.active = false;
    const btn = document.getElementById('tm-toggle-btn');
    btn.textContent = '🧪';
    btn.classList.remove('tm-active');

    const pid = state.participantId;
    showModal(`
      <h2>Session Complete ✓</h2>
      <p>All tasks done. Results saved for <strong>${pid}</strong>.</p>
      <div class="tm-modal-buttons">
        <button id="tm-close-done">Close</button>
        <button id="tm-view-done">📋 View Results</button>
      </div>
    `, (modal) => {
      modal.querySelector('#tm-close-done').addEventListener('click', () => modal.remove());
      modal.querySelector('#tm-view-done').addEventListener('click', () => {
        modal.remove();
        showResultsPanel();
      });
    });
  }

  // ── Click Tracking ────────────────────────────────────

  function logClick(label, type) {
    const now = Date.now();
    state.currentTaskClicks.push({
      label,
      type,
      taskElapsed: Math.floor((now - state.taskStartTime) / 1000),
      sessionElapsed: Math.floor((now - state.sessionStartTime) / 1000),
      recordingTime: fmtDuration(now - state.sessionStartTime),
      timestamp: new Date().toISOString()
    });
  }

  function attachTracking() {
    // Click tracking via event delegation
    document.addEventListener('click', (e) => {
      if (!state.active) return;
      if (e.target.closest('#tm-task-banner, #tm-toggle-btn, #testing-modal-overlay')) return;

      const t = e.target;
      let label = '', type = '';

      if (t.closest('[data-curl-pattern]')) {
        label = t.closest('[data-curl-pattern]').dataset.curlPattern;
        type = 'curl-card';
      } else if (t.closest('.routine-card')) {
        label = t.closest('.routine-card').textContent.trim();
        type = 'routine-card';
      } else if (t.closest('[data-group-name]')) {
        label = t.closest('[data-group-name]').dataset.groupName;
        type = 'group-card';
      } else if (t.closest('[data-item]')) {
        label = t.closest('[data-item]').dataset.item;
        type = 'search-result';
      } else if (t.closest('.item-card')) {
        label = t.closest('.item-card').textContent.trim();
        type = 'item-card';
      } else if (t.closest('.mode-toggle')) {
        label = t.closest('.mode-toggle').dataset.category;
        type = 'nav-button';
      } else if (t.closest('.dropdown-item')) {
        const el = t.closest('.dropdown-item');
        label = `${el.dataset.category} › ${el.dataset.group}`;
        type = 'dropdown';
      } else if (t.closest('.breadcrumb-link')) {
        label = t.closest('.breadcrumb-link').dataset.breadcrumb || t.closest('.breadcrumb-link').textContent.trim();
        type = 'breadcrumb';
      } else {
        return;
      }

      if (label) logClick(label, type);
    }, true);

    // Search tracking
    document.addEventListener('keydown', (e) => {
      if (!state.active) return;
      if (e.key === 'Enter' && e.target.id === 'search-input') {
        const q = e.target.value.trim();
        if (q) logClick(`search: "${q}"`, 'search');
      }
    }, true);
  }

  // ── Results Panel ─────────────────────────────────────

  function showResultsPanel() {
    const sessions = getSessions();

    let body = '';
    if (sessions.length === 0) {
      body = '<p class="tm-no-results">No sessions recorded yet.</p>';
    } else {
      body = sessions.map((session) => {
        const tasksHtml = session.tasks.map(task => {
          const clicksHtml = task.clicks.length
            ? task.clicks.map(c =>
                `<span class="tm-chip tm-chip-${c.type}" title="${c.type}">
                  <span class="tm-chip-time">${c.recordingTime}</span> ${c.label}
                </span>`
              ).join('<span class="tm-arrow">→</span>')
            : '<span class="tm-no-clicks">No interactions recorded</span>';

          return `
            <div class="tm-result-task">
              <div class="tm-result-task-header">
                <span class="tm-task-num">Task ${task.taskNumber}</span>
                <span class="tm-task-recording">${task.taskStartRecordingTime} – ${task.taskEndRecordingTime}</span>
                <span class="tm-task-dur">⏱ ${task.durationFormatted}</span>
                <span class="tm-task-clk">${task.clicks.length} interaction${task.clicks.length !== 1 ? 's' : ''}</span>
              </div>
              <p class="tm-result-task-text">"${task.taskText}"</p>
              <div class="tm-click-path">${clicksHtml}</div>
            </div>
          `;
        }).join('');

        return `
          <div class="tm-result-session">
            <div class="tm-result-session-header">
              <h3>${session.participantId}</h3>
              <span>${new Date(session.sessionStart).toLocaleString()}</span>
            </div>
            ${tasksHtml}
          </div>
        `;
      }).join('');
    }

    showModal(`
      <div class="tm-results-header">
        <h2>Testing Results</h2>
        <div class="tm-results-actions">
          ${sessions.length ? '<button id="tm-export-btn">⬇ Export CSV</button>' : ''}
          ${sessions.length ? '<button id="tm-clear-btn">🗑 Clear All</button>' : ''}
          <button id="tm-close-results">✕ Close</button>
        </div>
      </div>
      <div class="tm-results-body">${body}</div>
    `, (modal) => {
      modal.querySelector('#tm-close-results').addEventListener('click', () => modal.remove());
      modal.querySelector('#tm-export-btn')?.addEventListener('click', exportCSV);
      modal.querySelector('#tm-clear-btn')?.addEventListener('click', () => {
        if (confirm('Clear all results? This cannot be undone.')) {
          localStorage.removeItem(STORAGE_KEY);
          modal.remove();
        }
      });
    }, true);
  }

  function exportCSV() {
    const sessions = getSessions();
    const rows = [['Participant', 'Session Start', 'Task #', 'Task Text', 'Task Start (recording)', 'Task End (recording)', 'Task Duration', 'Recording Time', 'Interaction', 'Type', 'Task Elapsed (s)']];
    sessions.forEach(s => {
      s.tasks.forEach(t => {
        if (t.clicks.length === 0) {
          rows.push([s.participantId, s.sessionStart, t.taskNumber, `"${t.taskText.replace(/"/g, '""')}"`, t.taskStartRecordingTime || '', t.taskEndRecordingTime || '', t.durationFormatted, '', '(no interactions)', '', '']);
        } else {
          t.clicks.forEach(c => {
            rows.push([
              s.participantId,
              s.sessionStart,
              t.taskNumber,
              `"${t.taskText.replace(/"/g, '""')}"`,
              t.taskStartRecordingTime || '',
              t.taskEndRecordingTime || '',
              t.durationFormatted,
              c.recordingTime || '',
              `"${c.label.replace(/"/g, '""')}"`,
              c.type,
              c.taskElapsed != null ? c.taskElapsed : (c.elapsed || '')
            ]);
          });
        }
      });
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `curly-hair-results-${new Date().toISOString().split('T')[0]}.csv`
    });
    a.click();
  }

  // ── Modal Helper ──────────────────────────────────────

  function showModal(innerHtml, setupFn, wide = false) {
    const overlay = document.createElement('div');
    overlay.id = 'testing-modal-overlay';
    overlay.innerHTML = `<div class="tm-modal-box${wide ? ' tm-modal-wide' : ''}">${innerHtml}</div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    setupFn?.(overlay);
  }

  // ── Boot ──────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
