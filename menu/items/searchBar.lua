---@param description string
---@param value string
---@param placeholder string
---@param action fun(onSelected: boolean, value: string)
zUI.SearchBar = function(description, value, placeholder, action)
    assert(type(description) == "string", "SearchBar description must be a string")
    assert(type(value) == "string", "SearchBar value must be a string")
    assert(type(placeholder) == "string", "SearchBar placeholder must be a string")

    local itemIndex = #ITEMS + 1
    local itemId = ITEM_IDS[CURRENT_MENU] and ITEM_IDS[CURRENT_MENU][itemIndex] or
    ("zUI:ActionIdentifier:%s/%s"):format(itemIndex, GetGameTimer())

    if not ITEM_IDS[CURRENT_MENU] then
        ITEM_IDS[CURRENT_MENU] = {}
    end
    ITEM_IDS[CURRENT_MENU][itemIndex] = itemId

    local item = {}
    item.type = "searchbar"
    item.description = description or ""
    item.value = value or ""
    item.placeholder = placeholder or ""
    item.itemId = itemId
    ITEMS[itemIndex] = item
    ACTIONS[itemId] = { action }
    return itemId
end

RegisterNuiCallback("menu:searchBar:manageFocus", function(data, cb)
    if data.state then
        SetNuiFocus(true, true)
        SetNuiFocusKeepInput(false)
    else
        SetNuiFocus(true, false)
        SetNuiFocusKeepInput(true)
    end
    cb("ok :)")
end)
