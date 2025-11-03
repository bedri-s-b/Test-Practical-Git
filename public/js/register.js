       // Simple client-side validation with password strength indicator.
        const form = document.getElementById('registerForm');
        const password = document.getElementById('password');
        const confirm = document.getElementById('confirm');
        const pwBar = document.getElementById('pwStrengthBar');
        const pwError = document.getElementById('pwError');
        const confirmError = document.getElementById('confirmError');
        const result = document.getElementById('result');
        const resetBtn = document.getElementById('resetBtn');

        function scorePassword(pw) {
            let score = 0;
            if (!pw) return 0;
            if (pw.length >= 8) score += 1;
            if (pw.length >= 12) score += 1;
            if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1;
            if (/\d/.test(pw)) score += 1;
            if (/[^A-Za-z0-9]/.test(pw)) score += 1;
            return score; // 0..5
        }

        function updateStrength() {
            const s = scorePassword(password.value);
            const pct = Math.round((s / 5) * 100);
            pwBar.style.width = pct + '%';
            if (s <= 1) {
                pwBar.style.background = '#ef4444';
            } else if (s <= 3) {
                pwBar.style.background = '#f59e0b';
            } else {
                pwBar.style.background = 'linear-gradient(90deg,#84cc16,#06b6d4)';
            }
        }

        password.addEventListener('input', () => {
            updateStrength();
            pwError.hidden = true;
            confirmError.hidden = true;
        });

        confirm.addEventListener('input', () => {
            confirmError.hidden = true;
        });

        resetBtn.addEventListener('click', () => {
            form.reset();
            pwBar.style.width = '0%';
            pwError.hidden = true;
            confirmError.hidden = true;
            result.innerHTML = '';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Clear prior messages
            pwError.hidden = true;
            confirmError.hidden = true;
            result.innerHTML = '';

            // Use browser validation first
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Password checks
            if (password.value.length < 8) {
                pwError.textContent = 'Password must be at least 8 characters.';
                pwError.hidden = false;
                password.focus();
                return;
            }
            if (password.value !== confirm.value) {
                confirmError.textContent = 'Passwords do not match.';
                confirmError.hidden = false;
                confirm.focus();
                return;
            }

            // Simulate successful registration (replace with real submission)
            const data = {
                firstName: form.firstName.value.trim(),
                lastName: form.lastName.value.trim(),
                username: form.username.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim()
            };

            result.innerHTML = '<div class="success">Account created successfully for ' + (data.username || data.email) + '.</div>';
            form.reset();
            pwBar.style.width = '0%';
        });