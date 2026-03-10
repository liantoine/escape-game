const CONFIG = {
    maxTentatives: 3,
    
    // Questions basées sur le document PDF
    enigmes: [
        {
            titre: "COEFFICIENT VERT - RANG",
            question: "Déterminer le rang de la matrice D dont les trois lignes sont identiques : [1 2 3 4].",
            reponse: "1"
        },
        {
            titre: "COEFFICIENT BLEU CLAIR - BASE",
            question: "Quelle famille forme une base de R3 ?\nA: {(1,1,0),(0,1,1)}\nB: {(1,2,3),(1,1,0),(1,0,0)}\nC: {(1,2,3),(1,1,0),(1,0,0),(1,1,1)}",
            reponse: "B"
        },
        {
            titre: "ACCÈS FINAL - DIMENSION",
            question: "Soit E = {(x,y,z) ∈ R3 | x - y - z = 0}. Quelle est la dimension de ce sous-espace vectoriel ?",
            reponse: "2"
        }
    ],

    // Système anti-bourrine (Punition)
    punition: {
        message: "SÉCURITÉ ACTIVÉE : Trop d'erreurs détectées. Résolvez ce système pour déverrouiller le terminal : x+y=3 et x-y=1. Entrez les valeurs de x et y collées.",
        codeDeblocage: "21" // x=2 et y=1
    }
};
