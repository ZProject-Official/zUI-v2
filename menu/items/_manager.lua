ITEMS = {}
ACTIONS = {}
ITEM_IDS = {}
ACTIVE_THREADS = {}

-- Fonction de nettoyage mémoire
local function CleanupMenuData(menuId)
    if ITEM_IDS[menuId] then
        -- Nettoyer les actions liées à ce menu
        for _, itemId in pairs(ITEM_IDS[menuId]) do
            ACTIONS[itemId] = nil
        end
        -- Nettoyer les IDs du menu
        ITEM_IDS[menuId] = nil
    end
    
    -- Nettoyer le thread actif
    ACTIVE_THREADS[menuId] = nil
end

---@param id string
UpdateItems = function(id)
    -- Protection simple contre threads multiples
    if ACTIVE_THREADS[id] then 
        return 
    end
    
    ACTIVE_THREADS[id] = true
    
    Citizen.CreateThread(function()
        local waitTime = 500
        -- Premier wait pour laisser le temps au menu de s'initialiser
        Citizen.Wait(50)
        
        while true do
            if IsPauseMenuActive() or not MENUS[id].visible then
                CleanupMenuData(id)  -- Nettoyage complet
                return
            end

            ITEMS = {}
            if not ITEM_IDS[id] then
                ITEM_IDS[id] = {}
            end

            if MENUS[id].items ~= nil then
                local success, result = pcall(function()
                    MENUS[id].items()
                end)
                if success then
                    TriggerNuiEvent("menu:loadItems", ITEMS)
                end
            end

            Citizen.Wait(waitTime)
        end
    end)
end

-- Fonction publique pour nettoyage manuel
zUI.CleanupMenu = function(menuId)
    CleanupMenuData(menuId)
end

-- Fonction publique pour nettoyage manuel des menus

local function handleItemAction(actionTable, data)
    local action = actionTable[1]
    local nextMenu = actionTable[2]

    if data.type == "button" then
        action(true)
        if nextMenu and MENUS[nextMenu] then
            MENUS[CURRENT_MENU].visible = false
            TriggerNuiEvent("menu:setIndexHistory", {
                lastMenu = CURRENT_MENU,
                newMenu = nextMenu
            })
            zUI.SetVisible(nextMenu, true)
        end
    elseif data.type == "checkbox" then
        action(true)
    elseif data.type == "list" or data.type == "colorslist" then
        if data.listChange == nil then
            action(true, false, data.index)
        else
            action(false, true, data.index)
        end
    elseif data.type == "slider" then
        if data.percentageChange == nil then
            action(true, false, data.percentage)
        else
            action(false, true, data.percentage)
        end
    elseif data.type == "textarea" or data.type == "colorpicker" or data.type == "searchbar" then
        action(true, data.value)
    end
end

RegisterNuiCallback("menu:useItem", function(data, callback)
    local actionTable = ACTIONS[data.itemId]
    if actionTable then
        handleItemAction(actionTable, data)
    end
    callback("ok ;)")
end)

RegisterNuiCallback("menu:goBack", function(data, cb)
    zUI.Goback()
    cb("ok :)")
end)
