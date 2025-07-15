---@param id string
---@param description string
zUI.SetDescription = function(id, description)
    local menu = MENUS[id]
    assert(type(id) == "string", "zUI.SetDescription: L'ID du menu doit être une chaîne de caractères")
    assert(menu, "zUI.SetDescription: Le menu avec l'ID '" .. id .. "' n'existe pas")
    if id == CURRENT_MENU then
        TriggerNuiEvent("menu:show", {
            title = menu.title,
            subtitle = menu.subtitle,
            description = description,
            theme = menu.theme,
            banner = menu.banner,
        })
    end
    MENUS[id].description = description
end
