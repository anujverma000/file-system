import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { FileBrowser, Header, Status } from './components';
import { FILES, FileType, RootFolder } from './rootFiles';


const Main = styled.main`
  padding: 42px;
  width: 50%;
  margin: 0 auto;
`;

const App = () => {
  const [allFiles, setAllFiles] = useState<Array<FileType>>(FILES);
  const [files, setFiles] = useState<Array<FileType>>([]);
  const [currentFolder, setCurrentFolder] = useState(RootFolder);

  useEffect(() => {
    setFiles(allFiles.filter(file => file.parent === currentFolder))
  }, [currentFolder, allFiles]);

  /**
   * Adds a new Folder to the current folder
   * Name is set to "New Folder <count of existing files +1>" and isEditingName is set to true
   */

  const addNewFolder = () => {
    const counter = files.filter(file => file.isFolder).length + 1
    const newFolder: FileType = {
      name: `New Folder ${counter}`,
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
    const counter = files.filter(file => !file.isFolder).length + 1
    const newFile: FileType = {
      name: `New File ${counter}`,
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
   * @param file 
   * @param newName 
   */
  const updateFileName = (file: FileType, newName: string) => {
    const newFiles = allFiles.map(f => {
      if (f === file) {
        return { ...f, name: newName, isEditingName: false }
      }
      return f;
    })
    setAllFiles(newFiles);
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
  );
}

export default App;
