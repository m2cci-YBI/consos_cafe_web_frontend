# consos_cafe_web_frontend

## Presentation:

Ce Repertoire concerne le developpement de la partie front end de l'application WEB-CAFE en vueJS

### Setting pour realiser un projet VueJs:

 
-installer nodejs  
-installer vue CLI 

versions utilisées pour ce projet:

-vue/cli 4.4.1
-npm 6.4.1
-node v10.15.0

### Creation de projet VueJs

Commande : vue create <nomProjet>

puis suivre les instructions du CLI

### Execution de l'application :

pour executer l'application , executer cette commande depuis le terminal de vicual studio code :

npm run serve

l'application de deploie sur localhost/8080
on configure donc le backEnd sur localhost/8081


### Erreurs D'executions

-Erreur CORS (Cross Origin Ressource Sharing)

voir les liens suivant :
https://blog.container-solutions.com/a-guide-to-solving-those-mystifying-cors-issues
https://www.youtube.com/watch?v=UjozQOaGt1k

Erreur qui a lieu quand on se connecte a une domaine depuis un origine different localhost:8080 qui demande des data à localhost:8081

Solution:

Pour la resoudre il faut specifier dans le backend les domaines autorisées a recevoir les data, autoriser les differents methodes get post put delete options , et autoriser les headers,L'implementation de cela est dans le package com.example.demo.auth,class:CorsFilter.

Si vous vous connectez a la parti backend depuis postman ou insomnia vous n'aurez pas ce probleme car la verification CORS est faite juste par les browsers


-Erreur d'execution

Il se peut que vous ayez cette erreur lors de l'execution sur windows 10 " Error from chokidar (C:\): Error: EBUSY: resource busy or locked, lstat 'C:\swapfile.sys' "

Solution :

supprimer le fichier node_modules .
Executer commande : npm install .
Executer commande : run npm cache clean .




### Dépendances du pojet :

Les dependances ajoutées au projet sont dans le fichier package.json:

Library d'icon fontawsome

    ```
    @fortawesome/fontawesome-svg-core": "^1.2.29
    @fortawesome/free-solid-svg-icons": "^5.13.1
    @fortawesome/vue-fontawesome": "^0.1.10
    ```
module de requettes asynchrones axios
    ```
    "axios": "^0.19.2"
    ```
Library html,css ,js boostrap
    ```
    "bootstrap": "^4.5.0"
    "jquery": "^3.5.1"
    "popper.js": "^1.16.1"
    ```
library pour le data visualisation

    ```
       "chart.js": "^2.9.3",
    ```
library de decodage du jwt token

    ```
    "vue-jwt-decode": "^0.1.0",
    ```
module de routage de vuejs

    ```
    "vue-router": "^3.2.0",
    ```
module du store de vuejs

    ```
    "vuex": "^3.4.0",
    ```
module de persistance store de vuejs(pour resoudre le probleme de perte des data du store lors du reload d'une page )

    ```
    "vuex-persistedstate": "^3.0.1"
    ```
