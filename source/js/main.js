document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-item > div');
    const tabLinks = document.querySelectorAll('.tab-link a');
    
    tabs.forEach(tab => tab.id !== 'home' ? tab.style.display = 'none' : null);

    tabLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const tabId = this.getAttribute('href').substr(1);

            tabs.forEach(tab => tab.id === tabId ? tab.style.display = 'block' : tab.style.display = 'none');
        });
    });

    anime({
        targets: '.tab-link a',
        translateY: [-10, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic',
        delay: anime.stagger(200),
        complete: function() {
            document.getElementById('bio-container').style.display = 'flex';
            animateBioContainer();
        }
    });

    function animateBioContainer() {
        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '#bio-container',
                opacity: [0, 1],
                translateY: [-50, 0],
                rotate: '1turn',
                duration: 450,
                delay: 300
            })
            .add({
                targets: '#bio-avatar, #bio-text',
                opacity: [0, 1],
                translateX: [-50, 0],
                duration: 1000,
                offset: '-=1200'
            });
    }

    const bioAvatar = document.getElementById('bio-avatar');
    bioAvatar.addEventListener('mouseenter', function() {
        this.classList.add('rotate');
    });

    bioAvatar.addEventListener('mouseleave', function() {
        this.classList.remove('rotate');
    });
});