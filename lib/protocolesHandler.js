const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENT_SPACE_ID,
  accessToken: process.env.CONTENT_ACCESS_TOKEN,
});

export const getContent = async (entryId) => {
  let entry = await client.getEntry(entryId);
  if (entry.fields.closingThePub) {
    return entry.fields.closingThePub.content;
  } else {
    return [];
  }
}

export const getAllContent = async () =>{
  let entries = await client.getEntries();
  return entries.items;
}
