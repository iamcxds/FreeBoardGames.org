const { genGames } = require("./genGames.js");
const { fbgRun } = require("../util");

genGames([]);
fbgRun("yarn install ts-node cross-env glob");
fbgRun("yarn run i18n:copy");
