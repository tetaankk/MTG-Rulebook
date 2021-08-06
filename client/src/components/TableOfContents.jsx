import React, { useState } from "react";

export default function TableOfContents(props) {
  const [showSubChapters, setShowSubChapters] = useState(false);

  return (
    <div>
      <h4 onClick={() => setShowSubChapters(!showSubChapters)}>
        {showSubChapters ? "- " : "+"} {props.chapter.chapterKey}.{" "}
        <span>{props.chapter.chapterContent}</span>
      </h4>
      {showSubChapters &&
        props.chapter.sections.map((section) => (
          <h5
            onClick={() => props.changeSubChapter(section)}
            style={{
              color:
                props.subChapter === section && props.toSearch === ""
                  ? "orange"
                  : "inherit",
            }}
          >
            {section.sectionKey}. {section.sectionContent}
          </h5>
        ))}
    </div>
  );
}
