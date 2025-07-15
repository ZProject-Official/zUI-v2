ITEMS = {}
ACTIONS = {}
ITEM_IDS = {}

---@param id string
UpdateItems = function(id)
    Citizen.CreateThread(function()
        local waitTime = 500
        while true do
            if IsPauseMenuActive() or not MENUS[id].visible then
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
