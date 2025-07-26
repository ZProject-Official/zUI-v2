zUI.CloseAll = function()
    for _, menu in pairs(MENUS) do
        if menu.visible then
            zUI.SetVisible(menu.id, false)
        end
    end
    
    -- Nettoyage complet des données mémoire
    if zUI.CleanupMenu then
        for menuId, _ in pairs(MENUS) do
            zUI.CleanupMenu(menuId)
        end
    end
end
