module.exports = messagesByMonth = (thread) => {
  let dict = {};
  for (message of thread.messages) {
    const d = new Date(message.date);
    const date = `'${d.getFullYear().toString().substr(2)}-${((d.getMonth() + 1).toString().length === 1 ? '0' : '') + (d.getMonth() + 1)}`;

    if (!dict[date]) {
      dict[date] = {};
      dict[date]['date'] = date;
    }

    if (!dict[date][message['sender']]) {
      dict[date][message['sender']] = 0;
    }
    ++dict[date][message['sender']];
  }
  
  return Object.values(dict);
}
