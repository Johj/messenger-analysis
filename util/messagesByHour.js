module.exports = messagesByHour = (thread) => {
  let dict = {};
  for (message of thread.messages) {
    const d = new Date(message.date);
    const key = d.getHours();

    if (!dict[key]) {
      dict[key] = {};
      dict[key]['hour'] = key;
    }

    if (!dict[key][message['sender']]) {
      dict[key][message['sender']] = 0;
    }
    ++dict[key][message['sender']];
  }
  
  return Object.values(dict);
}
