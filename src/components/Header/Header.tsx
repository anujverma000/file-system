import React from 'react';
import styled from 'styled-components'
import { FileType } from '../../rootFiles';
import backIcon from '../../icons/caret-left.svg';
import folderIcon from '../../icons/folder.svg';

export interface HeaderProps {
  currentFolder: FileType
  goBack: (file: FileType) => void
  addNewFolder: () => void
  addNewFile: () => void
}

const Back = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Container = styled.header`
  display: flex;
  background: #fef5f7;
  padding: 14px;
  border-radius: 12px 12px 0 0;
  border: 1px solid #dedede;
  justify-content: space-between;
`;

const CurrentFolderName = styled.span`
  font-size: 14px;
  color: #000;
  padding: 0 12px;
`;

const Actions = styled.div`
  display: flex;
`;

const Action = styled.button`
  margin: 0 12px;
  padding: 8px 12px;
  background-color: #3498da;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover{
    color: #bddbf2;
  }
`;

const Header = ({ currentFolder, goBack, addNewFolder, addNewFile} : HeaderProps) => {
  const canGoBack = currentFolder.parent !== null
  const goBackHandler = () => {
    if(canGoBack) {
      goBack(currentFolder.parent!)
    }
  }
  return (
    <Container>
      <Back onClick={goBackHandler}>
        {canGoBack && <img src={backIcon} alt="back" /> } 
        <img src={folderIcon} alt="current_folder" width={24}/> 
        <CurrentFolderName>{currentFolder.name} </CurrentFolderName>
      </Back>
      <Actions>
        <Action onClick={addNewFolder}>Add New Folder</Action>
        <Action onClick={addNewFile}>Add New File</Action>
      </Actions>
    </Container>
  )
}

export default Header
