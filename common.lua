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
    local positions = json.encode(data.positions)
    SetResourceKvp("zUI:positions:MyPersonalPositions", positions)
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
