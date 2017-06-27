module.exports = conversationInitByMonth = (thread) => {
  let dict = {};
  for (let i = 0; i < thread.messages.length - 1; ++i) {
    const lastMessage = thread.messages[i];
    const initMessage = thread.messages[i + 1];

    const last_d = new Date(lastMessage.date);
    const init_d = new Date(initMessage.date);

    // 10 minute gap between messages to be considered a conversation
    if (init_d - last_d <= 1000 * 60 * 30) {
      continue;
    }

    const date = `'${init_d.getFullYear().toString().substr(2)}-${((init_d.getMonth() + 1).toString().length === 1 ? '0' : '') + (init_d.getMonth() + 1)}`;

    if (!dict[date]) {
      dict[date] = {};
      dict[date]['date'] = date;
    }

    if (!dict[date][initMessage['sender']]) {
      dict[date][initMessage['sender']] = 0;
    }
    ++dict[date][initMessage['sender']];
  }

  return Object.values(dict);
}
