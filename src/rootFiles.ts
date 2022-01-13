export type FileType = {
  name: string
  parent: FileType | null
  isFolder: boolean
  isEditingName: boolean
}

export const RootFolder: FileType = {
  name: '/',
  parent: null,
  isFolder: true,
  isEditingName: false
}

const folder1: FileType = {
  name: 'My Folder',
  parent: RootFolder,
  isFolder: true,
  isEditingName: false
}
const file1: FileType = {
  name: 'My File.txt',
  parent: RootFolder,
  isFolder: false,
  isEditingName: false
}

export const FILES: Array<FileType> = [
  RootFolder,
  folder1,
  file1,
]