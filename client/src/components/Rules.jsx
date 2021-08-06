import React from "react";

export default function Rules({ subChapter }) {
  return (
    <div>
      <h2>
        {subChapter.sectionKey}. {subChapter.sectionContent}
      </h2>
      {subChapter.rules.map((rule) => (
        <div key={rule.ruleKey} className="rule">
          <h4 >
            {rule.ruleKey}. <span>{rule.ruleContent}</span>
          </h4>
          {rule.subRules.map((subRule) => (
            <div key={subRule.subRuleKey} className="subRule">
              <p >
                {subRule.subRuleKey}. <span>{subRule.subRuleContent}</span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
