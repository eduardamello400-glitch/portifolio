// Inicialização do site
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Navbar dinâmico ao rolar a página
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm', 'py-2');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.remove('shadow-sm', 'py-2');
            navbar.classList.add('py-3');
        }
    });

    // 2. Manipulação do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.disabled = true;
            btn.innerText = 'Enviando...';
            
            setTimeout(() => {
                alert('Obrigada por entrar em contato! Sua mensagem foi enviada com sucesso.');
                contactForm.reset();
                btn.disabled = false;
                btn.innerText = originalText;
            }, 1500);
        });
    }

    // 3. Ativar animações ao rolar (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    // Selecionar elementos para animar
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .section-title, #sobre img');
    animateElements.forEach(el => {
        el.style.opacity = '0'; // Esconde inicialmente
        observer.observe(el);
    });

    // 4. Scroll suave para links da navbar (melhoria de compatibilidade)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Fecha o menu mobile se estiver aberto
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
});
