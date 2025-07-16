---@param id string
function RegisterMenu(id)
    local menu = MENUS[id]
    if menu.key and menu.mapping then
        RegisterCommand(menu.identifier, function()
            zUI.SetVisible(id, not zUI.IsVisible(id))
        end, false)
        RegisterKeyMapping(menu.identifier, menu.mapping, "keyboard", menu.key)
    end
end
