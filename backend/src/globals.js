import chalk from "chalk";

export default () => {
    global.log = (colorOrStyles, text) => {
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

        process.stdout.write(styledText + "\n");
    };

    global.log.error = (colorOrStyles, text) => {
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

        process.stderr.write(styledText + "\n");
    };

};