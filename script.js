let etape = 0;
let fautes = 0;
let fautesPunition = 0;
let estVerrouille = false;
let mathFocus = 1;
let timerActif = false;

// RACCOURCI SECRET : Ctrl + Maj + E
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        localStorage.clear();
        location.reload();
    }
});

window.onload = () => {
    const statutVerrou = localStorage.getItem("hacker_verrouille");
    const etapeSauvegardee = localStorage.getItem("hacker_etape");
    const partieLancee = localStorage.getItem("hacker_encours");

    if (statutVerrou === "true") estVerrouille = true;
    if (etapeSauvegardee) etape = parseInt(etapeSauvegardee);

    if (partieLancee === "true" || estVerrouille) sequenceDemarrage();
    else afficherIntro();

    // Reprendre le timer si la page a été rechargée pendant une punition
    const timerFin = localStorage.getItem("hacker_timer_fin");
    if (timerFin && estVerrouille) {
        const restant = parseInt(timerFin) - Date.now();
        if (restant > 0) {
            lancerTimerDepuis(parseInt(timerFin));
        } else {
            localStorage.removeItem("hacker_timer_fin");
        }
    }
};

function getPunition() {
    // Chaque énigme (0, 1, 2) a sa punition dédiée. L'énigme 3 (inversibilité) utilise la punition 2.
    const idx = Math.min(etape, CONFIG.punitions.length - 1);
    return CONFIG.punitions[idx];
}

function appliquerStyleUrgence() {
    const terminal = document.getElementById("terminal");
    document.body.style.color = "#f00";
    window.matrixColor = "#f00";
    terminal.style.borderColor = "#f00";
    terminal.style.boxShadow = "0 0 30px #f00";
    const inputs = ["reponse-input", "input-math-1", "input-math-2"];
    inputs.forEach(id => {
        let el = document.getElementById(id);
        if (el) { el.style.borderColor = "#f00"; el.style.color = "#f00"; }
    });
    const btn = document.getElementById("btn-exec");
    if (btn) { btn.style.background = "#f00"; btn.style.color = "#000"; }
}

function appliquerStyleNormal() {
    const terminal = document.getElementById("terminal");
    document.body.style.color = "#0f0";
    window.matrixColor = "#0f0";
    terminal.style.borderColor = "#0f0";
    terminal.style.boxShadow = "0 0 20px #0f0";
    const inputs = ["reponse-input", "input-math-1", "input-math-2"];
    inputs.forEach(id => {
        let el = document.getElementById(id);
        if (el) { el.style.borderColor = "#0f0"; el.style.color = "#0f0"; }
    });
    const btn = document.getElementById("btn-exec");
    if (btn) { btn.style.background = "#0f0"; btn.style.color = "#000"; }
}

function setMathFocus(num) {
    mathFocus = num;
    document.getElementById("input-math-1").classList.remove("math-active");
    document.getElementById("input-math-2").classList.remove("math-active");
    document.getElementById("input-math-" + num).classList.add("math-active");
}

function afficherIntro() {
    document.getElementById("input-zone").style.display = "none";
    document.getElementById("etape-titre").innerText = "> ACCÈS SYSTÈME REQUIS";
    document.getElementById("question-texte").innerText = CONFIG.intro;
    const btnIntro = document.createElement("button");
    btnIntro.innerText = "INITIALISER LE DÉCRYPTAGE";
    btnIntro.id = "btn-start";
    btnIntro.onclick = () => { localStorage.setItem("hacker_encours", "true"); sequenceDemarrage(); };
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
    const q = estVerrouille ? getPunition() : CONFIG.enigmes[etape];
    document.getElementById("etape-titre").innerText = estVerrouille ? "!! VERROUILLAGE !!" : q.titre;
    document.getElementById("question-texte").innerText = estVerrouille ? q.message + "\n\n⚠ RÉPONDEZ À CETTE QUESTION POUR DÉVERROUILLER LE SYSTÈME :\n\n" + q.question : q.question;
    document.getElementById("matrix-container").innerHTML = q.matrice ? genererMatriceHTML(q.matrice) : "";
    document.getElementById("options-texte").innerText = q.options || "";

    if (q.isDoubleInput && !estVerrouille) {
        document.getElementById("standard-input-zone").style.display = "none";
        document.getElementById("double-input-zone").style.display = "block";
        genererClavierMath(q.touchesMath);
        setMathFocus(1);
    } else {
        document.getElementById("standard-input-zone").style.display = "block";
        document.getElementById("double-input-zone").style.display = "none";
    }

    document.getElementById("reponse-input").value = "";
    effacerMath();
    document.getElementById("message").innerText = "";
    if (estVerrouille) appliquerStyleUrgence(); else appliquerStyleNormal();
}

