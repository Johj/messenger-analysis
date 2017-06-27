module.exports = wordCount = (thread) => {
  let dict = {};
  const arr = ['lol', 'lmao', 'kek', 'fuck', 'gg', 'wtf', 'shit', 'wew', 'wewlad', 'faggot', 'm8', 'idk', 'lel', 'rip', 'mfw', 'tfw',];

  for (word of arr) {    
    dict[word] = {};
    dict[word]['word'] = word;

    for (message of thread.messages) {
      const key = message.sender;
      const count = (message['message'].match(new RegExp(word, 'gi')) || []).length;

      if (!dict[word][key]) {
        dict[word][key] = 0;
      }
      dict[word][key] += count;
    }
  }
  
  return Object.values(dict);
}
