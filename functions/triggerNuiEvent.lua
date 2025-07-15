---@param name string
---@param data table
TriggerNuiEvent = function(name, data)
    SendNUIMessage({
        action = name,
        data = data
    })
end
