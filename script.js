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
    "images/Josiane.PNG", "images/Elise.jpg", "images/Thomas.jpg", "images/Surprise.jpeg",
    "images/Kakou.jpeg", "images/Thémis.JPG"
];
// ------------------------------
// TEXTES SPÉCIAUX POUR CERTAINES IMAGES
// ------------------------------
const specialTexts = {
    "Kakou.jpeg": "Miaou Miaou !",
    "Surprise.jpeg": "Miaou !",
    "Christian.JPEG": "Oh la la ! Je viens d'attraper un gros loup !",
    "Maxire.JPG": "Joyeux anniversaire ma petite amoureuse, je suis tellement fier de qui tu es et de tout ce que tu as accomplie. Chaque jour que je passe avec toi me rappelle à quel point j’ai de la chance. J’espère que malgré la vieillesse tu continueras à me supporter. Je t’aime.",
    "Adam Be.JPG": "Coucou Jeanne ! Je te souhaite un merveilleux vingt-deuxième anniversaire. Je te souhaite plein de bonheur et de réussite. Profite bien de la journée qui est la tienne",
    "Lilie.JPG": "Même si le quotidien nous éloigne un peu, tu restes et resteras toujours ma meilleure amie <3 Joyeux anniversaire ma Jeannette ❤️",
    "Laura.JPG": "Coucou jeanne, j’espère que tu vas bien ! Petit message surprise improvisée envoyé à ta sœur ahah ! Je te souhaites un très bon anniversaire, que tu en profites bien et que tu restes comme tu es ! 😋 Tu es une très belle personne que j’aime beaucoup et j’espère vraiment qu’on pourra se voir un peu plus souvent, je te souhaite toujours plein de bonheur et le meilleur. Je t’aime ❤️‍🔥🌶️",
    "Thémis.JPG": "Coucou Jean Jean, je pense que ta sœur te le diras et tu n’auras pas de mal à la croire parce que je suis encore en retard. Non pas pour te souhaiter ton anniversaire (pile à l’heure) mais pour lui avoir envoyé ce petit message. Je te souhaite un très très bel anniversaire, rempli de rire et de joie. On se retrouve en pleine forme à la rentrée, meme s’il n’y a plus de trajet jusqu’au bus (en silence ou bruyant) on an encore pleins de beaux souvenirs à créer.  Encore une fois très joyeux anniversaire, pleins de belles choses et de gros bisous 🫶🏼",
    "Elise.jpg": "Joyeux anniversaire Jeanounette, j’espère que ce petit cadeau te fera plaisir, je te souhaite plein de belles choses pour cette année de couscous boulette. Gros bisous je t’aime fort ma sœur 💕",
    "Claire.JPG": "22 ans ma chérie, l’aventure Parisienne t’attend, profites bien de ta vingtaine ce sont les meilleures années. Merveilleux anniversaire ma Jeannette, je t’aimeuhhhh❤️",
    "Thomas.jpg": "Bon anniversaire Jeanounette ! Bon courage pour ta première année parisienne, loin de nous ! Ces 22 ans méritent bien un couscous boulette !"
};

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

       img.addEventListener("click", () => {
    document.getElementById("popup-img").src = src;

    // Récupère juste le nom du fichier (sans le dossier)
    const fileName = src.split("/").pop();

    // Si un texte spécial existe → on l'affiche
    if (specialTexts[fileName]) {
        document.getElementById("popup-text").textContent = specialTexts[fileName];
    } else {
        // Sinon → texte par défaut
        document.getElementById("popup-text").textContent = "Joyeux anniversaire !";
    }

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
