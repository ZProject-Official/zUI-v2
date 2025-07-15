---@param label string
---@param description string
---@param percentage number
---@param step number @The step value to adjust the percentage.
---@param styles { IsDisabled: boolean, LeftBadge: string, ShowPercentage: boolean }
---@param action fun(onSelected: boolean, onChange: boolean, percentage: number)
zUI.Slider = function(label, description, percentage, step, styles, action)
    assert(type(label) == "string", "Slider label must be a string")
    assert(type(description) == "string", "Slider description must be a string")
    assert(type(percentage) == "number", "Slider percentage must be a number")
    assert(type(step) == "number", "Slider step must be a number")
    assert(type(styles) == "table", "Slider styles must be a table")

    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or
        ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())

    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId

    local item = {}
    item.type = "slider"
    item.label = label or ""
    item.description = description or ""
    item.percentage = percentage or 0
    item.step = step or 10
    item.styles = styles or {}
    item.itemId = itemId
    ITEMS[itemIndex] = item
    ACTIONS[itemId] = { action }
    return itemId
end
