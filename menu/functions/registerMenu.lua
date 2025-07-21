function RegisterMenu(menu)
    local id = menu.id
    if menu.key and menu.mapping then
        RegisterCommand(id, function()
            zUI.SetVisible(id, not zUI.IsVisible(id))
        end, false)
        RegisterKeyMapping(id, menu.mapping, "keyboard", menu.key)
    end
end
