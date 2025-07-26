zUI = {}

exports("getObject", function()
    return zUI
end)

Citizen.CreateThread(function()
    repeat
        Wait(100)
    until NetworkIsPlayerActive(PlayerId())
    
    local positionsString = GetResourceKvpString("zUI:positions:MyPersonalPositions")
    if positionsString and positionsString ~= "" then
        local success, positions = pcall(json.decode, positionsString)
        if success and positions and type(positions) == "table" then
            TriggerNuiEvent("app:setPositions", positions)
        else
            print("^3[zUI] Erreur: Positions KVP corrompues, ignorées^7")
        end
    end
end)

RegisterNuiCallback("app:savePositions", function(data, cb)
    if data and data.positions and type(data.positions) == "table" then
        local success, positions = pcall(json.encode, data.positions)
        if success and positions then
            SetResourceKvp("zUI:positions:MyPersonalPositions", positions)
        else
            print("^1[zUI] Erreur: Impossible d'encoder les positions^7")
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
