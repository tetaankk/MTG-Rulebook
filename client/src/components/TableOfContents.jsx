import TableOfContentsChapters from './TableOfContentsChapters';

export default function TableOfContents(props) {

    return (
        <div className="tableOfContents">
        {props.rules.length > 0 &&
          props.rules.map((chapter) => (
            <ul key={chapter.chapterKey}>
              <li>
                <TableOfContentsChapters
                    chapter={chapter}
                    currentSubChapter={props.currentSubChapter}
                    handleReset={props.handleReset}
                    changeSubChapter={(subChapter) => {
                      props.handleSubChapterChange(subChapter);
                      props.handleEmptySearch();
                    }}
                />
              </li>
            </ul>
          ))}
      </div>
    )
}
