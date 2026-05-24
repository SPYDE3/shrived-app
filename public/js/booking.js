// ============================================================
// SHRIVED. — Booking Calendar and Flow Module
// ============================================================

'use strict';

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDateStr = '';
let selectedTimeStr = '';

const pujaPricing = {
  grihapravesh: { name: 'Griha Pravesh (House Warming)' },
  satyanarayan: { name: 'Satyanarayan Vrat Katha' },
  durga: { name: 'Bengali Durga Puja Rituals' },
  odia: { name: 'Odia Sudasha Brata / Laxmi Puja' },
  marriage: { name: 'Traditional Hindu Marriage' },
  havan: { name: 'Ganesh Puja & Havan Combo' },
  'sudasha-brata': { name: 'Odia Sudasha Brata Special' },
  'lokkhi-puja': { name: 'Kojagori Lokkhi Puja' },
  'grihapravesh-vastu': { name: 'Griha Pravesh & Vastu Combo' }
};

document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  parseQueryParams();
  calculateSummary();
});

// ===== QUERY PARAMETERS =====
function parseQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const puja = params.get('puja');

  if (puja) {
    const select = document.getElementById('puja-type');
    if (select.querySelector(`option[value="${puja}"]`)) {
      select.value = puja;
    } else if (pujaPricing[puja]) {
      const opt = document.createElement('option');
      opt.value = puja;
      opt.textContent = pujaPricing[puja].name;
      opt.selected = true;
      select.appendChild(opt);
    }
  }
}

// ===== CALENDAR WIDGET =====
function renderCalendar() {
  const container = document.getElementById('calendar-days-container');
  const monthYearLabel = document.getElementById('calendar-month-year');
  if (!container || !monthYearLabel) return;

  container.innerHTML = '';
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthYearLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const today = new Date();

  // Prev month filler days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day other-month disabled';
    dayDiv.textContent = prevMonthTotalDays - i;
    container.appendChild(dayDiv);
  }

  // Active month days
  for (let d = 1; d <= totalDays; d++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.textContent = d;

    const cellDate = new Date(currentYear, currentMonth, d);
    
    // Check if cell is today
    if (cellDate.toDateString() === today.toDateString()) {
      dayDiv.classList.add('today');
    }

    // Disable past dates
    if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      dayDiv.classList.add('disabled');
    } else {
      // Add click listener
      dayDiv.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
        dayDiv.classList.add('selected');
        
        selectedDateStr = `${monthNames[currentMonth]} ${d}, ${currentYear}`;
        document.getElementById('selected-date').value = selectedDateStr;
        calculateSummary();
      });

      // Maintain selection state if rerendered
      const compareStr = `${monthNames[currentMonth]} ${d}, ${currentYear}`;
      if (selectedDateStr === compareStr) {
        dayDiv.classList.add('selected');
      }
    }

    container.appendChild(dayDiv);
  }
}

function changeMonth(dir) {
  currentMonth += dir;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

// ===== TIME SLOTS =====
function selectTimeSlot(element) {
  document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  selectedTimeStr = element.dataset.time;
  document.getElementById('selected-time').value = selectedTimeStr;
  calculateSummary();
}

// ===== CALCULATE SUMMARY =====
function calculateSummary() {
  const pujaSelect = document.getElementById('puja-type');
  const samagriSelect = document.getElementById('samagri-opt');

  const sumPujaName = document.getElementById('sum-puja-name');
  const sumDateTime = document.getElementById('sum-date-time');
  const sumSamagri = document.getElementById('sum-samagri');

  if (!pujaSelect) return;

  let pujaName = 'None Selected';

  const selectedPujaVal = pujaSelect.value;
  if (selectedPujaVal) {
    const opt = pujaSelect.options[pujaSelect.selectedIndex];
    pujaName = opt.textContent.split('(')[0].trim();
  }

  sumPujaName.textContent = pujaName;

  // Samagri selection
  let samagriLabel = 'Self Arrangement';
  if (samagriSelect) {
    const sOpt = samagriSelect.options[samagriSelect.selectedIndex];
    if (sOpt.value === 'basic') {
      samagriLabel = 'Standard Samagri arranged by Shrived.';
    } else if (sOpt.value === 'premium') {
      samagriLabel = 'Premium Samagri & Flowers arranged by Shrived.';
    }
  }
  sumSamagri.textContent = samagriLabel;

  // Date and Time slot
  if (selectedDateStr && selectedTimeStr) {
    sumDateTime.textContent = `${selectedDateStr} @ ${selectedTimeStr}`;
  } else if (selectedDateStr) {
    sumDateTime.textContent = `${selectedDateStr}`;
  } else {
    sumDateTime.textContent = 'Choose slot';
  }
}

// ===== BOOKING SUBMISSION (Redirect to WhatsApp) =====
function handleBookingSubmit(event) {
  event.preventDefault();

  if (!selectedDateStr) {
    if (window.Shrived && window.Shrived.Toast) {
      window.Shrived.Toast.show('Please select a puja date from the calendar.', 'error');
    }
    return;
  }
  if (!selectedTimeStr) {
    if (window.Shrived && window.Shrived.Toast) {
      window.Shrived.Toast.show('Please choose an auspicious Muhurtam time slot.', 'error');
    }
    return;
  }

  const name = document.getElementById('user-name').value;
  const phone = document.getElementById('user-phone').value;
  const email = document.getElementById('user-email').value;
  const localitySelect = document.getElementById('user-locality');
  const locality = localitySelect.options[localitySelect.selectedIndex].textContent;
  const address = document.getElementById('user-address').value;
  const notes = document.getElementById('user-notes').value || 'None';
  
  const pujaSelect = document.getElementById('puja-type');
  const pujaName = pujaSelect.options[pujaSelect.selectedIndex].textContent;
  const pujaLangSelect = document.getElementById('puja-lang');
  const pujaLang = pujaLangSelect.options[pujaLangSelect.selectedIndex].textContent;

  const samagriSelect = document.getElementById('samagri-opt');
  const samagri = samagriSelect.options[samagriSelect.selectedIndex].textContent;

  // Save to simulated dashboard logs
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `SHR-2026-${randNum}`;
  const booking = {
    id: bookingId,
    name: name,
    phone: phone,
    email: email,
    address: address,
    pujaName: pujaName,
    panditName: 'Babul Nana',
    date: selectedDateStr,
    time: selectedTimeStr,
    price: 'WhatsApp Consult',
    status: 'confirmed',
    timestamp: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem('shrived-bookings') || '[]');
  existing.push(booking);
  localStorage.setItem('shrived-bookings', JSON.stringify(existing));

  // Build clean WhatsApp message string
  const textMsg = `Pranam Babul Nana!\n\nI'd like to book a Puja service. Here are my details:\n🕉️ Ceremony: ${pujaName}\n🗣️ Language: ${pujaLang}\n🌾 Samagri Option: ${samagri}\n📅 Date: ${selectedDateStr}\n⏰ Time: ${selectedTimeStr}\n👤 Name: ${name}\n📞 WhatsApp: ${phone}\n📍 Locality: ${locality}\n🏠 Address: ${address}\n📝 Notes: ${notes}\n\nPlease confirm my slot and advise on custom arrangements. Thank you!`;
  
  // Format URL and redirect
  const waUrl = `https://wa.me/917003220662?text=${encodeURIComponent(textMsg)}`;
  
  if (window.Shrived && window.Shrived.Toast) {
    window.Shrived.Toast.show('Details compiled! Launching WhatsApp chat...', 'success');
  }

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 1000);
}
