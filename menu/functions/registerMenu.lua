function RegisterMenu(menu)
    local id = menu.id
    if menu.key and menu.mapping then
        RegisterCommand(id, function()
            if MENUS[id] then
                zUI.SetVisible(id, not zUI.IsVisible(id))
            end
        end, false)
        RegisterKeyMapping(id, menu.mapping, "keyboard", menu.key)
    end
end
