import chalk from "chalk";

export default () => {
    global.log = (colorOrStyles, text, arrow = "") => {
        let styledText = text;

        if (typeof colorOrStyles === "string") {
            if (colorOrStyles.startsWith("#")) {
                styledText = chalk.hex(colorOrStyles)(styledText);
            } else {
                styledText = chalk.rgb(...colorOrStyles.split(","))(styledText);
            }
        } else {
            colorOrStyles.forEach(style => {
                styledText = chalk[style](styledText);
            });
        }

        process.stdout.write(arrow + styledText + "\n");
    };

    global.log.error = (colorOrStyles, text, arrow = "") => {
        let styledText = text;

        if (typeof colorOrStyles === "string") {
            if (colorOrStyles.startsWith("#")) {
                styledText = chalk.hex(colorOrStyles)(styledText);
            } else {
                styledText = chalk.rgb(...colorOrStyles.split(","))(styledText);
            }
        } else {
            colorOrStyles.forEach(style => {
                styledText = chalk[style](styledText);
            });
        }

        process.stderr.write(arrow + styledText + "\n");
    };

};