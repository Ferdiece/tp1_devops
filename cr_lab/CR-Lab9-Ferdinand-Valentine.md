Ferdinand DELOISON & Valentine BOURY


ING4 DATA&IA APP Gp01

---------------------------------


# TP9 : Stockage Kubernetes

Réponses aux questions "bilan" : 

## 1. Objectifs du lab

L'objectif principal était de comprendre et de manipuler les différents types de volumes de stockage dans Kubernetes pour gérer la persistance des données. On aborde 3 choses clés :

emptyDir : stockage temporaire lié au cycle de vie du Pod.

hostPath : stockage lié au système de fichier du noeud (VM Minikube).

PersistentVolume (PV) / PersistentVolumeClaim (PVC) : Abstraction du stockage pour une gestion indépendante de l'infrastructure.


## 2. Possible application dans le monde réel

emptyDir : utilisation comme espace de "scratch" pour du traitement de données temporaire. Ou comme cache partagé entre deux conteneurs à l'intérieur d'un même Pod.

hostPath : accès à des outils de monitoring au niveau du nœud ou pour des clusters à nœud unique où l'on veut que les données survivent au redémarrage du Pod mais restent sur la même machine.

PersistentVolume : Indispensable pour les bases de données où les données doivent survivre même si le Pod est déplacé sur un autre noeud du cluster.


## 3. Étape dans le cycle DevOps ?

On pourrait dire que ce lab fait parti de l'étape déploiement (Deploy) et opérations (Operate).

Pourquoi ? : La gestion du stockage est un vrai problème d'infrastructure lors du déploiement en production. Un ingénieur DevOps doit garantir que les données critiques ne sont pas perdu lors des maj (Rolling Updates) ou des pannes de noeuds.


## 4. Problème rencontré lors du lab ?

--> Erreur 403 Forbidden lors de l'accès à Nginx après le montage du volume emptyDir.

Analyse : Le message 403 forbidden indique que le serveur Nginx fonctionne mais qu'il ne trouve pas de fichier index.html dans le répertoire /usr/share/nginx/html.
Cela s'expliquait par le fait que le montage d'un volume vide écrase ou masque le contenu par défaut de l'image Docker.

Solutions :

- Connexion en mode interactif : kubectl exec -it <POD_NAME> -- bash.

- Création manuelle du fichier : echo 'Hello...' > /usr/share/nginx/html/index.html.

On vérifie  via curl localhost.


## 5. Finalité du Lab

L'objectif est-il rempli ? Oui selon nous.

Pourquoi ? : Les tests de vérification ont permis de confirmer le comportement de chaque type de stockage :

On a constaté que les données de emptyDir survivent au crash d'un conteneur mais disparaissent avec le Pod.

On a validé que hostPath permet de persister les données sur le nœud Minikube même après suppression du Pod.

La mise en place du cycle PV/PVC a démontré la séparation entre la demande de ressources (développeur) et l'offre de stockage (administrateur).
