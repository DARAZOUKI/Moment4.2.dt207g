async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
  
    try {
      const response = await fetch('https://moment4-2-dt207g.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        document.getElementById('register-message').innerText = errorData.error || 'An error occurred';
      } else {
        const data = await response.json();
        document.getElementById('register-message').innerText = data.message || 'Registration successful';
      }
    } catch (error) {
      console.error('Error during registration:', error);
      document.getElementById('register-message').innerText = 'An error occurred';
    }
  }
  
  async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    const response = await fetch('https://moment4-2-dt207g.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      document.getElementById('login-message').innerText = 'Login successful!';
      document.getElementById('protected-content').style.display = 'block';
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('register-form').style.display = 'none';
    } else {
      document.getElementById('login-message').innerText = data.error;
    }
  }
  
  async function getProtectedContent() {
    const token = localStorage.getItem('token');
    const response = await fetch('https://moment4-2-dt207g.onrender.com/api/protected', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  }
    });
  
    const data = await response.json();
    document.getElementById('protected-message').innerText = data.message || data.error;
  }
  
  function logout() {
    localStorage.removeItem('token');
    document.getElementById('protected-content').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'block';
    
    // Clear the input fields and messages
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('register-message').innerText = '';
    document.getElementById('login-message').innerText = '';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
      document.getElementById('protected-content').style.display = 'block';
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('register-form').style.display = 'none';
    } else {
      // Clear the input fields and messages on page load
      document.getElementById('register-username').value = '';
      document.getElementById('register-password').value = '';
      document.getElementById('login-username').value = '';
      document.getElementById('login-password').value = '';
      document.getElementById('register-message').innerText = '';
      document.getElementById('login-message').innerText = '';
    }
  });
  document.getElementById('register-button').addEventListener('click', register);
document.getElementById('login-button').addEventListener('click', login);
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