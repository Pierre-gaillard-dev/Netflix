# Netflix

Projet ayant pour but de faire partie de mon portfolio. 
L'idée est de recréer l'interface de Netflix via un ou plusieurs framework (à définir selon les nécessités).
Il faudrait à la fois du développement back-end et front-end.

## Partie front-end :
création de 5 pages :
- Accueil
    - section hero
    - group by genre
    - parce que vous avez regardé ...
- Séries
- Films
    - tri par genre
    - si pas de tri, groupe par genre (comme page d'accueil)
- Nouveautés les plus regardées
- nouveautés sur netflix
    - top 10 des films aujourd'hui : France
    - top 10 des séries aujourd'hui : France
    - Disponible la semaine prochaine
    - disponible cette semaine
    - valent bien l'attente
- Ma liste
    - liste de films qu'on a aimé -> pour algo de recommandations
- Explorer par langue
- Recherche
- Mon compte

## Backend
Création de base de données :
https://dbdiagram.io/d/Netflix-6786bd976b7fa355c3e11288

Création d'une Api :
User :
- Profil (GET)
- Inscription (GET)
- Connexion (GET)
- Deconnexion (GET)

Film :
- Liste des films (GET)
- Liste des films par genre (GET)
- Liste des films par acteurs (GET)
- Liste des films par date de sortie (GET)

Serie :
- Liste des séries (GET)
- Liste des séries par genre (GET)
- Liste des séries par acteurs (GET)
- Liste des séries par date de sortie (GET)

Genres :
- Liste des genres (GET)

Acteurs :
- Liste des acteurs (GET)

## Organisation
Tout d'abord, il va falloir que je me renseigne sur les différentes technologies de back-end et bdd que je pourrais utiliser, puis les technologies de front-end que je pourrai utiliser.

La première partie de production de ce projet sera de créer la base de données, puis de la contrôler dans le back-end.
Ensuite, je devrai créer l'API qui utilisera la base de données pour la mettre à disposition au front qui arrivera (pas d'authentification ni de comptes).

A partir de là, je vais pouvoir mettre en place la partie front-end. je travaillerai en page par page, en réutilsant des éléments pour gagenr du temps et de l'efficacité. 
L'objectif du front-end serait simplement d'afficher des listes de films et séries groupés par catégories, genres ou autre.

Une fois cela fait, je pourrai me pencher sur des éléments complexes qui me prendront beaucoup de temps mais qui ne seront peut-être pas réalisable dans le temps donné par l'école. 
ces éléments seront la gestion de compte, les algorithmes de recommandation

## Technologies	
### Back-end
- Node.js
- Sequelize (pour la gestion de la base de données)
- TypeScript
- PostgreSQL (pour la base de données)

### Front-end
- React
- Typescript
- Next.js (à voir pour le routing)