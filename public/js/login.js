const form = document.getElementById('loginForm');
        const result = document.getElementById('loginResult');
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            if(!form.checkValidity()) { form.reportValidity(); return }
            // Demo login
            result.innerHTML = '<div class="success">Signed in as '+ (form.username.value || '') +'</div>';
            form.reset();
        })