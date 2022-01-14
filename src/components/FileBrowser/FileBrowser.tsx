import React from 'react';
import styled from 'styled-components';
import { File, Folder } from '..';
import { FileType } from '../../rootFiles';

export interface FileBrowserProps {
  files: Array<FileType>
  openFolder: (file: FileType) => void
  deleteFile: (file: FileType) => void
  updateFileName: (file: FileType, newName: string, editConfirm: boolean) => boolean
  setFileNameEditMode: (file: FileType) => void
}

const Container = styled.div`
  display: flex;
  padding: 24px;
  flex-wrap: wrap;
  background: #fff;
  border: 1px solid #dedede;
  border-top: none;
  box-shadow: 0px 24px 16px 4px #bdbdbd;
  transition: all .2s;
  @media (max-width: 768px) {
    padding: 0;
    box-shadow: none;
    border: none;
  }
`;

const NoFilesWrapper = styled.div`
  padding: 24px;
  text-align: center;
  font-size: 12px;
  color: #626263;
`;

const FileBrowser = ({ files, openFolder, deleteFile, updateFileName, setFileNameEditMode }: FileBrowserProps) => {
  if (files.length === 0) {
    return <Container><NoFilesWrapper>No files</NoFilesWrapper></Container>
  }
  return (
    <Container>
      {files.map(file => {
        if (file.isFolder) {
          return <Folder  key={`folder_${file.name}`} 
                          file={file} 
                          openFolder={openFolder}
                          deleteFile={deleteFile}
                          updateFileName={updateFileName}
                          setFileNameEditMode={setFileNameEditMode} />
        } else {
          return <File  key={`file_${file.name}`} 
                        file={file}
                        deleteFile={deleteFile}
                        updateFileName={updateFileName}
                        setFileNameEditMode={setFileNameEditMode} />
        }
      })}
    </Container>
  )
}

export default FileBrowser