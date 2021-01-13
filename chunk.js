const MARKS = require('./marks');

module.exports = (bytes, chunkSize) => {
  const chunks = [];
  let chunk = [];
  let prefixes = [];
  bytes.forEach(byte => {
    if (prefixes.length >= chunkSize) {
      throw `Level is deeper than chunk size (level = ${prefixes.length}, chunkSize = ${chunkSize})`;
    }
  
    if (chunk.length + prefixes.length + 1 >= chunkSize) {
      while (chunk.length && (chunk[chunk.length - 1] & MARKS.OPEN_MARK)) { // chunk ends with open byte
        chunk.pop(); // remove to prevent unnecessary empty open/close
      }

      prefixes.forEach(() => { chunk.push(MARKS.CLOSE_MARK) }); 
      chunks.push(chunk);
      chunk = prefixes.map(p => p);
    }

    if (byte & MARKS.OPEN_MARK) {
      prefixes.push(byte);
    } else if (byte === MARKS.CLOSE_MARK) {
      prefixes.pop();
    }
    chunk.push(byte);
  });

  if (chunk.length) {
    chunks.push(chunk);
  }

  return chunks;
};
