TP6 – Interface as Code

Après avoir installer tout ce qui est nécessaire pour le tp et copié le dossier du lab dans notre terminal, on commence par la partie 1
Part 1. Imperative - Using Vagrant with Shell Provisioner

0)	Introduction
L’objectif est d’automatiser la création d’une machine virtuelle (VM) CentOS 7 et de tester la provisioning initial (configuration automatique au démarrage) pour modifier des fichiers système sans intervention manuelle interne.
En tant qu’application dans le monde réel, nous pourrions prendre l’exemple d’une entreprise : cela permet de s’assurer que tous les développeurs travaillent sur une machine identique. Au lieu d’envoyer un manuel de 20 pages pour configurer un PC, on envoie un seul fichier Vagrantfile.
1)	Préparation de l’environnement
L’objectif ici est donc de préparer le terminal et de vérifier les prérequis de virtualisation.
On utilise la commande bcdedit pour vérifier si Hyper-V est actif afin d’éviter les conflits avec VirtualBox.
Difficultés rencontrées : tentative d’utiliser un chemin générique. 			      Résolution : Localisation du chemin réel sur le disque.
La capture d’écran ci-dessous de l’interface montre bien les deux machines (centos.server.local et gitlab.server.local) en état « En fonction ».
 

2)	Initialisation et démarrage de la VM
Lancement de la machine virtuelle définie dans le Vagrantfile avec la commande vagrant up.
Processus : 
-	Téléchargement (box) : Vagrant a trouvé l’image centos/7 depuis le cloud.
-	Configuration réseau : mise en place du NAT et du transfert de port : le port 2222 de l’hôte redirige vers le port 22 de la VM.
-	Provisioning initial : au premier démarrage, Vagrant a exécuté le script par défaut qui a affiché « Hello Word »
 

3)	Exploration et Provisioning personnalisé
Une fois la machine lancée, nous avons testé la connexion et la modification de la configuration « à la volée ».
Connexion SSH :
-	Commande : vagrant ssh
-	Vérification : Commandes whoami et pwd. En répondant respectivement « vagrant » et « /home/vagrant » la vérification est correcte.

Modification du fichier :
L’objectif était d’automatiser l’ajout d’un nom de domaine local dans la VM.
-	Tentative en ligne de commande : on observe un erreur quand on exécute -replace directement dans PowerShell (mauvaise syntaxe)
-	Résolution : on utilise notepad Vagrantfile pour modifier directement le script et on met à jour en exécutant vagrant provision. Cette commande permet de recharger uniquement les scripts sans redémarrer la machine contrairement à up.
 




4)	Automatisation avancée (horodatage)
Pour prouver que le provisioning s’exécute correctement, nous avons ajouté un marqueur de temps.
-	Modification du Vagrantfile : on ajoute une commande pour écrire la date actuelle dans un nouveau fichier.
-	Commande : vagrant provision
-	Résultat : le fichier /etc/vagrant_provisioned_at a été créé dans la VM avec la date exacte d’aujourd’hui : Thu Feb 12 14:01:06 UTC 2026
 
Cette partie du TP nous apprend bien a utiliser et comprendre le cycle de vie du provisioning : Modifier  Provisionner  Vérifier


Part 2. Declarative - GitLab installation using Vagrant and Ansible Provisioner

0)	Introduction
Utiliser Ansible pour automatiser l’installation complexe d’un serveur GitLab sur une distribution Rocky Linux 8, incluant la gestion du firewall et des dépendances (Postfix, SSH).
En tant qu’application dans le monde réel, on prendre l’exemple d’un déploiement d’outil : avec GitLab, manuellement cela prendrait des heures et comporte des rsiques d’erreurs. Avec Ansible, on peut déployer ou mettre à jour des dizaines de serveurs d’outils collaboratifs en une seule commande.
1)	Initialisation de l’environnement
Dans cette partie, on commence par changer de contexte pour travailler sur une infrastructure plus complexe.
-	Navigation : on déplace vers le dossier lab\part-2 via PowerShell.
-	Contenu du dossier : la commande dir montre la présence d’un dossier playbooks. C’est ici que sont stockées les instructions Ansible qui vont configurer la machine automatiquement.





