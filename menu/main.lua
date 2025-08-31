MENUS = {}
CURRENT_MENU = nil
MENU_COUNTER = 0

---@param title string | nil
---@param subtitle string | nil .
---@param description string | nil
---@param theme string
---@param banner string | nil
---@param key string | nil
---@param mapping string | nil
zUI.CreateMenu = function(title, subtitle, description, theme, banner, key, mapping)
    assert(title == nil or type(title) == "string", "Menu title must be a string or nil")
    assert(subtitle == nil or type(subtitle) == "string", "Menu subtitle must be a string or nil")
    assert(description == nil or type(description) == "string", "Menu description must be a string or nil")
    assert(type(theme) == "string", "Menu theme must be a string")
    assert(banner == nil or type(banner) == "string", "Menu banner must be a string or nil")
    assert(key == nil or type(key) == "string", "Menu key must be a string or nil")
    assert(mapping == nil or type(mapping) == "string", "Menu mapping must be a string or nil")

    local self = {}
    self.id = ("zUI:MenuIdentifier:%s/%s"):format(MENU_COUNTER, math.random())
    MENU_COUNTER += 1
    self.title = title or ""
    self.subtitle = subtitle or ""
    self.description = description or ""
    self.theme = zUI.GetTheme(theme)
    self.banner = banner or ""
    self.key = key
    self.mapping = mapping
    self.items = nil
    self.visible = false
    self.closable = true
    self.opening = nil
    self.closing = nil
    MENUS[self.id] = self
    RegisterMenu(self)
    return self.id
end

---@param parent string
---@param title string | nil
---@param subtitle string | nil .
---@param description string | nil
zUI.CreateSubMenu = function(parent, title, subtitle, description)
    assert(MENUS[parent] ~= nil, "Submenu parent doesn't exists")
    assert(title == nil or type(title) == "string", "Menu title must be a string or nil")
    assert(subtitle == nil or type(subtitle) == "string", "Menu subtitle must be a string or nil")
    assert(description == nil or type(description) == "string", "Menu description must be a string or nil")
    local self = {}
    self.id = ("zUI:SubMenuIdentifier:%s/%s"):format(MENU_COUNTER, math.random())
    MENU_COUNTER += 1
    self.parent = parent
    self.title = title or ""
    self.subtitle = subtitle or ""
    self.description = description or ""
    self.items = nil
    self.theme = MENUS[parent].theme
    self.banner = MENUS[parent].banner
    self.visible = false
    self.closable = true
    self.opening = nil
    self.closing = nil
    MENUS[self.id] = self
    return self.id
end

---@param id string
---@param items fun()
zUI.SetItems = function(id, items)
    assert(type(id) == "string", "Menu ID must be a string")

    local menu = MENUS[id]
    if menu then
        MENUS[id].items = items
    else
        error("Menu with ID '" .. id .. "' does not exist")
    end
end

---@param id string
---@param state boolean
zUI.SetVisible = function(id, state)
    assert(type(id) == "string", "Menu ID must be a string")
    assert(type(state) == "boolean", "Menu visibility state must be a boolean")

    local menu = MENUS[id]
    if menu then
        if state then
            zUI.CloseAll()
            MENUS[id].visible = state
            if MENUS[id].opening then
                MENUS[id].opening()
            end
            CURRENT_MENU = id
            zUI.ManageFocus(true)
            TriggerNuiEvent("menu:show", {
                title = menu.title,
                subtitle = menu.subtitle,
                description = menu.description,
                theme = menu.theme,
                banner = menu.banner,
            })
            UpdateItems(id)
            if menu.opening then
                menu.opening()
            end
        else
            MENUS[id].visible = state
            if MENUS[id].closing then
                MENUS[id].closing()
            end
            zUI.ManageFocus(false)
            CURRENT_MENU = nil
            TriggerNuiEvent("menu:close", {})
        end
    else
        error("Menu with ID '" .. id .. "' does not exist")
    end
end

RegisterNuiCallback("menu:closed", function(data, cb)
    if CURRENT_MENU ~= nil then
        local menu = MENUS[CURRENT_MENU]
        if menu then
            menu.visible = false
        end
        CURRENT_MENU = nil
    end
    cb("ok ;)")
end)

RegisterNuiCallback("zUI:getTheme", function(data, cb)
    cb(zUI.GetTheme("default"))
end)
