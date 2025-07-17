document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const closeMessageBox = document.getElementById('closeMessageBox');

    function showMessageBox(message) {
        if (messageText && messageBox) {
            messageText.textContent = message;
            messageBox.classList.add('show');
        }
    }

    function hideMessageBox() {
        if (messageBox) {
            messageBox.classList.remove('show');
        }
    }

    if (closeMessageBox) {
        closeMessageBox.addEventListener('click', hideMessageBox);
    }

    if (messageBox) {
        messageBox.addEventListener('click', (e) => {
            if (e.target === messageBox) {
                hideMessageBox();
            }
        });
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('loginEmail') ? document.getElementById('loginEmail').value.trim() : '';
            const password = document.getElementById('loginPassword') ? document.getElementById('loginPassword').value.trim() : '';

            if (email === '' || password === '') {
                showMessageBox('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                showMessageBox('Please enter a valid email address.');
                return;
            }

            console.log('Login attempt:', { email, password });
            showMessageBox('Login successful! Redirecting to dashboard...');
            setTimeout(() => {
                window.location.href = 'loading.html';
            }, 1500);
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('signupName') ? document.getElementById('signupName').value.trim() : '';
            const email = document.getElementById('signupEmail') ? document.getElementById('signupEmail').value.trim() : '';
            const password = document.getElementById('signupPassword') ? document.getElementById('signupPassword').value.trim() : '';
            const confirmPassword = document.getElementById('confirmPassword') ? document.getElementById('confirmPassword').value.trim() : '';

            if (name === '' || email === '' || password === '' || confirmPassword === '') {
                showMessageBox('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                showMessageBox('Please enter a valid email address.');
                return;
            }

            if (password.length < 6) {
                showMessageBox('Password must be at least 6 characters long.');
                return;
            }

            if (password !== confirmPassword) {
                showMessageBox('Passwords do not match.');
                return;
            }

            console.log('Sign-up attempt:', { name, email, password });
            showMessageBox('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        });
    }
});
