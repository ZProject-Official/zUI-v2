zUI.Goback = function()
    assert(CURRENT_MENU, "zUI.GoBack: Aucun menu actif n'est défini (CURRENT_MENU est invalide)")
    assert(MENUS[CURRENT_MENU], "zUI.GoBack: Le menu actuel n'existe pas dans MENUS")

    local current_menu = MENUS[CURRENT_MENU]
    if current_menu.parent then
        MENUS[current_menu.id].visible = false
        MENUS[current_menu.parent].visible = true
        TriggerNuiEvent("menu:show", {
            title = MENUS[current_menu.parent].title,
            subtitle = MENUS[current_menu.parent].subtitle,
            description = MENUS[current_menu.parent].description,
            theme = MENUS[current_menu.parent].theme,
            banner = MENUS[current_menu.parent].banner,
        })
        TriggerNuiEvent("menu:setIndexHistory", {
            lastMenu = current_menu.id,
            newMenu = current_menu.parent
        })
        CURRENT_MENU = current_menu.parent
        UpdateItems(current_menu.parent)
    else
        if current_menu.closable then
            zUI.SetVisible(current_menu.id, false)
        end
    end
end