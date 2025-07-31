
local MappingForResource = {}

function RegisterMenu(menu)
    local id = menu.id
    if menu.key and menu.mapping and menu.Invoke then
        RegisterMenuSetId(menu.Invoke, menu)
    end
end


function RegisterMenuSetId(ResourceName, menu)
    if not menu or not ResourceName then
        return
    end

    if not MappingForResource[ResourceName] then
        MappingForResource[ResourceName] = {}
    end

    if not MappingForResource[ResourceName][menu.key] then
        local IdResourceKey = ("zUI:MenuIdentifier:%s/%s"):format(ResourceName, menu.key)
        MappingForResource[ResourceName][menu.key] = menu.id
        RegisterCommand(IdResourceKey, function()
            RegisterMenuGetId(ResourceName, menu.key)
        end, false)
        RegisterKeyMapping(IdResourceKey, menu.mapping, "keyboard", menu.key)
    else
        MappingForResource[ResourceName][menu.key] = menu.id
    end

end

function RegisterMenuGetId(ResourceName, key)
    if not MappingForResource[ResourceName] then
        return nil
    end

    if not MappingForResource[ResourceName][key] then
        return nil
    end
    if type(zUI) == "table" and zUI.SetVisible and zUI.IsVisible then
        zUI.SetVisible(MappingForResource[ResourceName][key], not zUI.IsVisible(MappingForResource[ResourceName][key]))
    end
end


