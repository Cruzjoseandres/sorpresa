document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("stars-container");
    const numStars = 150;

    // Create ambient stars / floating fireflies
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.classList.add("star");

        // Random position, size, and animation duration
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let size = Math.random() * 4 + 1; // 1 to 5px
        let duration = Math.random() * 6 + 4; // 4 to 10s
        let delay = Math.random() * 5;

        // Ensure rendering on GPU with translate3d initially
        star.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
        // Using fixed positioning and transform vs top/left is faster
        star.style.position = "absolute";
        star.style.top = "0";
        star.style.left = "0";
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        // Magical colors
        const colors = ["#ffffff", "#ffb6c1", "#ff69b4", "#fdd5e5", "#ffd700"];
        star.style.background = colors[Math.floor(Math.random() * colors.length)];
        star.style.boxShadow = `0 0 ${size * 3}px ${star.style.background}`;

        starsContainer.appendChild(star);
    }

    // Add interactivity to the tulips (flowers)
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(flower => {
        flower.addEventListener('click', (e) => {
            createBurst(e.clientX, e.clientY);
        });
    });

    // Also add some random floating petals periodically
    // Using requestAnimationFrame to only add DOM elements during frame periods
    let lastTime = 0;
    function dropPetalsLoop(timestamp) {
        if (timestamp - lastTime > 2000) {
            createFallingPetal();
            lastTime = timestamp;
        }
        requestAnimationFrame(dropPetalsLoop);
    }
    requestAnimationFrame(dropPetalsLoop);

    function createFallingPetal() {
        let petal = document.createElement("div");
        petal.classList.add("star");

        let x = Math.random() * 100;
        let size = Math.random() * 10 + 5;

        petal.style.position = "absolute";
        petal.style.top = "0";
        petal.style.left = "0";
        // Starting position with GPU transform
        petal.style.transform = `translate3d(${x}vw, -20px, 0)`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.borderRadius = "50% 0 50% 0";
        petal.style.background = "linear-gradient(135deg, #ff69b4, #ff1493)";
        petal.style.boxShadow = "0 0 10px #ff1493";
        petal.style.opacity = "0.7";

        // hardware-accelerated transition
        petal.style.transition = "transform 8s linear";
        starsContainer.appendChild(petal);

        // Force reflow and start animation
        requestAnimationFrame(() => {
            petal.style.transform = `translate3d(${x}vw, 110vh, 0) rotate(${Math.random() * 720}deg)`;
        });

        setTimeout(() => {
            if (starsContainer.contains(petal)) {
                petal.remove();
            }
        }, 8000);
    }

    // Function to create burst effect on flower click
    function createBurst(startX, startY) {
        for (let i = 0; i < 20; i++) {
            let particle = document.createElement("div");
            particle.classList.add("star");
            particle.style.position = "fixed";
            particle.style.top = "0";
            particle.style.left = "0";

            // Start at origin
            particle.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;

            let size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.borderRadius = "50%";

            const burstColors = ["#ff1493", "#ff69b4", "#ffd700", "#ff8a65"];
            particle.style.background = burstColors[Math.floor(Math.random() * burstColors.length)];
            particle.style.boxShadow = `0 0 15px ${particle.style.background}`;

            let angle = Math.random() * Math.PI * 2;
            let velocity = Math.random() * 150 + 50;
            // destination coordinates relative to start position (calculated entirely using translate3d)
            let moveX = startX + (Math.cos(angle) * velocity);
            let moveY = startY + (Math.sin(angle) * velocity);

            particle.style.transition = "all 1s cubic-bezier(0.1, 0.8, 0.3, 1)";
            starsContainer.appendChild(particle);

            requestAnimationFrame(() => {
                particle.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(0)`;
                particle.style.opacity = "0";
            });

            setTimeout(() => {
                if (starsContainer.contains(particle)) {
                    particle.remove();
                }
            }, 1000);
        }
    }
});
