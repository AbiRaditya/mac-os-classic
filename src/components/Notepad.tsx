"use client";

import React, { useState } from "react";

const Notepad: React.FC = () => {
  const [content, setContent] = useState<string>("");

  return (
    <div className="xp-notepad">
      <textarea
        className="xp-notepad-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your text here..."
        rows={20}
        cols={50}
      />
    </div>
  );
};

export default Notepad;
