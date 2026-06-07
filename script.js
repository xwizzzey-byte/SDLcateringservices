
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade').forEach(el => observer.observe(el));
document.querySelectorAll('form[data-mailto]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('SDL Catering Enquiry');
    const body = encodeURIComponent(
      'Name: ' + (data.get('name') || '') + '\n' +
      'Email: ' + (data.get('email') || '') + '\n' +
      'Phone: ' + (data.get('phone') || '') + '\n' +
      'Event Type: ' + (data.get('event') || '') + '\n' +
      'Event Date: ' + (data.get('date') || '') + '\n\n' +
      'Message:\n' + (data.get('message') || '')
    );
    window.location.href = 'mailto:sdlcateringservices@gmail.com?subject=' + subject + '&body=' + body;
  });
});
