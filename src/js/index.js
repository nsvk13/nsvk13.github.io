var links = document.getElementsByClassName('link');
var dividers = document.getElementsByClassName('divider');

var container = document.getElementById('container');
var btnContainer = document.getElementById('btn-container');

/**
 * @type {HTMLAudioElement}
 */
var audio = document.getElementById('audio');
var control = document.getElementById('control');

var vol_add = document.getElementById('vol-add');
var vol_reduce = document.getElementById('vol-reduce');

var PAUSED = true;
var VOLUME = 30;

var vol_timeout;

control.onclick = (e) => {
    e.preventDefault();
    audio.volume = VOLUME / 100;
    if (vol_timeout) return;
    if (PAUSED) {
        audio.play();
        control.innerHTML = "pause";
    } else {
        audio.pause();
        control.innerHTML = "play";
    }

    PAUSED = !PAUSED;
};

vol_add.onclick = (e) => {
    e.preventDefault();
    volume(5);
}

vol_reduce.onclick = (e) => {
    e.preventDefault();
    volume(-5);
}

function volume(n) {
    const future = VOLUME + n;
    if (future >= 5 && future <= 100) {
        VOLUME = future;
        audio.volume = VOLUME / 100;
    }
    if (vol_timeout) clearTimeout(vol_timeout);
    control.innerHTML = `${VOLUME}%`;
    vol_timeout = setTimeout(() => {
        control.innerHTML = PAUSED ? 'play' : 'pause';
        vol_timeout = undefined;
    }, 1000);
}

const TEXTS = {
    bio: [
        `from an early age i was interested in how everything works: starting from game servers, ending by web3.`,
        `now, i\'m a coder, designer, devops, project manager & lot more, experienced by years from 2017~.`,
        `always open for collaborations (& just talk) with interestings people.`,
    ],
    knowledge: [
        `technologies:`,
        `web, desktop, web3, cryptography, data processing.`,
        `langs:`,
        `nodejs, electronjs, python (which i hate btw).`,
        `data processing:`,
        `sql, mongodb, grafana, postgresql, redis.`,
        `devops:`,
        `nginx, cloudflare, iptables, docker, k8s, ci/cd, l3-l4 proto.`,
        `want to:`,
        `rust, typescript, go, asm, uml, kernel proto, more hardware knowledge.`
    ],
    inspired: [
        `living:`,
        `people, nature, extreme sport, travel, thoughts, music.`,
        `people:`,
        `friends, family, pavel durov, oleg tinkoff, elon musk.`,
        `business:`,
        `e-services, project lead, realty, scalability.`,
        `music:`,
        `biv, bones, $uicideboy$, the prodigy, ivoxygen, cain, summer of haze, dan korshunov, 10age, axius link, big baby tape, kizaru.`
    ]
}

var textContainer = document.getElementById('text-container');
var text = document.getElementById('text');
var back = document.getElementById('back');
var TRANSITION = false;

var showText = (e, t) => {
    document.body.style.overflow = 'hidden';
    container.style.transform = `translateY(${btnContainer.clientHeight}px)`;
    for (const link of links) {
        link.style.color = "rgba(255,255,255,0)";
    }
    for (const divider of dividers) {
        divider.style.background = "rgba(255,255,255,0)";
    }
    text.innerHTML = TEXTS[t].join('<br><br>');
    setTimeout(() => {
        btnContainer.style.display = "none";
        textContainer.style.display = 'flex';
        textContainer.style.height = `30px`;

        const moveTo = btnContainer.clientHeight - ((textContainer.scrollHeight - 30)/2);
        const offset = 0 - (window.scrollY + container.getBoundingClientRect().top - 30);

        container.style.transform = `translateY(${moveTo < offset ? offset : moveTo}px)`;
    }, 500);
    setTimeout(() => {
        text.style.color = "rgba(255,255,255,0.5)";
    }, 600);
    setTimeout(() => {
        container.style.transition = "none";
        textContainer.style.height = 'fit-content';
        back.style = {};
        container.style.transform = 'none';
    }, 1000);
    setTimeout(() => {
        document.body.style.overflow = 'auto';
        container.style.transition = "all .5s";
        e.target.classList.remove(`act`);
        TRANSITION = false;
    }, 1100);
}

var processClick = (e, linkType) => {
    e.preventDefault();
    if (TRANSITION) return;
    TRANSITION = true;
    e.target.classList.add(`act`);
    if (linkType === 'back') {
        const curTr = textContainer.scrollHeight/2 + 10;
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, window.scrollY/2);
        container.style.transform = `translateY(${curTr}px)`;
        back.style.color = "transparent";
        text.style.color = "transparent";
        setTimeout(() => {
            container.style.transition = "none";
            var sh = textContainer.scrollHeight;
            textContainer.style.display = 'none';
            
            btnContainer.style.display = "flex";
            btnContainer.style.height = `${sh}px`;
            
        }, 500);
        setTimeout(() => {
            container.style.transition = "all .5s";
            container.style.transform = `translateY(${curTr - 25}px)`;
            for (const el of [...links, ...dividers]) {
                el.style = {};
            }
        }, 600);
        setTimeout(() => {
            container.style.transition = "none";
            btnContainer.style.height = `fit-content`;
            container.style.transform = '';
        }, 1000);
        setTimeout(() => {
            container.style.transition = "all .5s";
            document.body.style.overflow = 'auto';
            e.target.classList.remove(`act`);
            TRANSITION = false;
        }, 1100);
        // container.style.transform = '';
    } else return showText(e, linkType)
}

for (const link of links) {
    if (link.getAttribute('href') === '#') link.onclick = (e) => { return processClick(e, link.id) };
}