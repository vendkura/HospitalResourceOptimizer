# Description des principaux types de modèles de machine learning

## Regression
- But : Predire une valeur continue numerique comme le prix d'un maison, la duree d'un sejour et bien plus.

- Exemples de methode de regression lineaire appliquee
- - Regression lineaire : facile a utiliser et est plutot performant pour les relations lineaire sans dependances complexes entre les donnees.
- - Regression polynomiale : utilisation adaptee dans le cas des relations 
- - Modeles avancees a utiliser en fonction des complexite : Random Forest Regressor, XGBoost

## Classification
- But : predire une classe ou une categorie, par exemple chat ou chien, riche ou pauvre, indie dev ou pas, etc...

- Exemples de methodes :
- - Logistic regression : applicable pour les decisions binaires dont vrai ou faux en fonction de la classe identifiee
- - SVM, Random Forest, XGBoost : applicables dans les cas on doit predire plusieurs categories ou avec des relations plus complexes que yes or no

## Clustering
- But : Grouper ou reunir des donnees similaires sans labels ou etiquettes 

- Exemples de methodes : 
- - K-means : applicables a la detection de nombreux groupes ou clusters 
- - DBSCAN : applicables pour des clusters plus complexes

## Series temporelles :
- But : Predire des valeurs chronologiques, c'est a dire l'evolution des valeurs dans le temps.

- Exemples de methodes : 
- - ARIMA, Prophet, LSTM(en deep learning)



# Coefficient dans la regression lineaire
## Defition : 
Le coefficient sert a mesurer l'impact d'une feature sur la variable cible . En fonction du resultat obtenu pour une feature donnee, nous pouvons determiner son impact. Plus le coefficient est grand plus la feature a un impact fort.

Donc je peux me baser sur les valeurs retourner de chacun des features et savoir lequel a le plus d'impact et ainsi savoir comment m'orienter dans les etapes suivantes.

# Enregistrer les modeles entrainer afin de les reutiliser selon le besoin
Les modeles ML peuvent etre enregistrer avec les parametres et les donnees d'entrainement puis etre utiliser au besoins.
Le processus d'enregistrement s'appelle serialisation tandis que le processus d'utilisation se fait en deserialisant ce que nous avons serialiser plus tot qui nous permet de retrouver notre modele sans avoir a recalculer a nouveau.
Nous avons donc 2 mains lib a notre disposition a ce que je sache actuellement :
## Joblib : 
- Utile pour serialiser les donnees volumineuses comme les ML 
- Rapide pour la sauvegarde des donnees
- Permet  de mieux gerer les grands tableaux numpy
- concu plus pour les modeles ML
- Moins universel que Pickle

## Pickle : 
-  Serialiser et deserialiser les objets python
- Universel et fonctionnant presque avec tous les objets Python
- Lent pour les objets volumineux dont les modeles ML ou de grands datasets
