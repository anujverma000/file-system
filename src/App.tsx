import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { FileBrowser, Header, RenameWarning, Status } from './components';
import { FILES, FileType, RootFolder } from './rootFiles';


const NEW_FOLDER_PREFIX = 'New Folder';
const NEW_FILE_PREFIX = 'New File';

const Main = styled.main`
  padding: 42px;
  width: 50%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const App = () => {
  const [allFiles, setAllFiles] = useState<Array<FileType>>(FILES);
  const [files, setFiles] = useState<Array<FileType>>([]);
  const [currentFolder, setCurrentFolder] = useState(RootFolder);
  const [warningVisible, setWarningVisible] = useState(false);
  const [newRename, setNewRename] = useState<string>('');
  const [currentRenameFile, setCurrentRenameFile] = useState<FileType>();

  useEffect(() => {
    setFiles(allFiles.filter(file => file.parent === currentFolder))
  }, [currentFolder, allFiles]);

  /**
   * Adds a new Folder to the current folder
   * Name is set to "New Folder <count of existing files +1>" and isEditingName is set to true
   */

  const addNewFolder = () => {
    const counter = files.filter(file => file.isFolder).length
    const newFolder: FileType = {
      name: `${NEW_FOLDER_PREFIX} ${counter + 1}`,
      parent: currentFolder,
      isFolder: true,
      isEditingName: true,
    }
    setAllFiles([...allFiles, newFolder]);
  }

  /**
   * Adds a new File to the current folder
   * Name is set to "New File <count of existing files +1>" and isEditingName is set to true
   */
  const addNewFile = () => {
    const counter = files.filter(file => !file.isFolder).length
    const newFile: FileType = {
      name: `${NEW_FILE_PREFIX} ${counter + 1}`,
      parent: currentFolder,
      isFolder: false,
      isEditingName: true,
    }
    setAllFiles([...allFiles, newFile]);
  }

  /**
   * Deletes the file and if file is folder deletes all files in it
   * @param file 
   */
  const deleteFile = (file: FileType) => {
    if (file.isFolder) {
      setAllFiles(allFiles.filter(f => f.parent !== file));
    }
    setAllFiles(allFiles.filter(f => f !== file))

  }

  /**
   * Updates the name of the file/folder
   * If name already exists, don't update the name
   * @param file 
   * @param newName 
   */
  const updateFileName = (file: FileType, newName: string, editConfirm: boolean): boolean => {
    const nameAlreadyExist = allFiles.filter(f => f.name === newName && f.parent === file.parent).length > 0;
    if(nameAlreadyExist){
      const newFiles = allFiles.map(f => {
        if (f === file) {
          return { ...f, isEditingName: false }
        }
        return f;
      })
      setAllFiles(newFiles);

      if(editConfirm && newName !== file.name){
        setCurrentRenameFile(file);
        setNewRename(newName);
        setWarningVisible(true);
      }
    }
    else {
      const newFiles = allFiles.map(f => {
        if (f === file) {
          return { ...f, name: newName, isEditingName: false }
        }
        return f;
      })
      setAllFiles(newFiles);
    }
    return true
  }

  /**
   * Sets the current file/folder name to be edited
   * @param file 
   */
  const setFileNameEditMode = (file: FileType) => {
    const newFiles = allFiles.map(f => {
      if (f === file) {
        return { ...f, isEditingName: true }
      }
      return f;
    })
    setAllFiles(newFiles);
  }

  return (
    <>
      <Main>
        <Header currentFolder={currentFolder} 
                goBack={setCurrentFolder} 
                addNewFolder={addNewFolder} 
                addNewFile={addNewFile} />

        <FileBrowser  files={files} 
                      openFolder={setCurrentFolder} 
                      deleteFile={deleteFile} 
                      updateFileName={updateFileName} 
                      setFileNameEditMode={setFileNameEditMode} />

        <Status files={files} />
      </Main>
      { warningVisible && currentRenameFile && <RenameWarning file={currentRenameFile} newName={ newRename } onClose={() => setWarningVisible(false)} />}
    </>
  );
}

export default App;
