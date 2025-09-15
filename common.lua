zUI = {}

exports("getObject", function()
    return zUI
end)

Citizen.CreateThread(function()
    repeat
        Wait(100)
    until NetworkIsPlayerActive(PlayerId())
    local positions = json.decode(GetResourceKvpString("zUI:positions:MyPersonalPositions"))
    if not positions then
        positions = {
            ["menu"] = { x = 25, y = 25 },
            ["info"] = { x = 750, y = 25 }
        }
    end
    TriggerNuiEvent("app:setPositions", positions)
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

---@class ThemeAnimations
---@field entry string
---@field exit string
---@field onSwitch? boolean
---@field onScroll? boolean

---@class ThemeColors
---@field primary string
---@field background string
---@field description? string
---@field informations? string
---@field controlsIndicator? string
---@field itemSelected? string
---@field banner? string

---@class ThemeMenu
---@field width string
---@field displayBanner boolean
---@field displayInformations boolean
---@field displayControlsIndicator boolean
---@field cornersRadius number
---@field perspective boolean
---@field margin boolean
---@field shadow boolean
---@field hoverStyle string
---@field animations ThemeAnimations
---@field colors ThemeColors
---@field keyPressDelay number
---@field sound boolean
---@field font string
---@field maxVisibleItems number

---@class ThemeInfo
---@field width string
---@field cornerRadius number
---@field perspective boolean
---@field shadow boolean
---@field animations ThemeAnimations
---@field colors ThemeColors
---@field font string

---@class ThemeEditMod
---@field menu boolean
---@field info boolean

---@class Theme
---@field menu ThemeMenu
---@field info ThemeInfo
---@field editMod ThemeEditMod
