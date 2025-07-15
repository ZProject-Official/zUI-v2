---@param id string
---@param title string
zUI.SetTitle = function(id, title)
    local menu = MENUS[id]
    assert(type(id) == "string", "zUI.SetTitle: L'ID du menu doit être une chaîne de caractères")
    assert(menu, "zUI.SetTitle: Le menu avec l'ID '" .. id .. "' n'existe pas")
    if id == CURRENT_MENU then
        TriggerNuiEvent("menu:show", {
            title = title,
            subtitle = menu.subtitle,
            description = menu.description,
            theme = menu.theme,
            banner = menu.banner,
        })
    end
    MENUS[id].title = title
end
