const ruleParser = (rulebody) => {

    const rawRules = rulebody
    .substring(
      rulebody.lastIndexOf("1. Game Concepts"),
      rulebody.lastIndexOf("Glossary")
    )
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean);

  const isChapter = (line) => /^\d{1}\D/.test(line);
  const isSubChapter = (line) => /^\d{3}\D\s/.test(line);
  const isRule = (line) => /^\d{3}\.\d{1}\./.test(line);
  const isSubRule = (line) => /^\d{3}\.\d{1}[a-z]{1}/.test(line);

  const parseChapter = (line) => {
    return {
      chapterKey: line.substring(0,1),
      chapterContent: line.substring(3),
      subChapters: [],
    }
  }

  const parseSubChapter = (line) => {
    return {
      subChapterKey: line.substring(0,3),
      subChapterContent: line.substring(3),
      rules: [],
    }
  }

  const parseRule = (line) => {
    return {
      ruleKey: line.substring(0,5),
      ruleContent: line.substring(6).trim(),
      subRules: [],
    }
  }

  const parseSubRule = (line) => {
    return {
      subRuleKey: line.substring(0,6),
      subRuleContent: line.substring(7).trim(),
    }
  }

  const chapters = rawRules.filter(isChapter).map(parseChapter);
  const subChapters = rawRules.filter(isSubChapter).map(parseSubChapter);
  const rules = rawRules.filter(isRule).map(parseRule);
  const subRules = rawRules.filter(isSubRule).map(parseSubRule);

  const matchSubRuleToRule = (rule) => (subRule) => {
    return subRule.subRuleKey.substring(0,5) === rule.ruleKey;
  }

  const matchRuleToSubChapter = (subChapter) => (rule) => {
    return rule.ruleKey.substring(0,3) === subChapter.subChapterKey;
  }

  const matchSubChapterToChapter = (chapter) => (subChapter) => {
    return subChapter.subChapterKey.substring(0,1) === chapter.chapterKey;
  }

  const rulesWithSubRules = rules.map((rule) => ({
    ...rule,
    subRules: subRules.filter(matchSubRuleToRule(rule)),
  }))

  const subChaptersWithRules = subChapters.map((subChapter) => ({
    ...subChapter,
    rules: rulesWithSubRules.filter(matchRuleToSubChapter(subChapter))
  }))

  const chaptersWithSubChapters = chapters.map((chapter) => ({
    ...chapter,
    subChapters: subChaptersWithRules.filter(matchSubChapterToChapter(chapter))
  }))

  return chaptersWithSubChapters;
}

module.exports = {ruleParser};