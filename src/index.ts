console.log("This is the start of index.ts");

const axios = require("axios");
const cheerio = require("cheerio");

async function getDefinition(word: string) {
    const url = `https://www.spanishdict.com/translate/${word}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
            }
        });        
        const $ = cheerio.load(response.data);
        const definition = $("body").text();
        const firstIndex = definition.indexOf(word);
        const startIndex = definition.indexOf(word, firstIndex + 4);
        const endIndex = definition.indexOf("Copyright © Curiosity Media");
        const actualDefinition = definition.slice(startIndex, endIndex);
        return actualDefinition;
    }
    catch (error) {
        console.error(error);
    }
}

getDefinition("cuajar").then(console.log)