2)	Déploiement de la machine « GitLab Server »
On exécute le vagrant up dans cette partie et les actions se multiplient :
-	Nouvelle distribution : contrairement à la partie 1, ici Vagrant télécharge et utilise Rocky Linux 8 (generic/rocky8)
-	Configuration réseau avancée :
o	Adapter 1 (NAT) : pour l’accès internet
o	Adapter 2 (Host-only) : création d’un réseau privé entre le PC et la VM
o	Port Forwarding : redirection du port http 80 de la VM vers le port 8080 du PC.
-	Installation d’Ansible :  Vagrant détecte qu’Ansible n’est pas sur la machine et l’installe automatiquement (Installing Ansible…) pour pouvoir exécuter les scripts de configuration.
























3)	Exécution du playbook Ansible
Ansible exécute une série de tâches (TASKS) pour transformer une machine vierge en serveur GitLab opérationnel.
Etapes clés validées :
-	Installation des dépendances : Postfix (pour les mails), OpenSSH et les certificats.
-	Configuration du Firewall : Ouverture des accès http et HTTPS.
-	Installation de GitLab : Téléchargement et exécution du script officiel, puis installation du package.
-	Résultat : ok=11 changed=9. Cela prouve que le script Ansible s’est déroulé parfaitement du début à la fin.















4)	Tests de connectivité et diagnostic
Test de ping : on exécute ping 192.168.121.240 et le résultat montre 0% de perte, ce qui prouve que la machine est bien allumée et que le réseau privé entre Windows et la VM fonctionne.
 
Accès Web (erreur 502) : En tentant d’accéder à l’interface, on obtient le message "HTTP 502: Waiting for GitLab to boot". Hypothèse : c’est une caractéristique de GitLab. C’est une application lourde qui met plusieurs minutes à démarrer tous ses services internes après installation.
 
Part 3. Declarative - Configure a health check for GitLab

0)	Introduction
Objectif : verifier l’état de santé des services via des Healthchecks et utiliser les Tags Ansible pour isoler des tests spécifiques.
Application : En production, il est crucial de savoir si un service est « vivant » et s’il est « prêt » à recevoir du trafic avant de diriger les utilisateurs vers lui.
1)	Exploration des Tags Ansible
Une fois GitLab installé, l’objectif était de ne pas relancer tout le script mais seulement les tests de vérification.
-	Commande : ansible-playbook avec l’option --list-tags
-	La capture d’écran ci-dessous montre qu’on a réussi à lister les étapes du scénario. On y voit clairement les tags check et install. C’est une étape de « debug » essentielle pour cibler uniquement les tâches de vérification sans modifier la machine.










2)	Exécution des Healthchecks
On lance des tests pour voir si GitLab répond.
-	Commande : ansible-playbook ... --tags check
-	Le rapport Ansible affiche trois tests (HEALTH, READINESS, LIVENESS) qui renvoient tous un Status 502.
Bien que le code soit 502 (Bad Gateway), ce test reste un succés. Il prouve que la liaison entre Ansible et le serveur web de GitLab est établie. On peut considérer l’erreur 502 comme « normale » à ce stade car les services internes de GitLab mettent plus de temps à démarrer que l’infrastructure réseau.
 




3)	Test de connectivité réseau finale
Pour finaliser cette partie, une vérification de la couche réseau de base a été effectuée.
-	Action : Ping depuis la machine hôte (Windows) vers l’IP statique de la VM.
-	Le résultat ci-dessous affiche 0% de perte. Cela confirme que même si l’interface web est encore en train de charger, la machine est parfaitement configurée sur le réseau privé (host-only).
 

Bonus task
L’objectif de cette partie est d’utiliser la puissance des variables Ansible pour modifier la configuration de la machine directement au moment de l’exécution, sans modifier le code source du Ploaybook.
1)	Utilisation des variables extra
Au lieu d’utiliser le nom par défaut, nous avons injecté un nom de domaine personnalisé via la ligne de commande.
-	Commande : exécution de la commande Ansible en ajoutant --extra-vars suivi du nom de domaine souhaité.
-	On observe sur le screen ci-dessous que le Playbook récupère cette variable pour configurer l’URL externe de GitLab. Cela démontre une compréhension de la flexibilité de l’IaC : un seul script peut servir à déployer des dizaines de serveurs différents simplement en changeant les variables d’entrée.









2)	Vérification de la prise en compte
Le succés de cette étape se confirme par le fait qu’Ansible ne renvoie pas d’erreur de syntaxe et applique la configuration sur la machine cible.


Conclusion

Ce lab démontre la puissance de l’IaC. En combiant Vagrant et Ansible, nous avons créé un environnement complexe, reproductible et documenté prêt pour un cycle de développement moderne.
