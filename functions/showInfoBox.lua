---@param title string
---@param subtitle string
---@param theme string
---@param infos table
zUI.ShowInfoBox = function(title, subtitle, theme, infos)
    TriggerNuiEvent("info:show", {
        title = title,
        subtitle = subtitle,
        theme = zUI.GetTheme(theme),
        infos = infos
    })
end
