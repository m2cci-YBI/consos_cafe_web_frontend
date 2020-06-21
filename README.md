# consos_cafe_web_frontend

##Presentation:

Ce Repertoire concerne le developpement de la partie front end de l'application WEB-CAFE en vueJS

### Setting pour realiser un projet VueJs:

-installer npm
-installer nodejs
-installer vue CLI 


### Execution de l'application :

pour executer l'application , executer cette commande depuis le terminal de vicual studio code :

npm run serve

l'application de deploie sur localhost/8080
on configure donc le backEnd sur localhost/8081
Vous pourrez trouver le fichier jar de la partie backEnd dans le repertoire du projet backEnd , fichier target , et l'exuter depuis ligne de commande avec la commande:
 java -jar nomfichier.jar

### base de donnee

Les donnees de la bd couvrent uniquement les semaines 25 , 26 , 27 .Pour faire un test , choisir parmi ces semaines.


### Erreurs D'executions

-Erreur CORS 

voir le lien suivant :
https://blog.container-solutions.com/a-guide-to-solving-those-mystifying-cors-issues
https://www.youtube.com/watch?v=UjozQOaGt1k

Erreur qui a lieu quand on se connecte a une domaine depuis un origine different :localhost/8080 qui demande des data à localhost/8081

Pour la resoudre il faut specifier dans le backend les domaines autorisées a recevoir les data, autoriser les differents methodes get post put delete options , et autoriser les headers.

On a donc defini une classe de configuration dans la parti backend qui autorise cela.

Si vous vous connectez a la parti backend depuis postman ou insomnia vous n'aurez pas ce probleme car la verification CORS est faite juste par les browsers,

