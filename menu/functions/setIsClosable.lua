---@param id string
---@param state boolean
zUI.SetIsClosable = function(id, state)
    assert(type(id) == "string", "zUI.SetIsClosable: L'ID du menu doit être une chaîne de caractères")
    assert(type(state) == "boolean", "zUI.SetIsClosable: L'état doit être un booléen")
    assert(MENUS[id], "zUI.SetIsClosable: Le menu avec l'ID '" .. id .. "' n'existe pas")

    MENUS[id].closable = state
end
