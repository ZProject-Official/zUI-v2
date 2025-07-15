---@param name string
zUI.ApplyTheme = function(name)
    assert(type(name) == "string", "zUI.ApplyTheme: Le nom du thème doit être une chaîne de caractères")
    assert(name ~= "", "zUI.ApplyTheme: Le nom du thème ne peut pas être vide")
    
    local theme = zUI.GetTheme(name)
    assert(theme ~= nil, "zUI.ApplyTheme: Impossible de récupérer le thème '" .. name .. "'")
    assert(type(theme) == "table", "zUI.ApplyTheme: Le thème '" .. name .. "' n'est pas dans un format valide")
    
    TriggerNuiEvent("app:applyTheme", {
        theme = theme
    })
end
