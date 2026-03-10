const CONFIG = {
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
            reponseHash: "df7e70e5021544f4834bbee64a9e3789febc4be81470df629cad6ddb03320a5c"
        },
        {
            titre: "> MODULE : DIMENSION",
            question: "Soit E = {(x,y,z) ∈ R3 | x - y - z = 0}.\nQuelle est l'assertion vraie ?",
            options: "A: dim E = 3\nB: dim E = 2\nC: dim E = 1\nD: dim E = 0",
            reponseHash: "df7e70e5021544f4834bbee64a9e3789febc4be81470df629cad6ddb03320a5c"
        }
    ],
    punition: {
        message: "ALERTE : TENTATIVE D'INTRUSION DÉTECTÉE.\nSYSTÈME BLOQUÉ.",
        question: "Entrez le code de déverrouillage prioritaire :",
        reponseHash: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"
    }
};
