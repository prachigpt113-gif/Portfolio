const video = document.getElementById('myVideo');

const options = {
  root: null, // use the viewport
  threshold: 0.5 // play when 50% of the video is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      video.play();
      // This line ensures it only triggers the "play" command once
      observer.unobserve(entry.target);
    }
  });
}, options);

observer.observe(video);

function toggleResume(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('resumeDropdown');
  dropdown.classList.toggle('open');
}

// Close when clicking anywhere else
document.addEventListener('click', () => {
  document.getElementById('resumeDropdown').classList.remove('open');
});

function filterProjects(btn) {
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Move the pill
  const pill = document.querySelector('.toggle-pill');
  const isRight = btn.getAttribute('data-filter') === 'cx';
  pill.style.transform = isRight ? 'translateX(100%)' : 'translateX(0)';

  // Fade cards
  const filter = btn.getAttribute('data-filter');
  document.querySelectorAll('.P-sec').forEach(card => {
    const tracks = card.getAttribute('data-track') || '';
    const matches = tracks.includes(filter);

    if (matches) {
      card.style.display = 'block';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.add('visible');
          card.classList.remove('hidden');
        });
      });
    } else {
      card.classList.add('hidden');
      card.classList.remove('visible');
      card.addEventListener('transitionend', () => {
        if (card.classList.contains('hidden')) card.style.display = 'none';
      }, { once: true });
    }
  });
}

// Set initial state on load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.toggle-pill').style.transform = 'translateX(0)';
  
  // set initial card visibility
  document.querySelectorAll('.P-sec').forEach(card => {
    const tracks = card.getAttribute('data-track') || '';
    if (tracks.includes('analytics')) {
      card.classList.add('visible');
    } else {
      card.classList.add('hidden');
      card.style.display = 'none';
    }
  });
});