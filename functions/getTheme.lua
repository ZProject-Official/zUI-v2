---@param name string
zUI.GetTheme = function(name)
    assert(type(name) == "string", "zUI.GetTheme: Le nom du thème doit être une chaîne de caractères")
    assert(name ~= "", "zUI.GetTheme: Le nom du thème ne peut pas être vide")
    
    local theme = LoadResourceFile(GetCurrentResourceName(), ("themes/%s.json"):format(name))
    assert(theme ~= nil, "zUI.GetTheme: Le thème '" .. name .. "' n'a pas été trouvé")
    
    local success, decoded = pcall(json.decode, theme)
    assert(success, "zUI.GetTheme: Erreur lors du décodage du thème '" .. name .. "': " .. tostring(decoded))
    assert(type(decoded) == "table", "zUI.GetTheme: Le thème '" .. name .. "' n'est pas un JSON valide")
    
    return decoded
end
