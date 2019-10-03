const specials = {
  root: {
    item_id: null,
    label: 'Maha Drive',
    code: 'root',
    icon: 'home'
  },
  drive: {
    item_id: null,
    label: 'My Drive',
    code: 'drive',
    icon: 'hdd-o',
    description: `
      This folder contains a organized hierarchy of your files and folders
      and items that have been shared with you.
    `
  },
  shared: {
    item_id: null,
    code: 'shared',
    label: 'Shared With Me',
    icon: 'handshake-o',
    description: `
      This folder is a collection of files that have been shared with you.
    `
  },
  starred: {
    item_id: null,
    code: 'starred',
    label: 'Starred Items',
    icon: 'star',
    description: `
      This folder is a collection of starred items. Click the star icon
      next to any folder or file in Maha Drive to add it to this list.
    `
  },
  trash:  {
    item_id: null,
    code: 'trash',
    label: 'Trash',
    icon: 'trash',
    description: `
      You can move folders and files you dont need anymore to the trash.
      Click Empty Trash to premanently delete all items.
    `
  }
}

export default specials
