---@param menu string
---@param action fun()
zUI.SetCloseHandler = function (menu, action)
    assert(type(menu) == "string", "zUI.SetCloseHandler: Le paramètre 'menu' doit être une chaîne de caractères")
    assert(MENUS[menu], "zUI.SetCloseHandler: Le menu '" .. menu .. "' n'existe pas")

    MENUS[menu].closing = action
end