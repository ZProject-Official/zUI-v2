---@param name string
zUI.GetTheme = function(name)
    assert(type(name) == "string", "zUI.GetTheme: Le nom du thème doit être une chaîne de caractères")
    assert(name ~= "", "zUI.GetTheme: Le nom du thème ne peut pas être vide")
    
    local theme = LoadResourceFile(GetCurrentResourceName(), ("themes/%s.json"):format(name))
    assert(theme ~= nil, "zUI.GetTheme: Le thème '" .. name .. "' n'a pas été trouvé")
    
    local success, decoded = pcall(json.decode, theme)
    assert(success, "zUI.GetTheme: Erreur lors du décodage du thème '" .. name .. "': " .. tostring(decoded))
    assert(type(decoded) == "table", "zUI.GetTheme: Le thème '" .. name .. "' n'est pas un JSON valide")
    
    -- Validation sécurisée du contenu JSON
    assert(decoded.menu and type(decoded.menu) == "table", "zUI.GetTheme: Structure de thème invalide - 'menu' manquant")
    assert(decoded.info and type(decoded.info) == "table", "zUI.GetTheme: Structure de thème invalide - 'info' manquant")
    
    -- Validation des propriétés critiques menu
    local menu = decoded.menu
    assert(type(menu.colors) == "table", "zUI.GetTheme: 'menu.colors' doit être un objet")
    assert(type(menu.animations) == "table", "zUI.GetTheme: 'menu.animations' doit être un objet")
    
    -- Sanitisation des couleurs (anti-injection CSS)
    for key, color in pairs(menu.colors) do
        if type(color) == "string" then
            -- Permettre seulement hex, rgba, rgb, mots-clés CSS sûrs
            if not string.match(color, "^#[0-9A-Fa-f]+$") and 
               not string.match(color, "^rgba?%([%d%s,%.]+%)$") and
               not string.match(color, "^[a-zA-Z]+$") then
                error("zUI.GetTheme: Couleur invalide détectée: " .. tostring(color))
            end
        end
    end
    
    return decoded
end
