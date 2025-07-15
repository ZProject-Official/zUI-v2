---@param id string
zUI.IsVisible = function(id)
    assert(type(id) == "string", "zUI.IsVisible: L'ID du menu doit être une chaîne de caractères")
    assert(MENUS[id], "zUI.IsVisible: Le menu avec l'ID '" .. id .. "' n'existe pas")

    return MENUS[id].visible
end