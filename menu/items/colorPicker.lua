---@param label string
---@param description string | nil
---@param value string
---@param styles { IsDisabled: boolean, LeftBadge: string }
---@param action fun(onChange: boolean, value: string)
zUI.ColorPicker = function(label, description, value, styles, action)
    assert(type(label) == "string", "ColorPicker label must be a string")
    assert(type(description) == "string", "ColorPicker description must be a string")
    assert(type(value) == "string", "ColorPicker value must be a string")
    assert(type(styles) == "table", "ColorPicker styles must be a table")

    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or
        ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())

    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId

    local item = {}
    item.type = "colorpicker"
    item.label = label or ""
    item.description = description or ""
    item.value = value or ""
    item.styles = styles or ""
    item.itemId = itemId
    ITEMS[itemIndex] = item
    ACTIONS[itemId] = { action }
    return itemId
end

RegisterNuiCallback("menu:colorPicker:manageFocus", function(data, cb)
    if data.state then
        SetNuiFocus(true, true)
        SetNuiFocusKeepInput(false)
    else
        SetNuiFocus(true, false)
        SetNuiFocusKeepInput(true)
    end
    cb("ok :)")
end)
