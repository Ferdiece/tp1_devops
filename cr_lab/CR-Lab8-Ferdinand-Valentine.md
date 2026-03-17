Ferdinand DELOISON & Valentine BOURY


ING4 DATA&IA APP Gp01

---------------------------------


# TP8 – Container orchestration with Kubernetes

On commence par clonner les ressources dont on a besoin dans notre environnement git puis on passe à l'installation de minikube

## Part 1. Install Minikube

Start de minikube :
<img width="945" height="401" alt="image" src="https://github.com/user-attachments/assets/cfee36d0-2230-4154-ab49-3784516ce059" />
<img width="945" height="465" alt="image" src="https://github.com/user-attachments/assets/6ee8706d-e8c0-4ce3-8c4f-190801abf8e6" />


Vérification du statut :
<img width="666" height="258" alt="image" src="https://github.com/user-attachments/assets/23a749cf-dccd-4850-9eb3-f7d18d098a23" />


## Part 2.	Learn to use kubectl commands
On crée le pod et on vérifie qu’il est bien lancé :
<img width="945" height="187" alt="image" src="https://github.com/user-attachments/assets/2259fb34-4983-4ab3-b484-4ba6592d5527" />
Nom du pod : kubernetes-bootcamp-67fbdd6b79-7tfzm

On explore l’intérieur du pod et on trouve le fichier javascript demandé :
<img width="945" height="246" alt="image" src="https://github.com/user-attachments/assets/2d0be71b-19b9-49b3-bdcd-f12584c899fe" />


On vérifie la port et on teste l’app :
<img width="945" height="605" alt="image" src="https://github.com/user-attachments/assets/85c517d7-1f95-4906-b133-f894221ff4e9" />
On voit bien sur la ligne www.listen(8080...) que l’application écoute sur le port 8080.
Pour le test, cela nous renvoit bien « Hello bootcamp ! »

Sortie et nouveau test :
<img width="945" height="276" alt="image" src="https://github.com/user-attachments/assets/aecb4769-a8d0-447a-ac82-dadc760f40ea" />
Quand on sort et qu’on reteste avec la meme ligne, on obtient une erreur. C’est normal car notre application est isolée dans le réseau privé de Kubernetes.

## Part 3 : Learn to expose a Kubernetes service to the outside

On expose le service (on dit a kubernetes d’ouvrir le port 8080 au monde extérieur)
On vérifie le service créé et on regarde dans la colonne PORT(S) pour trouver notre port d’accès externe (ici 31468)
<img width="945" height="374" alt="image" src="https://github.com/user-attachments/assets/204649cc-5983-491d-ac79-d1f298b6421e" />


Cela ouvre une page web avec le résultat souhaité :
<img width="945" height="186" alt="image" src="https://github.com/user-attachments/assets/548bcca7-a5a0-40e2-b097-6541a52b861f" />

## Part 4 : Learn to scale up and down a Kubernetes deployment
On crée 5 répliques et on vérifie qu’elles tournent :
<img width="945" height="273" alt="image" src="https://github.com/user-attachments/assets/800da786-e9a0-4a51-8dba-fd0be9d9df5a" />
Quand on rafraichit la page web utilisée précédemment, on observe que le nom du pod où ça run on change. Cela veut dire que Kubernetes répartit bien les visites sur les 5 pods.

On réduit maintenant les pods à 2 :
<img width="945" height="242" alt="image" src="https://github.com/user-attachments/assets/ddaaa715-2f24-44bc-b5db-64ed1379d8ce" />
On observe qu’il y en a bien que 2 qui run et les autres sont terminated. En retourant sur la page web on a de nouveau un changement de nom de pod.

## Part 5 : Run a multiple pod application in Kubernetes
On met à jour l’image avec une version 2 :
<img width="945" height="73" alt="image" src="https://github.com/user-attachments/assets/15a5636d-98b2-416b-bc65-6d0ce8953549" />
<img width="945" height="138" alt="image" src="https://github.com/user-attachments/assets/970d0f68-d1c0-44a9-a083-96f43fc3e0ff" />
On voit le nom changer et v=2 à la place de 1. Kubernetes ne tue pas tout d’un coup, il lance un nouveau pod, attend qu’il soit prêt puis éteitn un ancien pod = rolling update.


On simule une erreur en essayant d’installer une version qui n’existe pas ou qui bug.
Pour la version 3 on obtient ça :
<img width="945" height="222" alt="image" src="https://github.com/user-attachments/assets/35c44187-5a94-41ec-a3af-b85586be1ae7" />
Il y a un pod avec l’état ImagePullBackOff  la mise à jour est bloquée car Kubernetes n’arrive pas à récupérer l’image v3.

On rollback et on vérifie qu’on est bien revenu à la version 2 (dernière version stable connue). Puis on repasse à la version 1.
<img width="945" height="211" alt="image" src="https://github.com/user-attachments/assets/30c36cef-fb05-4c78-9ee7-6afede7bfb7d" />
<img width="945" height="138" alt="image" src="https://github.com/user-attachments/assets/880ba0ea-f701-416a-88b9-71dd49ecd53d" />
La mise à jour a bien été faite sur le web.


## Part 6 : Deploy an app using Manifest yaml files
<img width="945" height="689" alt="image" src="https://github.com/user-attachments/assets/d4885141-c1d9-4d9c-bd31-9c9a70d66d90" />
On apply les 2 fichiers deployment.yaml et service.yaml (il y a une ligne à ne pas prendre un compte car le ficchier service.yaml avait mal été enregistré). Quand on fait une modification dans un fichier il y a marqué configured à la place de created.
Quand on passe à 3 repliques, on regarde le statut et on voit bien les 3, on repassant à 1 réplique, il y en a donc 2 qui sont sous l’état ‘temrinated’.
Pour le service, on voit bien notre port 8080 qui est actif. Et le web est bien mis à jour.










Deployment.yaml : 
 

Service.yaml :
 

Pour finir, on stoppe toutes nos ressources :
 
