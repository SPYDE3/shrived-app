// ============================================================
// SHRIVED. — User Dashboard Module
// ============================================================

'use strict';

const mockBookings = [
  {
    id: 'SHR-2026-1049',
    name: 'Devoted Family',
    phone: '7003220662',
    email: 'devotee@example.com',
    address: 'Apartment 402, Outer Ring Road, Bellandur, Bangalore',
    pujaKey: 'satyanarayan',
    pujaName: 'Satyanarayan Vrat Katha',
    panditKey: 'babul-nana',
    panditName: 'Babul Nana',
    date: 'June 04, 2026',
    time: '09:30 AM',
    price: 'WhatsApp Consult',
    status: 'confirmed',
    timestamp: '2026-05-20T08:00:00Z'
  },
  {
    id: 'SHR-2026-0812',
    name: 'Devoted Family',
    phone: '7003220662',
    email: 'devotee@example.com',
    address: 'Apartment 402, Outer Ring Road, Bellandur, Bangalore',
    pujaKey: 'grihapravesh',
    pujaName: 'Griha Pravesh & Vastu Puja',
    panditKey: 'babul-nana',
    panditName: 'Babul Nana',
    date: 'April 12, 2026',
    time: '08:45 AM',
    price: 'WhatsApp Consult',
    status: 'completed',
    timestamp: '2026-04-10T08:00:00Z'
  },
  {
    id: 'SHR-2026-0210',
    name: 'Devoted Family',
    phone: '7003220662',
    email: 'devotee@example.com',
    address: 'Apartment 402, Outer Ring Road, Bellandur, Bangalore',
    pujaKey: 'havan',
    pujaName: 'Ganesh Puja & Havan',
    panditKey: 'babul-nana',
    panditName: 'Babul Nana',
    date: 'January 28, 2026',
    time: '10:30 AM',
    price: 'WhatsApp Consult',
    status: 'completed',
    timestamp: '2026-01-20T08:00:00Z'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadProfile();
  seedMockBookings();
  renderBookings();
});

// Check if user is logged in
function checkAuth() {
  const loggedIn = localStorage.getItem('shrived-logged-in');
  if (loggedIn !== 'true') {
    window.location.href = 'login.html';
  }
}

// Log out user
function handleLogout() {
  localStorage.removeItem('shrived-logged-in');
  window.location.href = 'login.html';
}

// Load profile details
function loadProfile() {
  const prof = JSON.parse(localStorage.getItem('shrived-user-profile') || '{}');
  const nameEl = document.getElementById('user-profile-name');
  const emailEl = document.getElementById('user-profile-email');

  if (prof.name && nameEl) nameEl.textContent = prof.name;
  if (prof.email && emailEl) emailEl.textContent = prof.email;
}

// Seed mock bookings if database is empty
function seedMockBookings() {
  const existing = localStorage.getItem('shrived-bookings');
  if (!existing) {
    localStorage.setItem('shrived-bookings', JSON.stringify(mockBookings));
  }
}

// Switch dashboard tabs
function switchDashboardTab(element, tabId) {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  });
  element.classList.add('active');

  document.querySelectorAll('.dashboard-tab-content').forEach(content => {
    content.style.display = 'none';
  });
  
  const target = document.getElementById(`tab-sec-${tabId}`);
  if (target) target.style.display = 'block';
}

