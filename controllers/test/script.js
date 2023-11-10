function showConfetti() {
    const confettiCanvas = document.getElementById("confetti");
    const ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const colors = ["#f44336", "#ff9800", "#ffeb3b", "#4caf50", "#2196f3", "#9c27b0"];

    function createConfettiParticle() {
        return {
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - 10,
            radius: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 1,
            angle: Math.random() * Math.PI * 2,
            rotation: Math.random() * Math.PI
        };
    }

    function drawConfettiParticle(particle) {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.moveTo(-particle.radius, -particle.radius);
        ctx.lineTo(particle.radius, -particle.radius);
        ctx.lineTo(particle.radius, particle.radius);
        ctx.lineTo(-particle.radius, particle.radius);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function updateConfettiParticle(particle) {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.rotation += 0.1;
        if (particle.y > confettiCanvas.height) {
            particle.y = -10;
        }
    }

    const confettiParticles = [];

    for (let i = 0; i < 100; i++) {
        confettiParticles.push(createConfettiParticle());
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        for (const particle of confettiParticles) {
            updateConfettiParticle(particle);
            drawConfettiParticle(particle);
        }
        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}
