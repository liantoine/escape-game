let etape = 0;
let fautes = 0;
let estVerrouille = false;

window.onload = () => { chargerEtape(); };

function chargerEtape() {
    const q = estVerrouille ? CONFIG.punition : CONFIG.enigmes[etape];
    const titreElement = document.getElementById("etape-titre");
    const msgElement = document.getElementById("message");

    titreElement.innerText = estVerrouille ? "!! VERROUILLAGE !!" : q.titre;
    // Ajoute une classe CSS rouge si verrouillé pour le titre
    titreElement.className = estVerrouille ? "error-text" : "";

    document.getElementById("question-texte").innerText = estVerrouille ? q.message + "\n" + q.question : q.question;
    document.getElementById("reponse-input").value = "";
    msgElement.innerText = "";
    msgElement.className = "";
}

function verifier() {
    const saisieElement = document.getElementById("reponse-input");
    const saisie = saisieElement.value.trim().toUpperCase();
    const msgElement = document.getElementById("message");
    if (!saisie) return;

    // Hachage de la saisie
    const saisieHashee = CryptoJS.SHA256(saisie).toString();
    const cibleHash = estVerrouille ? CONFIG.punition.reponseHash : CONFIG.enigmes[etape].reponseHash;

    if (saisieHashee === cibleHash) {
        if (estVerrouille) {
            estVerrouille = false;
            fautes = 0;
            msgElement.innerText = "> ACCÈS RÉTABLI. REDIRECT...";
            msgElement.className = "success-text";
            setTimeout(chargerEtape, 1500);
        } else {
            etape++;
            fautes = 0;
            if (etape < CONFIG.enigmes.length) {
                msgElement.innerText = "> OK. CHARGEMENT MODULE SUIVANT...";
                msgElement.className = "success-text";
                setTimeout(chargerEtape, 1000);
            } else {
                gagner();
            }
        }
    } else {
        if (!estVerrouille) {
            fautes++;
            if (fautes >= CONFIG.maxTentatives) {
                estVerrouille = true;
                chargerEtape();
            } else {
                msgElement.innerText = `> REFUSÉ. Tentative ${fautes}/${CONFIG.maxTentatives}`;
                msgElement.className = "error-text";
            }
        } else {
            msgElement.innerText = "> CODE INCORRECT. BLOCAGE TOUJOURS ACTIF.";
            msgElement.className = "error-text";
        }
        saisieElement.value = ""; // Efface la mauvaise réponse
    }
}

function gagner() {
    document.getElementById("terminal").innerHTML = `
        <h1 class="success-text">ACCÈS TOTAL ACCORDÉ</h1>
        <hr style="border:1px solid #0f0; margin: 20px 0;">
        <p>Félicitations, vous avez contourné la sécurité.</p>
        <p>Le code de désamorçage final est : <strong style="font-size:1.5em; background:#0f0; color:#000; padding: 0 5px;">8</strong></p>
    `;
}
