let etape = 0;
let fautes = 0;
let estVerrouille = false;

window.onload = () => { afficherIntro(); };

function afficherIntro() {
    // On cache la zone d'input au début
    document.getElementById("input-zone").style.display = "none";
    document.getElementById("etape-titre").innerText = "> ACCÈS SYSTÈME REQUIS";
    document.getElementById("question-texte").innerText = CONFIG.intro;
    
    // On crée un gros bouton de démarrage
    const btnIntro = document.createElement("button");
    btnIntro.innerText = "INITIALISER LE DÉCRYPTAGE";
    btnIntro.id = "btn-start";
    btnIntro.onclick = sequenceDemarrage;
    document.getElementById("terminal").appendChild(btnIntro);
}

function sequenceDemarrage() {
    // Effet de chargement
    document.getElementById("btn-start").remove();
    document.getElementById("question-texte").innerText = "> Connexion en cours...\n> Bypass firewall...\n> Accès aux modules d'algèbre...";
    
    setTimeout(() => {
        document.getElementById("input-zone").style.display = "block";
        chargerEtape();
    }, 2000);
}

function genererMatriceHTML(data) {
    let html = '<div class="matrix-display"><div>';
    data.forEach(row => {
        html += '<div class="matrix-row">';
        row.forEach(cell => { html += `<div class="matrix-cell">${cell}</div>`; });
        html += '</div>';
    });
    html += '</div></div>';
    return html;
}

function chargerEtape() {
    const q = estVerrouille ? CONFIG.punition : CONFIG.enigmes[etape];
    document.getElementById("etape-titre").innerText = estVerrouille ? "!! VERROUILLAGE !!" : q.titre;
    document.getElementById("question-texte").innerText = estVerrouille ? q.message + "\n" + q.question : q.question;
    
    const mContainer = document.getElementById("matrix-container");
    mContainer.innerHTML = q.matrice ? genererMatriceHTML(q.matrice) : "";
    
    const optContainer = document.getElementById("options-texte");
    optContainer.innerText = q.options || "";
    
    document.getElementById("reponse-input").value = "";
    document.getElementById("message").innerText = "";
    document.getElementById("reponse-input").focus();
}

function verifier() {
    const saisie = document.getElementById("reponse-input").value.trim().toUpperCase();
    if (!saisie) return;

    const saisieHashee = CryptoJS.SHA256(saisie).toString();
    const cibleHash = estVerrouille ? CONFIG.punition.reponseHash : CONFIG.enigmes[etape].reponseHash;

    if (saisieHashee === cibleHash) {
        if (estVerrouille) {
            estVerrouille = false; fautes = 0;
            document.getElementById("message").innerText = "> SYSTÈME RÉINITIALISÉ.";
            setTimeout(chargerEtape, 1000);
        } else {
            etape++; fautes = 0;
            if (etape < CONFIG.enigmes.length) {
                document.getElementById("message").innerText = "> MODULE VALIDÉ.";
                setTimeout(chargerEtape, 1000);
            } else { gagner(); }
        }
    } else {
        if (!estVerrouille) {
            fautes++;
            if (fautes >= CONFIG.maxTentatives) {
                estVerrouille = true; chargerEtape();
            } else {
                document.getElementById("message").innerText = `> ERREUR : ACCÈS REFUSÉ (${fautes}/${CONFIG.maxTentatives})`;
            }
        }
    }
}

function gagner() {
    document.getElementById("terminal").innerHTML = `
        <h1 style="color:#0f0">SYSTÈME DÉSAMORCÉ</h1>
        <p style="font-size: 1.5em;">Extraction du code secret réussie...</p>
        <div style="border: 2px dashed #0f0; padding: 20px; font-size: 3em; margin: 20px;">8</div>
        <p>Transmettez ce code à votre intervenant.</p>
    `;
}
