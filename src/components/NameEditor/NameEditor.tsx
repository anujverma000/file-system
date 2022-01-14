import React, { useState } from 'react';
import styled from 'styled-components';
import { RenameWarning } from '..';
import { FileType } from '../../rootFiles';

const ENTER_KEY_NAME = 'Enter';
const ESC_KEY_NAME = 'Escape';

const Input = styled.input`
  width: 92px;
`;

const Name = styled.div`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  height: 21px;
`;

type NameEditorProps = {
  file: FileType,
  updateName: (file: FileType, newName: string, editConfirm: boolean) => boolean
  setEditMode: (file: FileType) => void
}

const NameEditor = ({ file, updateName, setEditMode }: NameEditorProps) => {
  const [name, setName] = useState(file.name);
  const [warningVisible, setWarningVisible] = useState(false);

  const updateFileName = (file: FileType, newName: string, editConfirm: boolean) => {
    const updateSuccess = updateName(file, newName, editConfirm);
    if(!updateSuccess) {
      setWarningVisible(true);
    }
}

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === ENTER_KEY_NAME) {
      updateFileName(file, name, true);
      
    }
    if(event.key === ESC_KEY_NAME) {
      updateFileName(file, file.name, false);
    }
  };

  return (
    <>
    {file.isEditingName ?
      <Input  autoFocus 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => updateFileName(file, name, true)}
              onFocus={(e) => e.target.select()}
              onKeyUp={handleKeyPress}/>
      : <Name onClick={() => setEditMode(file)}>{file.name}</Name>
    }
    { warningVisible && <RenameWarning file={file} newName={ name } onClose={() => setWarningVisible(false)} />}
    </>
  )
}

export default NameEditor
