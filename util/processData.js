const fs = require('fs');
const beautify = require('js-beautify').js_beautify;

module.exports = processData = (data, fileName, func) => {
  // check if processed data file already exists
  let fileExists = true;
  try {
    require(`../data/processed_data/${fileName}.json`);
  } catch (e) {
    fileExists = false;
    console.log(e);
  }

  let processed_data;
  if (fileExists) {
    // read processed data file
    processed_data = require(`../data/processed_data/${fileName}.json`);
  } else {
    // process data
    processed_data = {
      user: data.user,
      threads: data.threads
        .sort((a, b) => b.messages.length - a.messages.length)
        .map(i => {
          return { participants: i.participants, data: func(i), };
        }),
    };

    // write processed data to file
    fs.writeFile(
      `./data/processed_data/${fileName}.json`,
      beautify(JSON.stringify(processed_data), { indent_size: 2, }),
      (e) => console.log(e ? e : 'File saved.')
    );
  }

  return processed_data;
}