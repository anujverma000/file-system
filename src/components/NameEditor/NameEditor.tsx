import React, { useState } from 'react';
import styled from 'styled-components';
import { FileType } from '../../rootFiles';

const ENTER_KEY_NAME = 'Enter';
const ESC_KEY_NAME = 'Escape';

const Input = styled.input`
  width: 92px;
`;

type NameEditorProps = {
  file: FileType,
  updateName: (file: FileType, newName: string) => void
}

const NameEditor = ({ file, updateName }: NameEditorProps) => {
  const [name, setName] = useState(file.name);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === ENTER_KEY_NAME) {
      updateName(file, name)
    }
    if(event.key === ESC_KEY_NAME) {
      updateName(file, file.name)
    }
  };

  return (
      <Input  autoFocus 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => updateName(file, name)}
              onFocus={(e) => e.target.select()}
              onKeyUp={handleKeyPress}/>
  )
}

export default NameEditor
