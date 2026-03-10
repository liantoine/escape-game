let etapeActuelle = 0;
let erreurs = 0;
let tempsRestant = CONFIG.tempsLimite;

function verifierReponse() {
    const input = document.getElementById("input-reponse").value.trim().toUpperCase();
    const enigme = CONFIG.enigmes[etapeActuelle];

    if (input === enigme.reponse) {
        erreurs = 0; // On reset les erreurs si succès
        etapeActuelle++;
        if (etapeActuelle < CONFIG.enigmes.length) {
            afficherEnigme();
        } else {
            gagner();
        }
    } else {
        erreurs++;
        document.getElementById("message").innerText = `ERREUR (${erreurs}/${CONFIG.tentativesMax})`;
        if (erreurs >= CONFIG.tentativesMax) {
            verrouillerSysteme();
        }
    }
}

function verrouillerSysteme() {
    document.getElementById("terminal").innerHTML = `<h2 style='color:red'>HACK DÉTECTÉ</h2><p>${CONFIG.messagePunition}</p>`;
}

function afficherEnigme() {
    const e = CONFIG.enigmes[etapeActuelle];
    document.getElementById("titre-enigme").innerText = e.titre;
    document.getElementById("texte-enigme").innerText = e.question;
    document.getElementById("input-reponse").value = "";
    document.getElementById("message").innerText = "";
}

// Lancer le chrono au chargement
setInterval(() => {
    tempsRestant--;
    let min = Math.floor(tempsRestant / 60);
    let sec = tempsRestant % 60;
    document.getElementById("timer").innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    if (tempsRestant <= 0) alert("BOMBE EXPLOSÉE !");
}, 1000);
