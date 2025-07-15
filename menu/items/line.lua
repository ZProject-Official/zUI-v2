---@param colors table | nil
zUI.Line = function(colors)
    assert(colors == nil or type(colors) == "table", "Line colors must be a table or nil")

    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())
    
    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId
    
    local item = {}
    item.type = "line"
    item.colors = colors
    item.itemId = itemId
    ITEMS[itemIndex] = item
    return itemId
end
