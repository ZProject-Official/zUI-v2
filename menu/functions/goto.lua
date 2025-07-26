---@param target string
zUI.Goto = function(target)
    assert(type(target) == "string", "zUI.Goto: Le paramètre 'target' doit être une chaîne de caractères")
    assert(MENUS[CURRENT_MENU], "zUI.Goto: Aucun menu actif n'est défini (CURRENT_MENU est invalide)")
    assert(MENUS[target], "zUI.Goto: Le menu cible '" .. target .. "' n'existe pas")

    -- Utiliser SetVisible pour cohérence et cleanup proper
    local currentMenu = CURRENT_MENU
    zUI.SetVisible(currentMenu, false)
    
    -- Petit délai pour éviter les conflits de threads
    Citizen.Wait(50)
    
    TriggerNuiEvent("menu:setIndexHistory", {
        lastMenu = currentMenu,
        newMenu = target
    })
    zUI.SetVisible(target, true)
end
