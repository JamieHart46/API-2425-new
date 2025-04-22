import './index.css';

function navigateWithTransition(event) {
    event.preventDefault();
  
    const url = event.target.closest('a').href;
  
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.href = url;
      });
    } else {
      window.location.href = url;
    }
  }
  
  document.querySelectorAll('a.clubs').forEach(link => {
    link.addEventListener('click', navigateWithTransition);
  });
