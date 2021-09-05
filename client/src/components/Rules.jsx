import React from "react";

export default function Rules({ subChapter }) {
  return (
    <div>
      <h2>
        {subChapter.subChapterKey}. {subChapter.subChapterContent}
      </h2>
      {subChapter.rules.map((rule) => (
        <div key={rule.ruleKey} className="rule">
          <p>
            {rule.ruleKey}. <span>{rule.ruleContent}</span>
          </p>
          {rule.subRules.map((subRule) => (
            <ul key={subRule.subRuleKey} className="subRule">
              <li>
                {subRule.subRuleKey}. <span>{subRule.subRuleContent}</span>
              </li>
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}
