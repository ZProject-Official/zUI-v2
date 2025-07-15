---@param label string
---@param description string | nil
---@param state boolean
---@param styles { IsDisabled: boolean, RightLabel: any, RightBadge: string, LeftBadge: string }
---@param action fun(onSelected: boolean)
zUI.Checkbox = function(label, description, state, styles, action)
    assert(type(label) == "string", "Checkbox label must be a string")
    assert(description == nil or type(description) == "string", "Checkbox description must be a string or nil")
    assert(type(state) == "boolean", "Checkbox state must be a boolean")
    assert(type(styles) == "table", "Checkbox styles must be a table")

    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or
        ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())

    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId

    local item = {}
    item.type = "checkbox"
    item.label = label or ""
    item.description = description or ""
    item.state = state or false
    item.styles = styles or {}
    item.itemId = itemId
    ITEMS[itemIndex] = item
    ACTIONS[itemId] = { action }
    return itemId
end
