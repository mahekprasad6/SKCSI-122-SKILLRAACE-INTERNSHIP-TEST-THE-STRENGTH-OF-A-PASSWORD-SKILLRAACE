document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('password-strength');
    const passwordFeedback = document.getElementById('password-feedback');

    passwordInput.addEventListener('input', updatePasswordStrength);

    function updatePasswordStrength() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        
        passwordStrength.textContent = `Password Strength: ${strength.label}`;
        
        passwordFeedback.innerHTML = strength.feedback.join('<br>');

        // Remove previous glow and text color classes
        passwordInput.classList.remove('weak-glow', 'medium-glow', 'strong-glow');
        passwordStrength.classList.remove('weak-text', 'medium-text', 'strong-text');

        // Add new glow and text color class based on strength
        if (strength.class === 'weak') {
            passwordInput.classList.add('weak-glow');
            passwordStrength.classList.add('weak-text');
        } else if (strength.class === 'medium') {
            passwordInput.classList.add('medium-glow');
            passwordStrength.classList.add('medium-text');
        } else if (strength.class === 'strong') {
            passwordInput.classList.add('strong-glow');
            passwordStrength.classList.add('strong-text');
        }
    }

    function checkPasswordStrength(password) {
        let score = 0;
        let feedback = [];

        if (password.length >= 8) score++;
        else feedback.push('Password should be at least 8 characters long.');

        if (/[A-Z]/.test(password)) score++;
        else feedback.push('Password should contain at least one uppercase letter.');

        if (/[a-z]/.test(password)) score++;
        else feedback.push('Password should contain at least one lowercase letter.');

        if (/[0-9]/.test(password)) score++;
        else feedback.push('Password should contain at least one number.');

        if (/[^A-Za-z0-9]/.test(password)) score++;
        else feedback.push('Password should contain at least one special character.');

        let strength = { label: '', class: '', feedback: feedback };

        switch (score) {
            case 1:
            case 2:
                strength.label = 'Weak';
                strength.class = 'weak';
                break;
            case 3:
            case 4:
                strength.label = 'Medium';
                strength.class = 'medium';
                break;
            case 5:
                strength.label = 'Strong';
                strength.class = 'strong';
                break;
            default:
                strength.label = '';
                strength.class = '';
                break;
        }

        return strength;
    }
});
