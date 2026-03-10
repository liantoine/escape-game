let etape = 0;
let fautes = 0;
let estVerrouille = false;

window.onload = () => { chargerEtape(); };

function chargerEtape() {
    const q = estVerrouille ? CONFIG.punition : CONFIG.enigmes[etape];
    document.getElementById("etape-titre").innerText = estVerrouille ? "!! VERROUILLAGE !!" : q.titre;
    document.getElementById("question-texte").innerText = estVerrouille ? q.message + "\n" + q.question : q.question;
    document.getElementById("reponse-input").value = "";
    document.getElementById("message").innerText = "";
}

function verifier() {
    const saisie = document.getElementById("reponse-input").value.trim().toUpperCase();
    if (!saisie) return;

    // On hashe la saisie de l'élève pour comparer
    const saisieHashee = CryptoJS.SHA256(saisie).toString();
    const cibleHash = estVerrouille ? CONFIG.punition.reponseHash : CONFIG.enigmes[etape].reponseHash;

    if (saisieHashee === cibleHash) {
        if (estVerrouille) {
            estVerrouille = false;
            fautes = 0;
            document.getElementById("message").innerText = "> RÉINITIALISATION RÉUSSIE. RETOUR...";
            setTimeout(chargerEtape, 1500);
        } else {
            etape++;
            fautes = 0;
            if (etape < CONFIG.enigmes.length) {
                document.getElementById("message").innerText = "> ACCÈS ACCORDÉ. CHARGEMENT SUIVANT...";
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
                document.getElementById("message").innerText = `> ÉCHEC. TENTATIVE ${fautes}/${CONFIG.maxTentatives}`;
            }
        } else {
            document.getElementById("message").innerText = "> RÉPONSE INCORRECTE. SYSTÈME TOUJOURS BLOQUÉ.";
        }
    }
}

function gagner() {
    document.getElementById("terminal").innerHTML = `
        <h1 style="color:#00ff00">HACK RÉUSSI</h1>
        <p>Accès total au noyau accordé.</p>
        <p>Félicitations. Le code final est : <strong>8</strong></p>
    `;
}
