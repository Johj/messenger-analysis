const sentiment = require('sentiment');

module.exports = sentimentByMonth = (thread) => {
  let dict = {};
  for (message of thread.messages) {
    const d = new Date(message.date);
    const date = `'${d.getFullYear().toString().substr(2)}-${((d.getMonth() + 1).toString().length === 1 ? '0' : '') + (d.getMonth() + 1)}`;

    if (!dict[date]) {
      dict[date] = {};
      dict[date]['date'] = date;
    }

    const score = sentiment(message.message).score;

    if (!dict[date][message['sender']]) {
      dict[date][message['sender']] = [0, 0];
    }
    ++dict[date][message['sender']][0];
    dict[date][message['sender']][1] += score;
  }

  dict = Object.values(dict);

  for (i of dict) {
    const keys = Object.keys(i);
    for (key of keys) {
      if (key === 'date') continue;
      i[key] = (i[key][1] / i[key][0]).toFixed(5);
    }
  }

  return dict;
}
