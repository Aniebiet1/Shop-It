// Authentication Management
class Auth {
    constructor() {
        this.currentUser = db.getCurrentUser();
        this.updateAuthUI();
    }

    login(email, password) {
        const user = db.login(email, password);
        if (user) {
            this.currentUser = user;
            this.updateAuthUI();
            Utils.showNotification(`Welcome back, ${user.name}!`, 'success');
            app.showPage('home');
            return true;
        } else {
            Utils.showNotification('Invalid email or password', 'error');
            return false;
        }
    }

    register(name, email, password) {
        if (!Utils.isValidEmail(email)) {
            Utils.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        if (password.length < 6) {
            Utils.showNotification('Password must be at least 6 characters long', 'error');
            return false;
        }

        const user = db.register(name, email, password);
        if (user) {
            this.currentUser = user;
            this.updateAuthUI();
            Utils.showNotification(`Welcome, ${user.name}!`, 'success');
            app.showPage('home');
            return true;
        } else {
            Utils.showNotification('Email already exists', 'error');
            return false;
        }
    }

    logout() {
        db.logout();
        this.currentUser = null;
        this.updateAuthUI();
        cart.clearCart();
        Utils.showNotification('Logged out successfully', 'success');
        app.showPage('home');
    }

    updateAuthUI() {
        const userBtn = document.getElementById('userBtn');
        if (userBtn) {
            if (this.currentUser) {
                userBtn.innerHTML = `
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 14px;">
                        ${this.currentUser.name.charAt(0).toUpperCase()}
                    </div>
                `;
            } else {
                userBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                `;
            }
        }
    }

    showLogin() {
        const accountContent = document.getElementById('accountContent');
        if (accountContent) {
            accountContent.innerHTML = Components.createAuthForm('login');
            this.attachAuthEventListeners();
        }
    }

    showRegister() {
        const accountContent = document.getElementById('accountContent');
        if (accountContent) {
            accountContent.innerHTML = Components.createAuthForm('register');
            this.attachAuthEventListeners();
        }
    }

    attachAuthEventListeners() {
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(authForm);
                const email = formData.get('email');
                const password = formData.get('password');
                const name = formData.get('name');

                if (name) {
                    // Register
                    this.register(name, email, password);
                } else {
                    // Login
                    this.login(email, password);
                }
            });
        }
    }

    requireAuth() {
        if (!this.currentUser) {
            Utils.showNotification('Please login to continue', 'warning');
            app.showPage('account');
            this.showLogin();
            return false;
        }
        return true;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Create global auth instance
window.auth = new Auth();