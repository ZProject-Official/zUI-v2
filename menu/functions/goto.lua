---@param target string
zUI.Goto = function(target)
    assert(type(target) == "string", "zUI.Goto: Le paramètre 'target' doit être une chaîne de caractères")
    assert(MENUS[CURRENT_MENU], "zUI.Goto: Aucun menu actif n'est défini (CURRENT_MENU est invalide)")
    assert(MENUS[target], "zUI.Goto: Le menu cible '" .. target .. "' n'existe pas")

    MENUS[CURRENT_MENU].visible = false
    zUI.SetVisible(target, true)
    TriggerNuiEvent("menu:setIndexHistory", {
        lastMenu = CURRENT_MENU,
        newMenu = target
    })
end
