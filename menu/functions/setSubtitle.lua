---@param id string
---@param subtitle string
zUI.SetSubtitle = function(id, subtitle)
    local menu = MENUS[id]
    assert(type(id) == "string", "zUI.SetSubtitle: L'ID du menu doit être une chaîne de caractères")
    assert(menu, "zUI.SetSubtitle: Le menu avec l'ID '" .. id .. "' n'existe pas")
    if id == CURRENT_MENU then
        TriggerNuiEvent("menu:show", {
            title = menu.title,
            subtitle = subtitle,
            description = menu.description,
            theme = menu.theme,
            banner = menu.banner,
        })
    end
    MENUS[id].subtitle = subtitle
end
