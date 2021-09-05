import React, { useState } from "react";

export default function TableOfContentsChapters(props) {
  const [showSubChapters, setShowSubChapters] = useState(false);

  return (
    <div>
      <h4 onClick={() => setShowSubChapters(!showSubChapters)}>
        {showSubChapters ? "- " : "+"}{" "}
        {props.chapter.chapterKey + ". " + props.chapter.chapterContent}
      </h4>
      {showSubChapters &&
        props.chapter.subChapters.map((subChapter) => (
          <h5
            key={subChapter.subChapterKey}
            onClick={() => props.changeSubChapter(subChapter)}
            style={{
              color:
                subChapter === props.currentSubChapter ? "orange" : "inherit",
            }}
          >
            {subChapter.subChapterKey}. {subChapter.subChapterContent}
          </h5>
        ))}
    </div>
  );
}
