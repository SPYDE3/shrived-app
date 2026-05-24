document.addEventListener('DOMContentLoaded', () => {
  const reviewsContainer = document.querySelector('.reviews-carousel');
  if (!reviewsContainer) return;

  const reviews = [
    { name: 'Swapna Mohanty', location: 'Bellandur', rating: 5, text: 'We booked Bibhupada Mishra for our new flat\'s Griha Pravesh. Being Odia, we wanted someone who understands our traditions. Nana explained every mantra beautifully. Highly recommended!', avatar: 'fourth.jpeg', verified: true },
    { name: 'Debasish Banerjee', location: 'Sarjapur Road', rating: 5, text: 'For our baby\'s Annaprashan, we wanted an authentic priest. Bibhupada Mishra arrived perfectly on time and conducted the puja beautifully.', avatar: 'My_photo.jpeg', verified: true },
    { name: 'Nitin Sharma', location: 'Whitefield', rating: 5, text: 'Very premium and smooth contact. The Rudrabhishek puja was performed with full devotion. Excellent transparency.', avatar: 'two.jpeg', verified: true },
    { name: 'Priya Patel', location: 'HSR Layout', rating: 5, text: 'The Satyanarayan Katha was very peaceful. Very authentic samagri and the chanting was mesmerizing.', avatar: 'fourth.jpeg', verified: true },
    { name: 'Rajeev Kumar', location: 'Electronic City', rating: 4.8, text: 'Booked for marriage ceremony. Very traditional and professional service by Shrived team.', avatar: 'two.jpeg', verified: true }
  ];

  let html = '';
  reviews.forEach(r => {
    html += `
      <div class="review-card">
        <div class="reviewer-info">
          <img src="${r.avatar}" alt="${r.name}" class="reviewer-avatar">
          <div>
            <div class="reviewer-name">${r.name} ${r.verified ? '<i class="fa-solid fa-circle-check" style="color:var(--success); font-size:0.8rem;"></i>' : ''}</div>
            <div class="testimonial-role">${r.location}</div>
          </div>
        </div>
        <div class="review-rating">
          ${'⭐'.repeat(Math.floor(r.rating))}
        </div>
        <p class="review-text">"${r.text}"</p>
      </div>
    `;
  });

  reviewsContainer.innerHTML = html;

  // Auto-scroll
  let scrollInterval;
  const startScroll = () => {
    scrollInterval = setInterval(() => {
      const cardWidth = reviewsContainer.querySelector('.review-card').offsetWidth + 24; // width + gap
      reviewsContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
      
      // Reset to beginning if at end
      if (reviewsContainer.scrollLeft + reviewsContainer.clientWidth >= reviewsContainer.scrollWidth - 10) {
        setTimeout(() => {
          reviewsContainer.scrollTo({ left: 0, behavior: 'smooth' });
        }, 1000);
      }
    }, 4000);
  };

  startScroll();
  reviewsContainer.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  reviewsContainer.addEventListener('mouseleave', startScroll);
});
