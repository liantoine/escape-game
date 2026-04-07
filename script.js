let etape = 0;
let fautes = 0;
let fautesPunition = 0;
let estVerrouille = false;
let mathFocus = 1;
let timerActif = false;
let isProcessing = false;

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
    const fautesSauvegardees = localStorage.getItem("hacker_fautes");

    if (statutVerrou === "true") estVerrouille = true;
    if (etapeSauvegardee) etape = parseInt(etapeSauvegardee);
    if (fautesSauvegardees) fautes = parseInt(fautesSauvegardees);

    if (partieLancee === "true" || estVerrouille) sequenceDemarrage();
    else afficherIntro();

    const timerFin = localStorage.getItem("hacker_timer_fin");
    if (timerFin && estVerrouille) {
        const restant = parseInt(timerFin) - Date.now();
        if (restant > 0) lancerTimerDepuis(parseInt(timerFin));
        else localStorage.removeItem("hacker_timer_fin");
    }
};

function getPunition() {
    const idx = Math.min(etape, CONFIG.punitions.length - 1);
    return CONFIG.punitions[idx];
}

function appliquerStyleUrgence() {
    const terminal = document.getElementById("terminal");
    document.body.style.color = "#f00";
    window.matrixColor = "#f00";
    terminal.style.borderColor = "#f00";
    terminal.style.boxShadow = "0 0 30px #f00";
    ["reponse-input", "input-math-1", "input-math-2"].forEach(id => {
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
    ["reponse-input", "input-math-1", "input-math-2"].forEach(id => {
        let el = document.getElementById(id);
        if (el) { el.style.borderColor = "#0f0"; el.style.color = "#0f0"; }
    });
    const btn = document.getElementById("btn-exec");
    if (btn) { btn.style.background = "#0f0"; btn.style.color = "#000"; }
}

function chargerEtape() {
    const q = estVerrouille ? getPunition() : CONFIG.enigmes[etape];
    document.getElementById("etape-titre").innerText = estVerrouille ? "!! VERROUILLAGE !!" : q.titre;
    document.getElementById("question-texte").innerText = estVerrouille ? q.message + "\n\n⚠ RÉPONDEZ :\n" + q.question : q.question;
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
    isProcessing = false;
}

function verifier() {
    if (timerActif || isProcessing) return;

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
        if (saisie === "VRAIE") saisie = "VRAI";
        if (saisie === "FAUSSE") saisie = "FAUX";
        if (CryptoJS.SHA256(saisie).toString() === q.reponseHash) reussite = true;
    }

    if (reussite) {
        isProcessing = true;
        if (estVerrouille) {
            estVerrouille = false;
            fautes = 0;
            localStorage.removeItem("hacker_verrouille");
            localStorage.setItem("hacker_fautes", 0);
            document.getElementById("message").innerText = "> SYSTÈME RÉINITIALISÉ.";
            setTimeout(chargerEtape, 1500); 
        } else {
            etape++;
            fautes = 0;
            localStorage.setItem("hacker_etape", etape);
            localStorage.setItem("hacker_fautes", 0);
            if (etape < CONFIG.enigmes.length) {
                document.getElementById("message").innerText = "> MODULE VALIDÉ.";
                setTimeout(chargerEtape, 1500);
            } else gagner();
        }
    } else {
        if (estVerrouille) {
            const timerFin = Date.now() + 10000;
            localStorage.setItem("hacker_timer_fin", timerFin);
            lancerTimerDepuis(timerFin);
        } else {
            fautes++;
            localStorage.setItem("hacker_fautes", fautes);
            if (fautes >= CONFIG.maxTentatives) {
                estVerrouille = true;
                localStorage.setItem("hacker_verrouille", "true");
                chargerEtape();
            } else {
                document.getElementById("message").innerText = `> ACCÈS REFUSÉ (${fautes}/${CONFIG.maxTentatives})`;
            }
        }
    }
}

function lancerTimerDepuis(t) { 
    timerActif = true; 
    const btn = document.getElementById("btn-exec"); 
    btn.disabled = true; 
    btn.style.opacity = "0.5"; 
    const interval = setInterval(() => { 
        const r = Math.ceil((t - Date.now()) / 1000); 
        if (r <= 0) { 
            clearInterval(interval); 
            timerActif = false; 
            localStorage.removeItem("hacker_timer_fin"); 
            btn.disabled = false; 
            btn.style.opacity = "1"; 
            document.getElementById("message").innerText = "> RÉESSAYEZ."; 
        } else { 
            document.getElementById("message").innerText = `> CODE INCORRECT — PATIENTEZ... ${r}s`; 
        } 
    }, 200); 
}

function setMathFocus(n) { 
    mathFocus = n; 
    document.getElementById("input-math-1").classList.remove("math-active"); 
    document.getElementById("input-math-2").classList.remove("math-active"); 
    document.getElementById("input-math-" + n).classList.add("math-active"); 
}

function afficherIntro() { 
    document.getElementById("input-zone").style.display = "none"; 
    document.getElementById("question-texte").innerText = CONFIG.intro; 
    const b = document.createElement("button"); 
    b.innerText = "INITIALISER LE DÉCRYPTAGE"; 
    b.id = "btn-start"; 
    b.onclick = () => { localStorage.setItem("hacker_encours", "true"); sequenceDemarrage(); }; 
    document.getElementById("terminal").appendChild(b); 
}

function sequenceDemarrage() { 
    const b = document.getElementById("btn-start"); 
    if (b) b.remove(); 
    document.getElementById("input-zone").style.display = "block"; 
    chargerEtape(); 
}

function genererMatriceHTML(d) { 
    let h = '<div class="matrix-display"><div>'; 
    d.forEach(r => { 
        h += '<div class="matrix-row">'; 
        r.forEach(c => h += `<div class="matrix-cell">${c}</div>`); 
        h += '</div>'; 
    }); 
    h += '</div></div>'; 
    return h; 
}

function genererClavierMath(k) { 
    const c = document.getElementById("keyboard-container"); 
    c.innerHTML = ""; 
    [k.slice(0, 8), k.slice(8, 16)].forEach(row => { 
        const d = document.createElement("div"); 
        d.style.cssText = "display:flex; justify-content:center; gap:6px; margin-bottom:6px;"; 
        row.forEach(t => { 
            let b = document.createElement("button"); 
            b.innerText = t; 
            b.className = "math-key"; 
            b.onclick = () => { 
                if(timerActif) return; 
                let target = document.getElementById("input-math-" + mathFocus); 
                if (target.value.length < 10) target.value += t; 
            }; 
            d.appendChild(b); 
        }); 
        c.appendChild(d); 
    }); 
}

function effacerMath() { 
    const i1 = document.getElementById("input-math-1"); 
    const i2 = document.getElementById("input-math-2"); 
    if (i1) i1.value = ""; 
    if (i2) i2.value = ""; 
}

function gagner() { 
    localStorage.clear(); 
    document.getElementById("terminal").innerHTML = `<h1 style="color:#0f0">SYSTÈME DÉSAMORCÉ</h1><p>Code Final : 44</p>`; 
}