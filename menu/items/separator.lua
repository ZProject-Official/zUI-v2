---@param label string
---@param position "left" | "center" | "right" | nil
zUI.Separator = function(label, position)
    assert(type(label) == "string", "Separator label must be a string")
    assert(
        position == nil or
        (type(position) == "string" and (position == "left" or position == "center" or position == "right")),
        "Separator position must be 'left', 'center', 'right' or nil")

    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or
        ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())

    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId

    local item = {}
    item.type = 'separator'
    item.label = label or ""
    item.position = position or "center"
    item.itemId = itemId
    ITEMS[itemIndex] = item
    return itemId
end
