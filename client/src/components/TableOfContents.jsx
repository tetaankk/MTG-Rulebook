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
        props.chapter.subChapters.map((subChapter) => (
          <h5
            key={subChapter.subChapterKey}
            onClick={() => props.changeSubChapter(subChapter)}
            style={{
              color:
                props.subChapter === subChapter && props.toSearch === ""
                  ? "orange"
                  : "inherit",
            }}
          >
            {subChapter.subChapterKey}{subChapter.subChapterContent}
          </h5>
        ))}
    </div>
  );
}
