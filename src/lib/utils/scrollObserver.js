export function scrollObserver(node, callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const finalOptions = {...defaultOptions, ...options};
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, finalOptions);

  observer.observe(node);
  
  return {
    destroy() {
      observer.unobserve(node);
    }
  };
}