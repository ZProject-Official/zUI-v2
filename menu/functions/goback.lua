zUI.Goback = function()
    assert(CURRENT_MENU, "zUI.GoBack: Aucun menu actif n'est défini (CURRENT_MENU est invalide)")
    assert(MENUS[CURRENT_MENU], "zUI.GoBack: Le menu actuel n'existe pas dans MENUS")

    local current_menu = MENUS[CURRENT_MENU]
    if current_menu.parent then
        -- Utiliser SetVisible pour la cohérence et éviter les race conditions
        local parentMenu = current_menu.parent
        zUI.SetVisible(current_menu.id, false)
        
        -- Petit délai pour éviter les conflits de threads
        Citizen.Wait(50)
        
        TriggerNuiEvent("menu:setIndexHistory", {
            lastMenu = current_menu.id,
            newMenu = parentMenu
        })
        zUI.SetVisible(parentMenu, true)
    else
        if current_menu.closable then
            zUI.SetVisible(current_menu.id, false)
        end
    end
end
