Projet7Groupomania

Après avoir installer NodeJs:

Création Backend : Depuis le terminal backend:
-ajouter npm init, pour démarrer le projet (point d’entré server.js), cela créé également un fichier package.json qui contiendra les packages qu’on devra installer avec npm

Désormai il faut installer les différents packages avec npm (liste des packages disponible dans le fichier packgage.json)

Depuis le terminal backend du dossier on saisie dans l'ordre:

-npm install -g sequelize-cli, -npm install --save sequelize, -npm install mysql --save, -npm install mysql2 --save,

-sequelize init

créer localement (depuis le terminal backend) les tables de la base de donnée en s'inspirant de mon dossier "models" (ex : depuis le terminal backend on saisie: sequelize model:create –attributes «email:string….  » --name User, création de la table User)
créer localement la base de donnée (ex: depuis le terminal "MySQL Commande Line Client" on saisie : create database database_development_groupomania;)
ensuite on migre les tables créées vers la base de donnée : sequelize db:migrate
les tables sont désormais disponible dans la base de donnée

Ou importer le document groupomania directement dans phpMyAdmin.

Dans le dossier backend/config/env remplacer les valeurs par défaut pour accéder à la base de données.

Le serveur MySQL doit être activé en même temps que le serveur backend (localhost:3000) et frontend (localhost:8080)

Depuis le terminal côté frontend on saisie dans l'ordre:

npm install -g @vue/cli (installation vue cli)
vue create groupomania (création du projet vue cli) Après avoir fini de configurer votre projet Vue Cli selon vos préférences, il faut saisir dans l'ordre
cd front-end
cd groupomania
npm run serve
aller ensuite sur "http://localhost:8080/signup"