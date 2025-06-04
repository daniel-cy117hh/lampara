document.addEventListener('DOMContentLoaded', function() {
    function setupSwitch(btnId) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        btn.addEventListener('click', function() {
            btn.classList.toggle('on');
            const span = btn.querySelector('span');
            const isOn = btn.classList.contains('on');
            if (isOn) {
                span.textContent = 'ON';
                document.getElementById('lamp-container').classList.add('lamp-on');
                document.body.classList.add('lamp-on');
                typeLoveMessage();
            } else {
                span.textContent = 'OFF';
                document.getElementById('lamp-container').classList.remove('lamp-on');
                document.body.classList.remove('lamp-on');
                resetLoveMessage();
            }
        });
    }
    setupSwitch('desktop-btn');
    setupSwitch('mobile-btn');

    // Efecto máquina de escribir para el mensaje
    const msgEl = document.getElementById('love-message');
    const msgText = msgEl ? msgEl.textContent : '';
    function typeLoveMessage() {
        if (!msgEl) return;
        msgEl.textContent = '';
        let i = 0;
        function type() {
            if (i <= msgText.length) {
                msgEl.textContent = msgText.slice(0, i);
                i++;
                setTimeout(type, 60);
            }
        }
        type();
    }
    function resetLoveMessage() {
        if (!msgEl) return;
        msgEl.textContent = '';
    }

    const audio = document.getElementById('lamp-audio');
    const desktopBtn = document.getElementById('desktop-btn');
    const mobileBtn = document.getElementById('mobile-btn');
    const lampGlow = document.getElementById('lamp-glow');
    const lampBulb = document.getElementById('lamp-bulb');
    const lampContainer = document.getElementById('lamp-container');
    const loveMessage = document.getElementById('love-message');

    let lampOn = false;
    let lampAnimated = false;

    function toggleLampAndMusic() {
        lampOn = !lampOn;

        // Cambia la opacidad de la luz de la lámpara
        if (lampGlow && lampBulb) {
            lampGlow.style.opacity = lampOn ? '1' : '0';
            lampBulb.style.opacity = lampOn ? '1' : '0';
        }

        // Cambia el texto de los botones
        desktopBtn.querySelector('span').textContent = lampOn ? 'ON' : 'OFF';
        mobileBtn.querySelector('span').textContent = lampOn ? 'ON' : 'OFF';

        // Controla la música
        if (lampOn) {
            audio.currentTime = 0;
            audio.play();

            if (!lampAnimated) {
                lampAnimated = true;
                lampContainer.classList.add('lamp-down');
                // Espera a que termine la animación de bajada (2.5s), luego espera 3s más antes de mostrar el mensaje
                setTimeout(() => {
                    setTimeout(() => {
                        showLoveMessage();
                    }, 3000); // 3 segundos después de bajar
                }, 2500); // tiempo de bajada de la lámpara
            } else {
                setTimeout(() => {
                    showLoveMessage();
                }, 3000);
            }
        } else {
            audio.pause();
            audio.currentTime = 0;
            loveMessage.classList.add('hidden');
        }
    }

    desktopBtn.addEventListener('click', toggleLampAndMusic);
    mobileBtn.addEventListener('click', toggleLampAndMusic);
});