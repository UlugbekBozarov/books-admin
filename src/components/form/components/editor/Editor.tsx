import { forwardRef, useRef } from "react";
import { UploadBeforeHandler } from "suneditor-react/dist/types/upload";
import SunEditor from "suneditor-react";
import axios from "axios";
import { get } from "lodash";

import "suneditor/dist/css/suneditor.min.css";

import { EditorContainer } from "./Editor.style";
import { buttonList } from "./Editor.config";

interface EditorProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Editor = forwardRef(({ value, onChange }: EditorProps, ref) => {
  const editor = useRef();

  const getSunEditorInstance = (sunEditor: any) => {
    editor.current = sunEditor;
  };

  const onImageUploadBefore = (
    files: File[],
    info: object,
    uploadHandler: UploadBeforeHandler
  ) => {
    const formData = new FormData();
    formData.append("file", files[0]);

    axios
      .post(`${process.env.REACT_APP_IMAGE_BASE_URL}images`, formData)
      .then((response) => {
        uploadHandler({
          result: [
            {
              name: "thumbnail",
              url: `${process.env.REACT_APP_IMAGE_BASE_URL}images/${get(
                response,
                "data"
              )}`,
              size: files[0]?.size,
            },
          ],
        });
      });
    return undefined;
  };

  return (
    <EditorContainer>
      <SunEditor
        defaultValue={value}
        getSunEditorInstance={getSunEditorInstance}
        onImageUploadBefore={onImageUploadBefore}
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
