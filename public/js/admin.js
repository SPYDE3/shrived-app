// ============================================================
// SHRIVED. — Admin Registry & Dashboard Module
// ============================================================

'use strict';

const initialPandits = [
  {
    name: 'Babul Nana',
    languages: 'Odia, Hindi, Bengali, Sanskrit',
    locality: 'Bellandur',
    specialty: 'Odia/Bengali customs & Vedic rituals',
    exp: '15 Yrs Exp',
    img: 'My_photo.jpeg'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  seedPandits();
  renderBookingsTable();
  renderPanditsTable();
  initAnalyticsCharts();
});

// Switch Tabs
function switchAdminTab(element, tabId) {
  document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
  element.classList.add('active');

  document.querySelectorAll('.admin-tab-content').forEach(content => content.style.display = 'none');
  const target = document.getElementById(`admin-sec-${tabId}`);
  if (target) target.style.display = 'block';
}

// ===== ANALYTICS CHARTS =====
function initAnalyticsCharts() {
  const ctxLang = document.getElementById('chart-bookings-language');
  const ctxPujas = document.getElementById('chart-pujas-popularity');
  
  if (!ctxLang || !ctxPujas) return;

  // Language Chart (Pie)
  new Chart(ctxLang, {
    type: 'pie',
    data: {
      labels: ['Odia', 'Bengali', 'Hindi', 'Sanskrit'],
      datasets: [{
        data: [45, 30, 20, 5],
        backgroundColor: ['#D4A017', '#FF6B1A', '#C97B6A', '#8B0000'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() } }
      }
    }
  });

  // Popular Pujas Chart (Bar)
  new Chart(ctxPujas, {
    type: 'bar',
    data: {
      labels: ['Griha Pravesh', 'Satyanarayan', 'Laxmi Puja', 'Marriage', 'Havan combo'],
      datasets: [{
        label: 'Bookings Volume',
        data: [35, 48, 27, 12, 22],
        backgroundColor: '#FF6B1A',
        borderColor: '#D4A017',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() } },
        y: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() } }
      }
    }
  });
}

// ===== BOOKINGS LOG MANAGEMENT =====
function renderBookingsTable() {
  const body = document.getElementById('admin-bookings-table-body');
  if (!body) return;

  const bookings = JSON.parse(localStorage.getItem('shrived-bookings') || '[]');
  body.innerHTML = '';

  document.getElementById('admin-total-bookings-cnt').textContent = bookings.length;

  if (bookings.length === 0) {
    body.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 24px;">No bookings logged.</td></tr>';
    return;
  }

  bookings.forEach(b => {
    const statusClass = b.status === 'confirmed' ? 'status-confirmed' : 
                        b.status === 'completed' ? 'status-completed' : 
                        b.status === 'cancelled' ? 'status-cancelled' : 'status-pending';

    const selectOptions = ['confirmed', 'completed', 'cancelled', 'pending']
      .map(s => `<option value="${s}" ${b.status === s ? 'selected' : ''}>${s.toUpperCase()}</option>`)
      .join('');

    const row = `
      <tr>
        <td><strong>${b.id}</strong></td>
        <td>${b.name}</td>
        <td>${b.pujaName.split('(')[0].trim()}</td>
        <td>${b.panditName}</td>
        <td>${b.date} @ ${b.time}</td>
        <td><strong>WhatsApp Consult</strong></td>
        <td><span class="status-badge ${statusClass}">${b.status.toUpperCase()}</span></td>
        <td>
          <select onchange="updateBookingStatus('${b.id}', this.value)" style="padding: 4px; border-radius:4px; font-size:0.75rem;">
            ${selectOptions}
          </select>
        </td>
      </tr>
    `;
    body.innerHTML += row;
  });
}

function updateBookingStatus(id, newStatus) {
  const bookings = JSON.parse(localStorage.getItem('shrived-bookings') || '[]');
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = newStatus;
    localStorage.setItem('shrived-bookings', JSON.stringify(bookings));
    renderBookingsTable();
    if (window.Shrived && window.Shrived.Toast) {
      window.Shrived.Toast.show(`Booking status updated to ${newStatus.toUpperCase()}`, 'success');
    }
  }
}

