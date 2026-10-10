/**
 * Lightweight toast notifications. Ported from original_script.js (which is
 * never loaded by the React app) into a real, importable helper so pages can
 * call showToast(message, type) directly instead of the undefined
 * window.showToast.
 */
export function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
  };

  const toast = document.createElement('div');
  toast.className = 'toast ' + (type || 'info');
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i>${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}
