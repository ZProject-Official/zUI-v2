zUI = {}

exports("getObject", function()
    return zUI
end)

Citizen.CreateThread(function()
    repeat
        Wait(100)
    until NetworkIsPlayerActive(PlayerId())
    local positions = json.decode(GetResourceKvpString("zUI:positions:MyPersonalPositions"))
    if positions then
        TriggerNuiEvent("app:setPositions", positions)
    end
end)

RegisterNuiCallback("app:savePositions", function(data, cb)
    if data and data.positions and type(data.positions) == "table" then
        -- Thanks to @Kamionn pr
        local success, positions = pcall(json.encode, data.positions)
        if success and positions then
            SetResourceKvp("zUI:positions:MyPersonalPositions", positions)
        end
    end
    cb("ok :)")
end)

RegisterNuiCallback("app:manageEditMod", function(body, cb)
    if body.state then
        SetNuiFocus(true, true)
        SetNuiFocusKeepInput(false)
    else
        SetNuiFocus(true, false)
        SetNuiFocusKeepInput(true)
    end
    cb("ok :)")
end)
