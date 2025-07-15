---@param label string
---@param description string | nil
---@param styles { IsDisabled: boolean, RightLabel: any, RightBadge: string, LeftBadge: string }
---@param action fun(onSelected: boolean)
---@param submenu string | nil
zUI.Button = function(label, description, styles, action, submenu)
    assert(type(label) == "string", "Button label must be a string")
    assert(description == nil or type(description) == "string", "Button description must be a string or nil")
    assert(type(styles) == "table", "Button styles must be a table")
    assert(submenu == nil or type(submenu) == "string", "Button submenu must be a string or nil")

    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or
        ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())

    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId

    local item = {}
    item.type = "button"
    item.label = label or ""
    item.description = description or ""
    item.styles = styles or {}
    item.itemId = itemId
    ITEMS[itemIndex] = item
    ACTIONS[itemId] = { action, submenu }
    return itemId
end
