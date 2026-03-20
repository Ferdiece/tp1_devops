Ferdinand DELOISON & Valentine BOURY


ING4 DATA&IA APP Gp01

---------------------------------


# TP5 - CI/CD (GitHub Actions & Heroku)

Réponses aux questions "bilan" :

## 1. Objectif du lab

Le but de ce lab était de mettre en place une "chaîne de montage" automatique pour notre code.

D'un côté, la CI (Intégration Continue) avec GitHub Actions pour vérifier que le code fonctionne et passe les tests à chaque fois qu'on le change.

De l'autre, la CD (Déploiement Continu) pour que notre app soit mise en ligne automatiquement sur internet sans qu'on ait besoin de le faire "à la main".


## 2. Possible application dans le monde réel

C'est ce qui permet à des grosses boîtes comme Facebook ou Netflix de mettre à jour leur site plusieurs fois par jour.

Au lieu d'avoir un humain qui vérifie tout, c'est un robot qui s'en occupe.

Si je fais un erreur dans mon code : le robot me prévient immédiatement et empêche la mise en ligne du site cassé.


## 3. Étape dans le cycle DevOps ? 

On est en plein dans les étapes de vérification (Test) et de relâche (Release/Deploy).

Pourquoi ? : le but du DevOps est d'accélérer le cycle de vie du logiciel. Ici, on automatise tout le passage entre "j'ai fini mon code" et "le client peut utiliser la nouvelle version".


## 4. Problème rencontré lors du lab ?

Problème : les tests sur GitHub Actions rataient parce que l'application ne trouvait pas de base de données Redis pour se connecter.

Analyse : dans les logs de GitHub, on voyait une erreur de connexion. --> github fait tourner notre code sur ses serveurs, mais Redis n'y est pas installé par défaut.

Solution : on a dû configurer un "Service Container" dans notre fichier de workflow.


## 5. Finalité du Lab
L'objectif est-il rempli ? Oui.

Pourquoi ? Maintenant, dès qu'on fait une Pull Request sur Github, les tests se lancent tout seul. Si je valide la modif, ça met à jour le site web public automatiquement
