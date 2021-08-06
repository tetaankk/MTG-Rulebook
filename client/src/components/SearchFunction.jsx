import { useEffect, useState } from "react";
import LoopIcon from "@material-ui/icons/Loop";

export default function SearchFunction({ rules, toSearch }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const printResults = () => {
    return (
      <div>
        <h2>
          {searchResults.length} results found for "{toSearch}"
        </h2>
        {searchResults.map((rule) => (
          <div>
            <h4>
              {rule.ruleKey}. {rule.ruleContent}
            </h4>
          </div>
        ))}
      </div>
    );
  };

  const ruleResults = [];

  useEffect(() => {
    setSearchResults([]);
    setIsLoading(true);
    const delayedSearch = setTimeout(() => {
      rules.forEach((chapter) => {
        chapter.sections.forEach((subChapter) => {
          subChapter.rules.forEach((rule) => {
            if (
              rule.ruleContent.toLowerCase().includes(toSearch.toLowerCase())
            ) {
              ruleResults.push(rule);
            }
            rule.subRules.forEach((subRule) => {
              if (
                subRule.subRuleContent
                  .toLowerCase()
                  .includes(toSearch.toLowerCase())
              ) {
                ruleResults.push({
                  ruleContent: subRule.subRuleContent,
                  ruleKey: subRule.subRuleKey,
                });
              }
            });
          });
        });
      });
      setIsLoading(false);
      ruleResults.length > 0
        ? setSearchResults(ruleResults)
        : setNoResults(true);
    }, 500);
    return () => clearTimeout(delayedSearch);
  }, [toSearch]);

  return (
    <div className="rule">
      {isLoading && <LoopIcon className="loadingIcon" />}
      {searchResults.length > 0
        ? printResults()
        : noResults && <p>No results for "{toSearch}"</p>}
    </div>
  );
}
