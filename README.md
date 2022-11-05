# Projet Test et Sécurité

## Pré-requis 
Télécharger nodeJS : https://nodejs.org/en/download/  
Télécharger gitHub : https://git-scm.com/downloads  
Télécharger Vue CLI : ```npm install -g @vue/cli``` (le -g permet de l'installer en global)

## Cloner le repository git
```
cypress
git clone https://github.com/AndreyPividori/polytechTestAndSecurity.git
```

## Project setup
Ouvrir un terminal dans le projet et récupérer les packages
```
cd project  
npm install  
```

### Compilation et HotFix pour le développement 
```
npm run serve
```

### Compilation et HotFix pour la MeP
```
npm run build
```

### Linter
```
npm run lint
```

### Tests
```
npm install @vue/cli-plugin-unit-jest
npx vue add unit-jest
```

