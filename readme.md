# Documentation zUI - Système de Menu Interactif pour FiveM

## 📋 Table des matières
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Création d'un menu](#création-dun-menu)
5. [Éléments de menu disponibles](#éléments-de-menu-disponibles)
6. [Personnalisation des thèmes](#personnalisation-des-thèmes)
7. [Fonctions utilitaires](#fonctions-utilitaires)
8. [Exemples pratiques](#exemples-pratiques)

---

## 🚀 Introduction

zUI est un système de menu moderne et personnalisable pour FiveM, développé avec TypeScript/React pour l'interface et Lua pour la logique côté client. Il offre une expérience utilisateur fluide avec des animations et des effets visuels avancés.

### Fonctionnalités principales :
- ✅ Interface moderne et responsive
- ✅ Nombreux types d'éléments (boutons, sliders, listes, etc.)
- ✅ Thèmes personnalisables
- ✅ Animations fluides
- ✅ Support multi-niveaux (sous-menus)
- ✅ Gestion du focus et des interactions

---

## 📦 Installation

1. Téléchargez le script et placez-le dans votre dossier `resources`
2. Ajoutez `ensure zUI-Dev` dans votre `server.cfg`
3. Redémarrez votre serveur

### Structure des fichiers :
```
zUI-Dev/
├── fxmanifest.lua          # Manifest du script
├── common.lua              # Variables et fonctions communes
├── themes/                 # Thèmes de l'interface
├── menu/                   # Logique des menus
├── functions/              # Fonctions utilitaires
└── web/                    # Interface React/TypeScript
```

---

## ⚙️ Configuration

### Thèmes disponibles
Les thèmes sont définis dans le dossier `themes/`. Le thème par défaut (`default.json`) peut être modifié selon vos besoins.

#### Structure d'un thème :
```json
{
  "menu": {
    "displayBanner": true,
    "displayInformations": true,
    "displayControlsIndicator": true,
    "cornersRadius": 0.5,
    "perspective": true,
    "margin": false,
    "shadow": true,
    "hoverStyle": "liquid",
    "animations": {
      "entry": "zoomIn",
      "exit": "slideOutVertical",
      "onSwitch": true,
      "onScroll": true
    },
    "colors": {
      "primary": "#FF3837",
      "background": "rgba(18, 18, 18, 0.5)",
      "description": "#121212",
      "informations": "#121212",
      "controlsIndicator": "#121212",
      "itemSelected": "#FF3837",
      "banner": "#FF3837"
    },
    "font": "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
    "maxVisibleItems": 10
  }
}
```

---

## 🎯 Création d'un menu

### Menu principal
```lua
-- Créer un menu principal
local monMenu = zUI.CreateMenu(
    "Titre du Menu",           -- title (string|nil)
    "Sous-titre",              -- subtitle (string|nil)
    "Description du menu",     -- description (string|nil)
    "default",                 -- theme (string)
    "https://example.com/banner.png", -- banner (string|nil)
    "F5",                      -- key (string|nil)
    "keyboard"                 -- mapping (string|nil)
)
```

### Sous-menu
```lua
-- Créer un sous-menu
local monSousMenu = zUI.CreateSubMenu(
    monMenu,                   -- parent (string)
    "Titre du Sous-Menu",      -- title (string|nil)
    "Sous-titre",              -- subtitle (string|nil)
    "Description du sous-menu" -- description (string|nil)
)
```

### Définir les éléments du menu
```lua
-- Définir les éléments du menu
zUI.SetItems(monMenu, function()
    -- Ajouter vos éléments ici
    zUI.Button("Mon Bouton", "Description", {}, function(onSelected)
        if onSelected then
            print("Bouton cliqué !")
        end
    end)
end)
```

### Afficher/Masquer le menu
```lua
-- Afficher le menu
zUI.SetVisible(monMenu, true)

-- Masquer le menu
zUI.SetVisible(monMenu, false)
```

---

## 🧩 Éléments de menu disponibles

### 1. Button (Bouton)
```lua
zUI.Button(label, description, styles, action, submenu)
```

**Paramètres :**
- `label` (string) : Texte du bouton
- `description` (string|nil) : Description affichée
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du clic
- `submenu` (string|nil) : ID du sous-menu à ouvrir

**Exemple :**
```lua
zUI.Button("Téléportation", "Se téléporter au garage", {
    IsDisabled = false,
    RightLabel = "→",
    RightBadge = "https://example.com/icon.png",
    LeftBadge = ""
}, function(onSelected)
    if onSelected then
        -- Logique de téléportation
        SetEntityCoords(PlayerPedId(), 100.0, 200.0, 30.0)
    end
end)
```

### 2. Checkbox (Case à cocher)
```lua
zUI.Checkbox(label, description, state, styles, action)
```

**Paramètres :**
- `label` (string) : Texte de la checkbox
- `description` (string|nil) : Description
- `state` (boolean) : État initial (coché/non coché)
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du changement

**Exemple :**
```lua
local godModeEnabled = false

zUI.Checkbox("God Mode", "Activer l'invincibilité", godModeEnabled, {
    IsDisabled = false
}, function(onSelected)
    if onSelected then
        godModeEnabled = not godModeEnabled
        SetPlayerInvincible(PlayerId(), godModeEnabled)
    end
end)
```

### 3. List (Liste déroulante)
```lua
zUI.List(label, description, items, index, styles, action)
```

**Paramètres :**
- `label` (string) : Titre de la liste
- `description` (string) : Description
- `items` (table) : Liste des éléments
- `index` (number) : Index de l'élément sélectionné
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du changement

**Exemple :**
```lua
local vehicules = {"Adder", "Zentorno", "T20", "Osiris"}
local vehiculeIndex = 1

zUI.List("Véhicule", "Choisir un véhicule", vehicules, vehiculeIndex, {
    IsDisabled = false
}, function(onSelected, onChange, index)
    if onChange then
        vehiculeIndex = index
    elseif onSelected then
        -- Spawner le véhicule sélectionné
        local vehicleHash = GetHashKey(vehicules[vehiculeIndex])
        RequestModel(vehicleHash)
        -- ... logique de spawn
    end
end)
```

### 4. Slider (Curseur)
```lua
zUI.Slider(label, description, percentage, step, styles, action)
```

**Paramètres :**
- `label` (string) : Titre du slider
- `description` (string) : Description
- `percentage` (number) : Valeur initiale (0-100)
- `step` (number) : Pas d'incrémentation
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du changement

**Exemple :**
```lua
local volume = 50

zUI.Slider("Volume", "Régler le volume", volume, 5, {
    IsDisabled = false,
    ShowPercentage = true
}, function(onSelected, onChange, percentage)
    if onChange then
        volume = percentage
        -- Appliquer le volume
    end
end)
```

### 5. ColorPicker (Sélecteur de couleur)
```lua
zUI.ColorPicker(label, description, value, styles, action)
```

**Paramètres :**
- `label` (string) : Titre du color picker
- `description` (string) : Description
- `value` (string) : Couleur initiale (format hex)
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du changement

**Exemple :**
```lua
local couleurVehicule = "#FF0000"

zUI.ColorPicker("Couleur", "Choisir la couleur du véhicule", couleurVehicule, {
    IsDisabled = false
}, function(onChange, value)
    if onChange then
        couleurVehicule = value
        -- Appliquer la couleur au véhicule
    end
end)
```

### 6. ColorsList (Liste de couleurs)
```lua
zUI.ColorsList(label, description, colors, index, styles, action)
```

**Paramètres :**
- `label` (string) : Titre de la liste
- `description` (string) : Description
- `colors` (table) : Liste des couleurs (format hex)
- `index` (number) : Index de la couleur sélectionnée
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du changement

**Exemple :**
```lua
local couleurs = {"#FF0000", "#00FF00", "#0000FF", "#FFFF00"}
local couleurIndex = 1

zUI.ColorsList("Couleurs", "Sélectionner une couleur", couleurs, couleurIndex, {
    IsDisabled = false
}, function(onSelected, onChange, index)
    if onChange then
        couleurIndex = index
    elseif onSelected then
        -- Appliquer la couleur sélectionnée
    end
end)
```

### 7. TextArea (Zone de texte)
```lua
zUI.TextArea(label, description, value, placeholder, styles, action)
```

**Paramètres :**
- `label` (string) : Titre de la zone de texte
- `description` (string) : Description
- `value` (string) : Valeur initiale
- `placeholder` (string) : Texte d'indication
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du changement

**Exemple :**
```lua
local nomJoueur = ""

zUI.TextArea("Nom", "Entrer votre nom", nomJoueur, "Tapez ici...", {
    IsDisabled = false
}, function(onChange, value)
    if onChange then
        nomJoueur = value
        -- Traiter le nom saisi
    end
end)
```

### 8. SearchBar (Barre de recherche)
```lua
zUI.SearchBar(label, description, value, placeholder, styles, action)
```

**Paramètres :**
- `label` (string) : Titre de la barre de recherche
- `description` (string) : Description
- `value` (string) : Valeur initiale
- `placeholder` (string) : Texte d'indication
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du changement

### 9. LinkButton (Bouton lien)
```lua
zUI.LinkButton(label, description, link, styles)
```

**Paramètres :**
- `label` (string) : Texte du bouton
- `description` (string) : Description
- `link` (string) : URL à ouvrir
- `styles` (table) : Options de style
- `action` (function) : Fonction appelée lors du clic

### 10. Line (Ligne colorée)
```lua
zUI.Line(colors)
```

**Paramètres :**
- `colors` (table|nil) : Liste des couleurs pour le dégradé

**Exemple :**
```lua
zUI.Line({"#FF0000", "#00FF00", "#0000FF"})
```

### 11. Separator (Séparateur)
```lua
zUI.Separator(label, position)
```

**Paramètres :**
- `label` (string) : Texte du séparateur
- `position` (string) : Position ("left", "center", "right")

**Exemple :**
```lua
zUI.Separator("VÉHICULES", "center")
```

---

## 🎨 Personnalisation des thèmes

### Styles de survol disponibles :
- `complete` : Arrière-plan complet
- `rod` : Barre latérale
- `neon` : Effet néon
- `border` : Bordure
- `modern` : Style moderne avec dégradé
- `glowInset` : Lueur interne
- `twist` : Effet de torsion
- `liquid` : Effet liquide

### Animations disponibles :
- `fadeIn` / `fadeOut`
- `slideInHorizontal` / `slideOutHorizontal`
- `slideInVertical` / `slideOutVertical`
- `zoomIn` / `zoomOut`
- `bounceIn` / `bounceOut`

---

## 🛠️ Fonctions utilitaires

### Gestion de l'affichage
```lua
-- Vérifier si un menu est visible
local isVisible = zUI.IsVisible(menuId)

-- Fermer tous les menus
zUI.CloseAll()

-- Revenir au menu précédent
zUI.Goback()

-- Naviguer vers un menu spécifique
zUI.Goto(menuId)
```

### Modification des propriétés
```lua
-- Changer le titre
zUI.SetTitle(menuId, "Nouveau titre")

-- Changer le sous-titre
zUI.SetSubtitle(menuId, "Nouveau sous-titre")

-- Changer la description
zUI.SetDescription(menuId, "Nouvelle description")

-- Définir si le menu est fermable
zUI.SetIsClosable(menuId, true)
```

### Événements
```lua
-- Fonction appelée à l'ouverture
zUI.SetOpenHandler(menuId, function()
    print("Menu ouvert !")
end)

-- Fonction appelée à la fermeture
zUI.SetCloseHandler(menuId, function()
    print("Menu fermé !")
end)
```

### Obtenir l'élément survolé
```lua
local hoveredItemId = zUI.GetHoveredItem()
```

---

## 📝 Exemples pratiques

### Exemple 1 : Menu de véhicules
```lua
```

---

## 🎮 Contrôles

### Navigation au clavier :
- **↑ / ↓** : Naviguer dans les éléments
- **← / →** : Modifier les valeurs (sliders, listes)
- **Entrée** : Sélectionner/Activer un élément
- **Retour arrière** : Revenir au menu précédent / Fermer le menu (si autoriser)

---

## 🤝 Support

Pour obtenir de l'aide ou signaler un bug :
1. Vérifiez cette documentation
2. Consultez les exemples fournis
3. Contactez l'équipe de développement

---

**Développé par zSquad** - Version 2.0.0

*Cette documentation couvre toutes les fonctionnalités principales de zUI. N'hésitez pas à expérimenter et à personnaliser selon vos besoins !*
