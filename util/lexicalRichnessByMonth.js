module.exports = lexicalRichnessByMonth = (thread) => {
  let dict = {};
  for (message of thread.messages) {
    const d = new Date(message.date);
    const date = `'${d.getFullYear().toString().substr(2)}-${((d.getMonth() + 1).toString().length === 1 ? '0' : '') + (d.getMonth() + 1)}`;

    if (!dict[date]) {
      dict[date] = {};
      dict[date]['date'] = date;
    }

    const split = message.message.split(' ');

    if (!dict[date][message['sender']]) {
      dict[date][message['sender']] = [0, []];
    }
    dict[date][message['sender']][0] += split.length;
    dict[date][message['sender']][1] = dict[date][message['sender']][1].concat(split);
  }

  dict = Object.values(dict);

  for (i of dict) {
    const keys = Object.keys(i);
    for (key of keys) {
      if (key === 'date') continue;
      i[key] = ([...new Set(i[key][1])].length / i[key][0]).toFixed(5);
    }
  }

  return dict;
}
