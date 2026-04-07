const CONFIG = {
    intro: "BIENVENUE AGENT. LE SYSTÈME DE SÉCURITÉ DU COEFFICIENT VERT EST ACTIF.\n\nVOUS DEVEZ RÉPONDRE AUX ÉNIGMES D'ALGÈBRE LINÉAIRE POUR DÉSAMORCER L'UNITÉ CENTRALE.\n\nAPPUYEZ SUR LE BOUTON POUR DÉBUTER LA SÉQUENCE.",
    maxTentatives: 3,
    enigmes: [
        {
            titre: "> MODULE : CALCUL DE RANG",
            question: "Déterminer le rang de la matrice suivante :",
            matrice: [["1", "2", "3", "4"], ["1", "2", "3", "4"], ["1", "2", "3", "4"]],
            reponseHash: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"
        },
        {
            titre: "> MODULE : ESPACES VECTORIELS",
            question: "Quelle famille suivante forme une base de R3 ?",
            options: "A: {(-1,-2),(2,4)}\nB: {(1,1,0),(0,1,1)}\nC: {(1,0),(0,1)}\nD: {(1,2,3),(1,1,0),(1,0,0)}\nE: {(1,2,3),(1,1,0),(1,0,0),(1,1,1)}",
            reponseHash: "3f39d5c348e5b79d06e842c114e6cc571583bbf44e4b0ebfda1a01ec05745d43"
        },
        {
            titre: "> MODULE : DIMENSION",
            question: "Soit E = {(x,y,z) ∈ R3 | x - y - z = 0}.\nQuelle est l'assertion vraie ?",
            options: "A: dim E = 3\nB: dim E = 2\nC: dim E = 1\nD: dim E = 0",
            reponseHash: "df7e70e5021544f4834bbee64a9e3789febc4be81470df629cad6ddb03320a5c"
        },
        {
            titre: "> MODULE : INVERSIBILITÉ",
            question: "Pour quelles valeurs de a et b la matrice A est-elle inversible ?",
            matrice: [["a", "b", "c", "d"], ["a", "a", "b", "c"], ["a", "a", "a", "b"], ["a", "a", "a", "a"]],
            isDoubleInput: true,
            touchesMath: ["a", "b", "c", "d", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "="],
            reponseHash1: "a74b9962de2179fc3fdbcf7341c097e72fbb9be7a74a2fa32f51645aad5c07b2",
            reponseHash2: "b4928a485247b874127f737d70cb6c9f671d216b3110b9287e958338bfdb98b7"
        }
    ],
    punitions: [
        {
            message: "ALERTE : TENTATIVE D'INTRUSION DÉTECTÉE.\nSYSTÈME BLOQUÉ.",
            question: "L'intersection de deux sous-espaces vectoriels est un sous-espace vectoriel.\nSoit E un espace vectoriel.\n\nCette assertion est-elle VRAIE ou FAUSSE ?",
            reponseHash: "85198ce5f0ca9e38e225ca56657010a5032a109129afc22e9b1b0f554a864ff5"
        },
        {
            message: "ALERTE : TENTATIVE D'INTRUSION DÉTECTÉE.\nSYSTÈME BLOQUÉ.",
            question: "Si F et G sont deux sous-espaces vectoriels de E alors\ndim F + dim G = dim(F + G).\n\nCette assertion est-elle VRAIE ou FAUSSE ?",
            reponseHash: "dd93531216ec85494b03c7f3d58255f0048e3976f227a76a8bfa1a4f24aec96f"
        },
        {
            message: "ALERTE : TENTATIVE D'INTRUSION DÉTECTÉE.\nSYSTÈME BLOQUÉ.",
            question: "La composée d'applications linéaires est linéaire.\n\nCette assertion est-elle VRAIE ou FAUSSE ?",
            reponseHash: "85198ce5f0ca9e38e225ca56657010a5032a109129afc22e9b1b0f554a864ff5"
        }
    ]
};