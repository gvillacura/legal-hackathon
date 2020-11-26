const re = /\[(\w+)\]/i;

const keyword = (subject) => {
  const keywordMatch = subject.match(re);

  if (keywordMatch === null) {
    return "";
  }
  const keyword = keywordMatch[1];
  return keyword;
};

module.exports = { keyword };
