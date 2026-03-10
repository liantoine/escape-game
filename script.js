let etape = 0;
let fautes = 0;
let estVerrouille = false;
let etatJeu = "INTRO"; 

window.onload = () => { afficherIntro(); };

function afficherIntro() {
    document.getElementById("etape-titre").innerText = "> ACCÈS SYSTÈME";
    document.getElementById("question-texte").innerText = CONFIG.intro;
    document.getElementById("input-zone").innerHTML = `<button onclick="demarrerJeu()">DÉMARRER LA SÉQUENCE</button>`;
}

function demarrerJeu() {
    etatJeu = "JEU";
    document.getElementById("input-zone").innerHTML = `
        <input type="text" id="reponse-input" placeholder="CODE" autocomplete="off">
        <button onclick="verifier()">EXEC</button>
    `;
    chargerEtape();
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
    
    // On force l'affichage des options
    const optContainer = document.getElementById("options-texte");
    optContainer.innerText = q.options || "";
    
    document.getElementById("reponse-input").value = "";
    document.getElementById("message").innerText = "";
}

function verifier() {
    const saisie = document.getElementById("reponse-input").value.trim().toUpperCase();
    if (!saisie) return;

    const saisieHashee = CryptoJS.SHA256(saisie).toString();
    const cibleHash = estVerrouille ? CONFIG.punition.reponseHash : CONFIG.enigmes[etape].reponseHash;

    if (saisieHashee === cibleHash) {
        if (estVerrouille) {
            estVerrouille = false; fautes = 0;
            document.getElementById("message").innerText = "> DÉVERROUILLÉ.";
            setTimeout(chargerEtape, 1000);
        } else {
            etape++; fautes = 0;
            if (etape < CONFIG.enigmes.length) {
                document.getElementById("message").innerText = "> ACCÈS ACCORDÉ.";
                setTimeout(chargerEtape, 1000);
            } else { gagner(); }
        }
    } else {
        if (!estVerrouille) {
            fautes++;
            if (fautes >= CONFIG.maxTentatives) {
                estVerrouille = true; chargerEtape();
            } else {
                document.getElementById("message").innerText = `> REFUSÉ (${fautes}/${CONFIG.maxTentatives})`;
            }
        }
    }
}

function gagner() {
    document.getElementById("terminal").innerHTML = `<h1 style="color:#0f0">HACK RÉUSSI</h1><p>Code Final : 8</p>`;
}
