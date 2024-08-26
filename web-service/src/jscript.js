  // Check if the user is logged in
  document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'index.html'; // Redirect to login page if not logged in
    } else {
      getProtectedContent();
    }
  });

  // Function to fetch protected content
  async function getProtectedContent() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://moment4-2-dt207g.onrender.com/api/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      document.getElementById('protected-message').innerText = data.message || data.error;
    } catch (error) {
      document.getElementById('protected-message').innerText = 'Failed to load protected content';
    }
  }

  // Logout function
  function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html'; // Redirect to login page after logout
  }