// Render bookings lists
function renderBookings() {
  const teaserBody = document.getElementById('bookings-table-body-teaser');
  const fullBody = document.getElementById('bookings-table-body-full');
  const bookings = JSON.parse(localStorage.getItem('shrived-bookings') || '[]');

  if (!teaserBody || !fullBody) return;

  teaserBody.innerHTML = '';
  fullBody.innerHTML = '';

  bookings.sort((a, b) => new Date(b.date) - new Date(a.date));

  const upcomingCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  
  const upcomingEl = document.getElementById('stat-upcoming-cnt');
  const completedEl = document.getElementById('stat-completed-cnt');
  
  if (upcomingEl) upcomingEl.textContent = upcomingCount;
  if (completedEl) completedEl.textContent = completedCount;

  // Render Showcase (next upcoming puja details card)
  const nextPuja = bookings.find(b => b.status === 'confirmed');
  if (nextPuja) {
    document.getElementById('next-puja-title').textContent = nextPuja.pujaName.split('(')[0].trim();
    document.getElementById('next-puja-datetime').textContent = `${nextPuja.date} @ ${nextPuja.time}`;
    document.getElementById('next-puja-address').textContent = nextPuja.address;
    document.getElementById('next-puja-pandit').textContent = nextPuja.panditName;
  }

  // Populate tables
  if (bookings.length === 0) {
    const emptyRow = '<tr><td colspan="6" style="text-align:center; padding: 24px; font-style: italic;">No bookings found.</td></tr>';
    teaserBody.innerHTML = emptyRow;
    fullBody.innerHTML = emptyRow;
    return;
  }

  bookings.forEach((b, index) => {
    const statusClass = b.status === 'confirmed' ? 'status-confirmed' : 
                        b.status === 'completed' ? 'status-completed' : 
                        b.status === 'cancelled' ? 'status-cancelled' : 'status-pending';

    const rowHtml = `
      <tr>
        <td><strong>${b.id}</strong></td>
        <td>${b.pujaName.split('(')[0].trim()}</td>
        <td>${b.panditName}</td>
        <td>${b.date} @ ${b.time}</td>
        <td><span class="status-badge ${statusClass}">${b.status.toUpperCase()}</span></td>
        <td><strong>${b.price}</strong></td>
      </tr>
    `;

    if (index < 3) {
      teaserBody.innerHTML += rowHtml;
    }

    const actionCell = b.status === 'confirmed' 
      ? `<button class="btn btn-ghost btn-sm" onclick="cancelBooking('${b.id}')" style="color:var(--crimson); border-color:var(--crimson);">Cancel</button>` 
      : `<span style="font-size:0.75rem; color:var(--text-muted);">No Action</span>`;

    const fullRowHtml = `
      <tr>
        <td><strong>${b.id}</strong></td>
        <td>${b.pujaName.split('(')[0].trim()}</td>
        <td>${b.panditName}</td>
        <td>${b.date} @ ${b.time}</td>
        <td><span class="status-badge ${statusClass}">${b.status.toUpperCase()}</span></td>
        <td><strong>${b.price}</strong></td>
        <td>${actionCell}</td>
      </tr>
    `;
    fullBody.innerHTML += fullRowHtml;
  });
}

// Cancel booking logic
function cancelBooking(id) {
  if (!confirm(`Are you sure you want to cancel booking ${id}?`)) return;

  const bookings = JSON.parse(localStorage.getItem('shrived-bookings') || '[]');
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = 'cancelled';
    localStorage.setItem('shrived-bookings', JSON.stringify(bookings));
    renderBookings();
    if (window.Shrived && window.Shrived.Toast) {
      window.Shrived.Toast.show('Booking cancelled successfully.', 'info');
    }
  }
}

// Download Samagri Checklist text file
function downloadSamagriList() {
  const content = `
=========================================
SHRIVED. — PUJA SAMAGRI CHECKLIST
=========================================
Puja Ceremony: Satyanarayan Vrat Katha
Assigned Pandit: Babul Nana
Contact details: 7003220662

Please verify that the following items are ready or arranged:

A. ESSENTIAL RITUAL ITEMS:
1. Lord Satyanarayan Picture/Idol
2. Copper Kalash (Ghat) - 1 pc
3. Coconuts with fiber - 2 pcs
4. Mango Leaves - 5 or 7 pcs
5. Panchamrita (Milk, Curd, Ghee, Honey, Sugar)
6. Flowers (Marigold, Roses) - 1 bunch
7. Tulsi leaves - 1 bowl
8. Betel leaves - 15 pcs
9. Betel nuts (Supari) - 10 pcs
10. Ghee Diya & Dhoop agarbatti

B. PREPARATIONS FOR PRASAD:
- Shini Prasad (Wheat flour, Sugar, Banana, Ghee, Milk)

🕉️ Note: Our Pandit Babul Nana will coordinate details directly on WhatsApp at 7003220662.
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Puja_Samagri_Checklist.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
