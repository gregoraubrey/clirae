"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("This is the start of index.ts");
const axios = require("axios");
const cheerio = require("cheerio");
function getDefinition(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://www.spanishdict.com/translate/${word}`;
        try {
            const response = yield axios.get(url, {
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
    });
}
getDefinition("cuajar").then(console.log);