function genererClavierMath(keys) {
    const container = document.getElementById("keyboard-container");
    container.innerHTML = "";

    // Disposition fixe : 2 rangées de 8
    const row1 = keys.slice(0, 8);
    const row2 = keys.slice(8, 16);

    [row1, row2].forEach(rowKeys => {
        const rowDiv = document.createElement("div");
        rowDiv.style.cssText = "display:flex; justify-content:center; gap:6px; margin-bottom:6px;";
        rowKeys.forEach(t => {
            let b = document.createElement("button");
            b.innerText = t;
            b.className = "math-key";
            b.onclick = () => {
                let target = document.getElementById("input-math-" + mathFocus);
                if (target.value.length < 10) target.value += t;
            };
            rowDiv.appendChild(b);
        });
        container.appendChild(rowDiv);
    });
}

function effacerMath() {
    const i1 = document.getElementById("input-math-1");
    const i2 = document.getElementById("input-math-2");
    if (i1) i1.value = "";
    if (i2) i2.value = "";
}

function lancerTimerDepuis(timerFin) {
    timerActif = true;
    const btnExec = document.getElementById("btn-exec");
    btnExec.disabled = true;
    btnExec.style.opacity = "0.5";
    btnExec.style.cursor = "not-allowed";

    const msgEl = document.getElementById("message");

    const interval = setInterval(() => {
        const restant = Math.ceil((timerFin - Date.now()) / 1000);
        if (restant <= 0) {
            clearInterval(interval);
            timerActif = false;
            localStorage.removeItem("hacker_timer_fin");
            btnExec.disabled = false;
            btnExec.style.opacity = "1";
            btnExec.style.cursor = "pointer";
            msgEl.innerText = "> RÉESSAYEZ.";
        } else {
            msgEl.innerText = `> CODE INCORRECT — PATIENTEZ... ${restant}s`;
        }
    }, 200);
}

function verifier() {
    if (timerActif) return;

    const q = estVerrouille ? getPunition() : CONFIG.enigmes[etape];
    let reussite = false;

    if (q.isDoubleInput && !estVerrouille) {
        const s1 = document.getElementById("input-math-1").value;
        const s2 = document.getElementById("input-math-2").value;
        const h1 = CryptoJS.SHA256(s1).toString();
        const h2 = CryptoJS.SHA256(s2).toString();
        if ((h1 === q.reponseHash1 && h2 === q.reponseHash2) || (h1 === q.reponseHash2 && h2 === q.reponseHash1)) reussite = true;
    } else {
        let saisie = document.getElementById("reponse-input").value.trim().toUpperCase();
        if (!saisie) return;
        // Normaliser les variantes vrai/vraie → VRAI, faux/fausse → FAUX
        if (saisie === "VRAIE") saisie = "VRAI";
        if (saisie === "FAUSSE") saisie = "FAUX";
        const hash = CryptoJS.SHA256(saisie).toString();
        if (hash === q.reponseHash) reussite = true;
    }

    if (reussite) {
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
            const timerFin = Date.now() + 10000;
            localStorage.setItem("hacker_timer_fin", timerFin);
            lancerTimerDepuis(timerFin);
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
    document.getElementById("terminal").innerHTML = `<h1 style="color:#0f0">SYSTÈME DÉSAMORCÉ</h1><p>Code Final : 8</p>`;
}