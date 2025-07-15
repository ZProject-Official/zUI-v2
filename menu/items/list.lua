---@param label string
---@param description string
---@param items table
---@param index number
---@param styles { IsDisabled: boolean, LeftBadge: string }
---@param action fun(onSelected: boolean, onChange: boolean, index: number)
zUI.List = function(label, description, items, index, styles, action)
    assert(type(label) == "string", "List label must be a string")
    assert(type(description) == "string", "List description must be a string")
    assert(type(items) == "table", "List items must be a table")
    assert(type(index) == "number", "List index must be a number")
    assert(type(styles) == "table", "List styles must be a table")

    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or
        ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())

    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId

    local item = {}
    item.type = "list"
    item.label = label or ""
    item.description = description or ""
    item.items = items or {}
    item.index = index or 1
    item.styles = styles or {}
    item.itemId = itemId
    ITEMS[itemIndex] = item
    ACTIONS[itemId] = { action }
    return itemId
end