// ===== PANDIT REGISTRY CRUD =====
function seedPandits() {
  const existing = localStorage.getItem('shrived-pandits');
  if (!existing) {
    localStorage.setItem('shrived-pandits', JSON.stringify(initialPandits));
  }
}

function renderPanditsTable() {
  const body = document.getElementById('admin-pandits-table-body');
  if (!body) return;

  const pandits = JSON.parse(localStorage.getItem('shrived-pandits') || '[]');
  body.innerHTML = '';

  document.getElementById('admin-total-pandits-cnt').textContent = pandits.length;

  if (pandits.length === 0) {
    body.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 24px;">No pandits registered.</td></tr>';
    return;
  }

  pandits.forEach((p, idx) => {
    const row = `
      <tr>
        <td><img src="${p.img || 'My_photo.jpeg'}" style="width: 40px; height: 40px; border-radius:50%; object-fit:cover;"></td>
        <td><strong>${p.name}</strong></td>
        <td>${p.languages}</td>
        <td>${p.locality}</td>
        <td><span class="badge badge-saffron">${p.specialty}</span></td>
        <td>${p.exp}</td>
        <td>
          <button onclick="editPandit(${idx})" class="btn btn-ghost btn-sm" style="padding: 4px 8px; font-size:0.72rem; margin-right:4px;">Edit</button>
          <button onclick="deletePandit(${idx})" class="btn btn-ghost btn-sm" style="padding: 4px 8px; font-size:0.72rem; color:var(--crimson); border-color:var(--crimson);">Delete</button>
        </td>
      </tr>
    `;
    body.innerHTML += row;
  });
}

// Modal control
function openPanditModal() {
  document.getElementById('modal-title').textContent = 'Add New Pandit';
  document.getElementById('edit-pandit-idx').value = '';
  document.getElementById('pandit-form').reset();
  document.getElementById('pandit-modal').style.display = 'flex';
}

function closePanditModal() {
  document.getElementById('pandit-modal').style.display = 'none';
}

function handlePanditSubmit(event) {
  event.preventDefault();
  const idxStr = document.getElementById('edit-pandit-idx').value;
  const name = document.getElementById('p-name').value;
  const languages = document.getElementById('p-languages').value;
  const locality = document.getElementById('p-locality').value;
  const specialty = document.getElementById('p-specialty').value;
  const expVal = document.getElementById('p-exp').value;

  const pandits = JSON.parse(localStorage.getItem('shrived-pandits') || '[]');

  const pObj = {
    name,
    languages,
    locality,
    specialty,
    exp: `${expVal} Yrs Exp`,
    img: idxStr !== '' ? pandits[parseInt(idxStr, 10)].img : 'My_photo.jpeg'
  };

  if (idxStr !== '') {
    const idx = parseInt(idxStr, 10);
    pandits[idx] = pObj;
    if (window.Shrived && window.Shrived.Toast) window.Shrived.Toast.show('Pandit profile updated successfully.', 'success');
  } else {
    pandits.push(pObj);
    if (window.Shrived && window.Shrived.Toast) window.Shrived.Toast.show('New Pandit registered in registry.', 'success');
  }

  localStorage.setItem('shrived-pandits', JSON.stringify(pandits));
  closePanditModal();
  renderPanditsTable();
}

function editPandit(idx) {
  const pandits = JSON.parse(localStorage.getItem('shrived-pandits') || '[]');
  const p = pandits[idx];

  if (!p) return;

  document.getElementById('modal-title').textContent = 'Edit Pandit Profile';
  document.getElementById('edit-pandit-idx').value = idx;
  document.getElementById('p-name').value = p.name;
  document.getElementById('p-languages').value = p.languages;
  document.getElementById('p-locality').value = p.locality;
  document.getElementById('p-specialty').value = p.specialty;
  document.getElementById('p-exp').value = p.exp.replace(' Yrs Exp', '');

  document.getElementById('pandit-modal').style.display = 'flex';
}

function deletePandit(idx) {
  if (!confirm('Are you sure you want to delete this pandit from the registry?')) return;

  const pandits = JSON.parse(localStorage.getItem('shrived-pandits') || '[]');
  pandits.splice(idx, 1);
  localStorage.setItem('shrived-pandits', JSON.stringify(pandits));
  renderPanditsTable();
  if (window.Shrived && window.Shrived.Toast) {
    window.Shrived.Toast.show('Pandit profile deleted.', 'info');
  }
}
