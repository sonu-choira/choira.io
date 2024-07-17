import React, { useRef, useState, useEffect } from "react";
import ClipboardJS from "clipboard";

const CopyToClipboard = ({ textToCopy, textLength = 15 }) => {
  const textRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const clipboard = new ClipboardJS(textRef.current, {
        text: () => textToCopy,
      });

      clipboard.on("success", (e) => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
        e.clearSelection();
      });

      clipboard.on("error", (e) => {
        console.error("Error in copying:", e.action);
      });

      // Cleanup the Clipboard.js instance on component unmount
      return () => {
        clipboard.destroy();
      };
    }
  }, [textToCopy]);

  const handleCopy = () => {
    if (textRef.current) {
      textRef.current.click();
    }
  };

  const displayText =
    String(textToCopy).length > textLength
      ? String(textToCopy).slice(0, textLength) + "..."
      : textToCopy;

  return (
    <span ref={textRef} style={{ cursor: "pointer" }} onClick={handleCopy}>
      {copied ? "Copied!" : displayText}
    </span>
  );
};

export default CopyToClipboard;
