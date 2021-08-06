import React from "react";

export default function Rules({ subChapter }) {
  return (
    <div>
      <h2>
        {subChapter.sectionKey}. {subChapter.sectionContent}
      </h2>
      {subChapter.rules.map((rule) => (
        <div className="rule">
          <h4 key={rule.ruleKey}>
            {rule.ruleKey}. <span>{rule.ruleContent}</span>
          </h4>
          {rule.subRules.map((subRule) => (
            <div className="subRule">
              <p key={subRule.subRuleKey}>
                {subRule.subRuleKey}. <span>{subRule.subRuleContent}</span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
