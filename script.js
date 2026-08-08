// Identifiant et mot de passe
const USERNAME = "Jeanne";
const PASSWORD = "22h22";

const form = document.getElementById("login-form");
const privateContent = document.getElementById("private-content");
const imageArea = document.getElementById("image-area");

// ------------------------------
// LISTE DES 22 IMAGES
// ------------------------------
const images = [
    "images/Lilou.jpg.JPG", "images/Jules.jpeg", "images/Adam Bo.JPG", "images/Adam Be.JPG",
    "images/Emilie.JPG", "images/Lénita.JPG", "images/Martine.JPG", "images/Maxire.JPG",
    "images/Laura.JPG", "images/Lilie.JPG", "images/Léo.jpg", "images/Christian.JPEG",
    "images/Milo.jpg", "images/Sandra.jpg", "images/Damien.jpg", "images/Claire.JPG",
    "images/Josiane.PNG", "images/Elise.jpg", "images/Thomas.jpg", "images/Surprise.jpg",
    "images/Kakou.jpg", "images/img22.jpg"
];

// ------------------------------
// CONNEXION
// ------------------------------
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === USERNAME && pass === PASSWORD) {
        form.style.display = "none";
        privateContent.style.display = "block";
        launchCelebration();   // Confettis + 22 3D
        startImageSystem();    // Animation des images
    } else {
        alert("Identifiant ou mot de passe incorrect");
    }
});

// ------------------------------
// SYSTÈME D’IMAGES ANIMÉES
// ------------------------------
function startImageSystem() {
    const objects = [];

    images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("moving-img");

        // Position aléatoire
        img.style.left = Math.random() * (imageArea.clientWidth - 120) + "px";
        img.style.top = Math.random() * (imageArea.clientHeight - 120) + "px";

        // POP-UP quand on clique sur une image
        img.addEventListener("click", () => {
            document.getElementById("popup-img").src = src;
            document.getElementById("popup-text").textContent = "Bon anniversaire !!";
            document.getElementById("popup").style.display = "flex";
        });

        imageArea.appendChild(img);

        // VITESSE TRÈS LENTE
        const slowSpeed = () => (Math.random() * 0.3 + 0.2) * (Math.random() < 0.5 ? -1 : 1);

        objects.push({
            el: img,
            x: parseFloat(img.style.left),
            y: parseFloat(img.style.top),
            vx: slowSpeed(),
            vy: slowSpeed()
        });
    });

    // Animation
    function animate() {
        objects.forEach(obj => {
            obj.x += obj.vx;
            obj.y += obj.vy;

            // Rebonds sur les bords
            if (obj.x <= 0 || obj.x >= imageArea.clientWidth - 120) obj.vx *= -1;
            if (obj.y <= 0 || obj.y >= imageArea.clientHeight - 120) obj.vy *= -1;

            obj.el.style.left = obj.x + "px";
            obj.el.style.top = obj.y + "px";
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ------------------------------
// FERMETURE DU POP-UP
// ------------------------------
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
});

// ------------------------------
// ANIMATION 22 + CONFETTIS
// ------------------------------
function launchCelebration() {
    // Affiche le 22 en 3D
    const number = document.getElementById("number-22");
    number.style.display = "block";

    // Le cache après 2,5 secondes
    setTimeout(() => {
        number.style.display = "none";
    }, 2500);

    // Confettis
    createConfetti(300);
}

function createConfetti(count) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
        const conf = document.createElement("div");
        conf.classList.add("confetti");

        // Départ : centre de l'écran
        conf.style.left = centerX + "px";
        conf.style.top = centerY + "px";

        const colors = ["#ff4757", "#3742fa", "#2ed573", "#ffa502", "#ff6b81"];
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(conf);

        // Angle aléatoire entre 0° et 360°
        const angle = Math.random() * Math.PI * 2;

        // Distance d'explosion
        const distance = Math.random() * 400 + 200;

        // Calcul du déplacement final
        const horizontalDistance = Math.cos(angle) * distance;
        const verticalDistance = Math.sin(angle) * distance;

        const duration = Math.random() * 1200 + 800;

        conf.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${horizontalDistance}px, ${verticalDistance}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: "ease-out",
            fill: "forwards"
        });

        setTimeout(() => conf.remove(), duration + 100);
    }
}
