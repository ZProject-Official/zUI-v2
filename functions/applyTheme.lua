---@param theme Theme
zUI.ApplyTheme = function(theme)
    assert(type(theme) == "table", "zUI.ApplyTheme: Le thème '" .. theme .. "' n'est pas dans un format valide")

    TriggerNuiEvent("app:applyTheme", {
        theme = theme
    })
end
