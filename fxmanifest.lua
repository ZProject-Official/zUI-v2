fx_version 'cerulean'
game 'gta5'
lua54 'oui'

author 'zSquad'
description 'soon...'
repository 'soon...'
website 'https://zsquad.fr'
version '2.0.0'

files {
    'themes/*.json',
    'web/build/**/*',
}

ui_page 'web/build/index.html'

client_scripts {
    'functions/triggerNuiEvent.lua',
    'common.lua',
    'functions/getTheme.lua',
    'functions/applyTheme.lua',
    'functions/showInfoBox.lua',
    'menu/items/*.lua',
    'menu/functions/*.lua',
    'menu/main.lua'
}
