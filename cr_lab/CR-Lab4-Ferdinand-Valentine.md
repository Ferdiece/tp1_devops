Ferdinand DELOISON & Valentine BOURY


ING4 DATA&IA APP Gp01

---------------------------------


# TP4 - Continuous Testing

Réponses aux questions "bilan" :

## 1. Objectif du lab

Le but de ce lab était d'apprendre à tester notre code sérieusement. On a utilisé une méthode qui s'appelle le TDD (Test-Driven Development) : 
au lieu d'écrire le code puis de vérifier s'il marche, on écrit d'abord le test (qui échoue forcément au début) et ensuite on écrit le code pour que le test passe au vert.


## 2. Possible application dans le monde réel

C'est indispensable quand on travaille en équipe sur un gros projet.

Si je change une petite ligne de code pour ajouter une fonction, je peux casser tout le reste sans faire exprès.

En lançant les tests automatiquement (npm test), je sais tout de suite si j'ai fait une erreur avant même d'envoyer mon travail aux autres.


## 3. Étape dans le cycle DevOps ? 

On est dans l'étape de test (Vérification).

Poourquoi ? : dans le cycle DevOps, on veut que la qualité soit automatique. En écrivant des tests unitaires et des tests d'API, on s'assure que l'application fait exactement ce qu'on lui demande à chaque étape de sa création.


## 4. Problème rencontré lors du lab ?

Problème : pendant la création du test pour "récupérer un utilisateur qui n'existe pas", le test était toujours en échec même après avoir écrit le code.

Analyse: le message d'erreur dans la console disait AssertionError: expected 200 to equal 404 => le code renvoyait un code de succès (200) alors qu'il aurait dû renvoyer une erreur "Introuvable" (404) quand l'utilisateur n'est pas dans la base.

Solution : On a modifier le contrôleur dans src/controllers/user.js pour ajouter une condition if (!result) qui renvoie spécifiquement une erreur si la base de données ne trouve rien, au lieu de renvoyer un objet vide


## 5. Finalité du Lab

L'objectif est-il rempli ? Oui.

Pourquoi ? On a réussi à créer une nouvelle fonctionnalité (récupérer un utilisateur avec GET) en suivant la méthode TDD. 
On a écrit les tests pour les cas où ça marche et les cas où l'utilisateur n'existe pas. Et on a codé la logique dans le contrôleur et les routes pour que tout soit ok.
