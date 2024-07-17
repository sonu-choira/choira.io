import React, { useRef, useState } from "react";

const CopyToClipboard = ({
  textToCopy,
  textLength = 15,
  showTitle = true,
  customStyle,
}) => {
  const textRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (textRef.current) {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      } catch (err) {
        console.error("Error in copying:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const displayText = textLength
    ? String(textToCopy).length > textLength
      ? String(textToCopy).slice(0, textLength) + "..."
      : textToCopy
    : textToCopy;

  return (
    <span
      title={showTitle ? textToCopy : ""}
      ref={textRef}
      style={{
        cursor: "pointer",
        color: copied ? "green" : "inherit",
        ...customStyle,
      }}
      onClick={handleCopy}
    >
      {copied ? "Copied!" : displayText}
    </span>
  );
};

export default CopyToClipboard;
