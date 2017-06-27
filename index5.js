const fs = require('fs');

const lexicalRichnessByMonth = require('./util/lexicalRichnessByMonth.js');
const processData = require('./util/processData.js');
const template = require('./util/template.js');

const data = require(`./data/messages.json`);

const name = 'lexicalRichnessByMonth';
const processed_data = processData(data, name, lexicalRichnessByMonth);

// output
for (let index = 0; index < 10; ++index) {
  const thread = processed_data.threads[index];

  const data = `[${thread.data.map(i => JSON.stringify(i))}]`;
  const participants = `[` + thread
    .participants
    .concat([processed_data.user])
    .map(i => `"${i}"`) +
  `]`;
  const xAxis = `"date"`;
  const xAxisLabel = `"Month"`;
  const yAxisLabel = `"Unique Words / Total Words"`;
  const title = `"Lexical Richness by Month"`;
  const rotate = 90;
  const type = `"line"`;

  const file = template()
    .replace(/\{0\}/g, data)
    .replace(/\{1\}/g, participants)
    .replace(/\{2\}/g, xAxis)
    .replace(/\{3\}/g, xAxisLabel)
    .replace(/\{4\}/g, yAxisLabel)
    .replace(/\{5\}/g, title)
    .replace(/\{6\}/g, rotate)
    .replace(/\{7\}/g, type);

  fs.writeFileSync(`./output/${name}${index}.html`, file, 'utf8');
}
