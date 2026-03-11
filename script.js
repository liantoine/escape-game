let etape = 0;
let fautes = 0;
let fautesPunition = 0; // Compteur spécifique pour la page de verrouillage
let estVerrouille = false;

window.onload = () => { 
    const statutVerrou = localStorage.getItem("hacker_verrouille");
    const etapeSauvegardee = localStorage.getItem("hacker_etape");
    const partieLancee = localStorage.getItem("hacker_encours");

    if (statutVerrou === "true") {
        estVerrouille = true;
    }
    
    if (etapeSauvegardee) {
        etape = parseInt(etapeSauvegardee);
    }

    if (partieLancee === "true" || estVerrouille) {
        sequenceDemarrage();
    } else {
        afficherIntro(); 
    }
};

function appliquerStyleUrgence() {
    const terminal = document.getElementById("terminal");
    const input = document.getElementById("reponse-input");
    const btnExec = document.getElementById("btn-exec");
    
    document.body.style.color = "#f00";
    terminal.style.borderColor = "#f00";
    terminal.style.boxShadow = "0 0 30px #f00";
    
    if(input) {
        input.style.borderColor = "#f00";
        input.style.color = "#f00";
    }
    if(btnExec) {
        btnExec.style.background = "#f00";
        btnExec.style.color = "#000";
    }
    window.matrixColor = "#f00"; 
}

function appliquerStyleNormal() {
    const terminal = document.getElementById("terminal");
    const input = document.getElementById("reponse-input");
    const btnExec = document.getElementById("btn-exec");
    
    document.body.style.color = "#0f0";
    terminal.style.borderColor = "#0f0";
    terminal.style.boxShadow = "0 0 20px #0f0";
    
    if(input) {
        input.style.borderColor = "#0f0";
        input.style.color = "#0f0";
    }
    if(btnExec) {
        btnExec.style.background = "#0f0";
        btnExec.style.color = "#000";
    }
    window.matrixColor = "#0f0";
}

function afficherIntro() {
    document.getElementById("input-zone").style.display = "none";
    document.getElementById("etape-titre").innerText = "> ACCÈS SYSTÈME REQUIS";
    document.getElementById("question-texte").innerText = CONFIG.intro;
    
    const btnIntro = document.createElement("button");
    btnIntro.innerText = "INITIALISER LE DÉCRYPTAGE";
    btnIntro.id = "btn-start";
    btnIntro.onclick = () => {
        localStorage.setItem("hacker_encours", "true");
        sequenceDemarrage();
    };
    document.getElementById("terminal").appendChild(btnIntro);
}

function sequenceDemarrage() {
    const btn = document.getElementById("btn-start");
    if (btn) btn.remove();
    document.getElementById("input-zone").style.display = "block";
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
    
    const optContainer = document.getElementById("options-texte");
    optContainer.innerText = q.options || "";
    
    document.getElementById("reponse-input").value = "";
    document.getElementById("message").innerText = "";
    document.getElementById("reponse-input").focus();
    
    if (estVerrouille) {
        appliquerStyleUrgence();
    } else {
        appliquerStyleNormal();
    }
}

function verifier() {
    const saisie = document.getElementById("reponse-input").value.trim().toUpperCase();
    if (!saisie) return;

    const saisieHashee = CryptoJS.SHA256(saisie).toString();
    const cibleHash = estVerrouille ? CONFIG.punition.reponseHash : CONFIG.enigmes[etape].reponseHash;

    if (saisieHashee === cibleHash) {
        if (estVerrouille) {
            estVerrouille = false;
            fautes = 0;
            fautesPunition = 0;
            localStorage.removeItem("hacker_verrouille");
            document.getElementById("message").innerText = "> SYSTÈME RÉINITIALISÉ.";
            setTimeout(chargerEtape, 1000);
        } else {
            etape++;
            fautes = 0;
            localStorage.setItem("hacker_etape", etape);
            if (etape < CONFIG.enigmes.length) {
                document.getElementById("message").innerText = "> MODULE VALIDÉ.";
                setTimeout(chargerEtape, 1000);
            } else { 
                gagner(); 
            }
        }
    } else {
        if (estVerrouille) {
            fautesPunition++;
            document.getElementById("message").innerText = `> CODE INCORRECT (Échec ${fautesPunition})`;
        } else {
            fautes++;
            if (fautes >= CONFIG.maxTentatives) {
                estVerrouille = true;
                localStorage.setItem("hacker_verrouille", "true");
                chargerEtape();
            } else {
                document.getElementById("message").innerText = `> ERREUR : ACCÈS REFUSÉ (${fautes}/${CONFIG.maxTentatives})`;
            }
        }
    }
}

function gagner() {
    localStorage.clear();
    document.getElementById("terminal").innerHTML = `
        <h1 style="color:#0f0">SYSTÈME DÉSAMORCÉ</h1>
        <p style="font-size: 1.5em;">Extraction du code secret réussie...</p>
        <div style="border: 2px dashed #0f0; padding: 20px; font-size: 3em; margin: 20px;">8</div>
        <p>Transmettez ce code à votre intervenant.</p>
    `;
}