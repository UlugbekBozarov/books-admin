import { FC, memo } from "react";

import { StyledContent } from "./HtmlContent.style";

interface HtmlContentProps {
  content?: string;
}

const HtmlContent: FC<HtmlContentProps> = ({ content = "" }) => {
  return (
    <StyledContent
      className="sun-editor-editable"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default memo(HtmlContent);
