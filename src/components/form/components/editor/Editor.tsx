import { forwardRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { EditorContainer } from "./Editor.style";
import { buttonList } from "./Editor.config";

interface EditorProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Editor = forwardRef(({ value, onChange }: EditorProps, ref) => {
  return (
    <EditorContainer>
      <SunEditor
        defaultValue={value}
        setOptions={{
          katex: {},
          buttonList: buttonList,
        }}
        onChange={onChange}
      />
    </EditorContainer>
  );
});

export default Editor;
