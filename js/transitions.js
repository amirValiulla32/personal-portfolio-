// Page transitions
function initPageTransitions() {
    document.querySelectorAll('a').forEach(link => {
        if (link.href.includes(window.location.origin)) {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = link.href;
                document.body.classList.add('page-transition');
                
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initPageTransitions); 