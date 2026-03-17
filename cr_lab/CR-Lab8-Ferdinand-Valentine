Ferdinand DELOISON & Valentine BOURY


ING4 DATA&IA APP Gp01

---------------------------------


# TP8 – Container orchestration with Kubernetes

On commence par clonner les ressources dont on a besoin dans notre environnement git puis on passe à l'installation de minikube

## Part 1. Install Minikube

Start de minikube :


Vérification du statut :
 

## Part 2.	Learn to use kubectl commands
On crée le pod et on vérifie qu’il est bien lancé :
 
Nom du pod : kubernetes-bootcamp-67fbdd6b79-7tfzm

On explore l’intérieur du pod et on trouve le fichier javascript demandé :
 

On vérifie la port et on teste l’app :
 
On voit bien sur la ligne www.listen(8080...) que l’application écoute sur le port 8080.
Pour le test, cela nous renvoit bien « Hello bootcamp ! »

Sortie et nouveau test :
 
Quand on sort et qu’on reteste avec la meme ligne, on obtient une erreur. C’est normal car notre application est isolée dans le réseau privé de Kubernetes.

## Part 3 : Learn to expose a Kubernetes service to the outside

On expose le service (on dit a kubernetes d’ouvrir le port 8080 au monde extérieur)
On vérifie le service créé et on regarde dans la colonne PORT(S) pour trouver notre port d’accès externe (ici 31468)
 

Cela ouvre une page web avec le résultat souhaité :
 
## Part 4 : Learn to scale up and down a Kubernetes deployment
On crée 5 répliques et on vérifie qu’elles tournent :
 
Quand on rafraichit la page web utilisée précédemment, on observe que le nom du pod où ça run on change. Cela veut dire que Kubernetes répartit bien les visites sur les 5 pods.

On réduit maintenant les pods à 2 :
 
On observe qu’il y en a bien que 2 qui run et les autres sont terminated. En retourant sur la page web on a de nouveau un changement de nom de pod.

## Part 5 : Run a multiple pod application in Kubernetes
On met à jour l’image avec une version 2 :
 
 
On voit le nom changer et v=2 à la place de 1. Kubernetes ne tue pas tout d’un coup, il lance un nouveau pod, attend qu’il soit prêt puis éteitn un ancien pod = rolling update.


On simule une erreur en essayant d’installer une version qui n’existe pas ou qui bug.
Pour la version 3 on obtient ça :
 
Il y a un pod avec l’état ImagePullBackOff  la mise à jour est bloquée car Kubernetes n’arrive pas à récupérer l’image v3.

On rollback et on vérifie qu’on est bien revenu à la version 2 (dernière version stable connue). Puis on repasse à la version 1.
 
 
La mise à jour a bien été faite sur le web.










## Part 6 : Deploy an app using Manifest yaml files
 
On apply les 2 fichiers deployment.yaml et service.yaml (il y a une ligne à ne pas prendre un compte car le ficchier service.yaml avait mal été enregistré). Quand on fait une modification dans un fichier il y a marqué configured à la place de created.
Quand on passe à 3 repliques, on regarde le statut et on voit bien les 3, on repassant à 1 réplique, il y en a donc 2 qui sont sous l’état ‘temrinated’.
Pour le service, on voit bien notre port 8080 qui est actif. Et le web est bien mis à jour.










Deployment.yaml : 
 

Service.yaml :
 

Pour finir, on stoppe toutes nos ressources :
 
