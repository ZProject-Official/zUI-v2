zUI.CloseAll = function()
    for _, menu in pairs(MENUS) do
        if menu.visible then
            zUI.SetVisible(menu.id, false)
        end
    end
end
