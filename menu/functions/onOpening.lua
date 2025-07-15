---@param menu string
---@param action fun()
zUI.SetOpenHandler = function (menu, action)
    assert(type(menu) == "string", "zUI.SetOpenHandler: Le paramètre 'menu' doit être une chaîne de caractères")
    assert(MENUS[menu], "zUI.SetOpenHandler: Le menu '" .. menu .. "' n'existe pas")

    MENUS[menu].opening = action
end