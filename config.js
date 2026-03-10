const CONFIG = {
    tempsLimite: 600, // 10 minutes en secondes
    tentativesMax: 3,
    
    // Énigmes basées sur le document "Questions escape game"
    enigmes: [
        {
            id: "vert",
            titre: "COEFFICIENT VERT - Rang de Matrice",
            question: "Déterminer le rang de la matrice D (3 lignes identiques [1 2 3 4]).",
            reponse: "1",
            indice: "Toutes les lignes sont identiques, elles sont donc liées."
        },
        {
            id: "bleu",
            titre: "COEFFICIENT BLEU CLAIR - Base de R3",
            question: "Quelle famille forme une base de R3 ? (Répondre A, B ou C)\n A: {(1,1,0),(0,1,1)}\n B: {(1,2,3),(1,1,0),(1,0,0)}\n C: {(1,2,3),(1,1,0),(1,0,0),(1,1,1)}",
            reponse: "B",
            indice: "Une base de R3 doit contenir exactement 3 vecteurs linéairement indépendants."
        },
        {
            id: "cesar",
            titre: "ACCÈS SYSTÈME - Décalage",
            question: "Soit E={(x,y,z) ∈ R3 | x-y-z=0}. Quelle est la dimension de E ?",
            reponse: "2",
            indice: "C'est un plan dans R3, défini par une seule équation."
        }
    ],
    
    messagePunition: "SYSTÈME VERROUILLÉ - Trop d'erreurs. Résolvez ce système pour obtenir le pass de déverrouillage : {x+y=3, x-y=1}. (Réponse : x=2, y=1)"
};
