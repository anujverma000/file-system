import React from 'react';
import styled from 'styled-components';
import { FileType } from '../../rootFiles';

export interface StatusProps {
  files: Array<FileType>
}

const StatusBar = styled.div`
  border-radius: 0 0 12px 12px;
  background-color: #ddd;
  border: 1px solid #dedede;
  padding: 8px 24px;
  font-size: 12px;
`;

const Status = ({ files }: StatusProps) => {
  const folderCount = files.filter(file => file.isFolder).length;
  const fileCount = files.filter(file => !file.isFolder).length;
  return (
    <StatusBar>
      {folderCount} Folders, {fileCount} Files
    </StatusBar>
  )
}

export default Status
