local hoveredItem
RegisterNuiCallback("menu:sendHoveredItem", function(data, cb)
    hoveredItem = data.id
    cb('ok')
end)

zUI.GetHoveredItem = function()
    TriggerNuiEvent("menu:getHoveredItem", {})
    return hoveredItem
end
