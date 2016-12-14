#####PRE-REQUIS#####

Pour que le logiciel puisse fonctionner, il requiert deux choses:
- Que nodejs soit installé sur la machine
- Que le SGBD MySQL soit en fonctionnement, et qu'il contienne déjà le schéma de la base de données

#####INSTALLATION DES DEPENDANCES#####

Le logiciel contient un certain nombre de dépendances qu'il est nécessaire d'installer avant de tenter le lancer le logiciel.
Pour ce faire, il faut exécuter une ligne de commande reprenant les variables d'environnement de NodeJS. Typiquement, lors de
l'installation de NodeJS, un raccourci vers cette ligne de commande est créée sous le nom de "NodeJS command Prompt".

Une fois dans l'invite de commande, il suffit de se déplacer jusque dans le dossier contenant le logiciel (typiquement .../pronto-master/Pronto)
et d'y exécuter la commande "npm install". Ensuite, il faut se déplacer dans le sous-dossier ProntoAdmin
(typiquement .../pronto-master/Pronto/ProntoAdmin) et réexécuter la même commande (npm install) pour que l'interface d'administration
dispose aussi de ses dépendances.

#####LANCEMENT DU LOGICIEL#####

Une fois ces étapes effectuées, il suffit, toujours depuis le même invite de commandes, d'exécuter le logiciel grâce à
"node serveur.js". Pour accéder à l'interface de prise de commande, il suffit de se connecter à l'IP de la machine exécutant le serveur sur le port 3000
(typiquement 192.168.XXX.XXX:3000).
Le principe est exactement le même avec l'interface d'administration. Une fois dans le dossier ProntoAdmin, il suffit d'exécuter "node main.js".
Pour accéder à l'interface d'administration, on utilise encore une fois l'adresse IP de la machine, mais sur le port 3100 cette-fois
(typiquement 192.168.XXX.XXX:3100).

#####ORGANIGRAME DES INTERFACES#####

Accès à l'interface de:

prise de commande: 192.168.XXX.XXX:3000
cuisine: 192.168.XXX.XXX:3000/cuisine.html
bar: 192.168.XXX.XXX:3000/bar.html
caisse: 192.168.XXX.XXX:3000/caisse
administration: 192.168.XXX.XXX:3100

[TL;DR]
Install NodeJS
Start DB
"cd /path/to/app/folder"
"npm install"
"npm install ./ProntoAdmin"
"node serveur.js"
"cd ./ProntoAdmin"
"node main.js"
