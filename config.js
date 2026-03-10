const CONFIG = {
    maxTentatives: 3,
    enigmes: [
        {
            titre: "> MODULE : CALCUL DE RANG",
            question: "Analyser la matrice D (3 lignes identiques [1 2 3 4]).\nDéterminer rang(D) :",
            reponseHash: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b" 
        },
        {
            titre: "> MODULE : ESPACES VECTORIELS",
            question: "Quelle famille forme une base de R3 ?\nA: {(1,1,0),(0,1,1)}\nB: {(1,2,3),(1,1,0),(1,0,0)}\nC: {(1,2,3),(1,1,0),(1,0,0),(1,1,1)}",
            reponseHash: "df8e4615d2d4d28238c350c3cce0a572a19999026405bc93856d357599052d3d" 
        },
        {
            titre: "> MODULE : DIMENSION",
            question: "Soit E = {(x,y,z) ∈ R3 | x - y - z = 0}.\nDimension de E ?",
            reponseHash: "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35" 
        }
    ],
    punition: {
        message: "ALERTE : TENTATIVE D'INTRUSION DÉTECTÉE.\nSYSTÈME BLOQUÉ.",
        question: "Entrez le code de déverrouillage prioritaire :",
        reponseHash: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b" 
    }
};
