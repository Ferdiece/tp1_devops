Ferdinand DELOISON & Valentine BOURY


ING4 DATA&IA APP Gp01

---------------------------------


# TP7 – Docker Containers

Réponses aux questions "bilan" : 

## 1. Objectif du lab

Le but de ce lab était d'apprendre à utiliser Docker pour transformer une application (ici site en Node.js) en une sorte de "boîte" autonome qu'on appelle une image. 
On a aussi appri à partager ces boîtes avec d'autres personnes/ordi et à faire marcher plusieurs boîtes ensemble (un site + base de données) avec un outil qui s'appelle Docker Compose.


## 2. Possible application dans le monde réel

Dans la vraie vie, ça sert surtout à éviter le fameux problème du "mais ça marchait sur mon ordi".

On peut s'en servir pour envoyer son code à un collègue ou sur un serveur sans avoir peur que ça plante à cause d'une version de logiciel différente.

C'est aussi pratique pour installer des trucs complexes (comme une base de données Redis ou WordPress) en une seule ligne de commande sans polluer son propre ordinateur.


## 3. Étape dans le cycle DevOps ?

C'est l'étape de Construction (Build) et de Déploiement (Package/Deploy).

Pourquoi ? : On prépare l'application pour qu'elle soit prête à partir n'importe où. Au lieu d'envoyer juste du texte (le code), on envoie un "paquet" tout prêt qui contient tout ce qu'il faut pour démarrer.


## 4. Problème rencontré lors du lab ?

Problème : le compteur de visites revenait à zéro à chaque fois qu'on supprimait les conteneurs avec docker-compose rm.

Analyse : il n'y avait pas de message d'erreur mais on a vu que les données de la base Redis disparaissaient dès que le conteneur était effacé. Donc la mémoire de la base de données était lié à la vie du conteneur.

Solution : On a utiliser des volumes. En rajoutant une ligne dans le fichier docker-compose.yaml, on a lié le dossier /data de Redis à un dossier sur notre propre ordi. Comme ça, même si on casse le conteneur, les données restent sauvegardé sur notre disque dur.


## 5. Finalité du Lab

L'objectif est-il rempli ? Oui.

Pourquoi ? : On a réussi à faire tout le chemin : créer l'image à partir d'un Dockerfile, la faire tourner sur notre machine, l'envoyer sur le site Docker Hub pour qu'un collègue puisse la récupérer et faire marcher deux services en même temps avec Docker Compose.
