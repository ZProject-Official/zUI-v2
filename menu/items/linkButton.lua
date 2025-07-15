---@param label string
---@param description string | nil
---@param link string
---@param styles { IsDisabled: boolean, LeftBadge: string }
zUI.LinkButton = function(label, description, link, styles)
    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or
        ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())

    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId

    local item = {}
    item.type = "linkbutton"
    item.label = label or ""
    item.description = description or ""
    item.link = link or ""
    item.styles = styles or {}
    item.itemId = itemId
    ITEMS[itemIndex] = item
    return itemId
end
