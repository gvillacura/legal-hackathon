const re = /\[(\w+)\]/i;

const keyword = (subject) => {
  const keywordMatch = subject.match(re);
  console.log(keywordMatch);
  let keyword;
  if (keywordMatch === null) {
    keyword = "NONE";
    return keyword;
  } else {
    keyword = keywordMatch[1].toUpperCase();
    return keyword;
  }
};

module.exports = { keyword };
