---@param state boolean
zUI.ManageFocus = function(state)
    if state then
        SetNuiFocus(true, false)
        SetNuiFocusKeepInput(true)
    else
        SetNuiFocus(false, false)
        SetNuiFocusKeepInput(false)
    end
end
