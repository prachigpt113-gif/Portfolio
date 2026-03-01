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

