import tinycolor from "tinycolor2";

const getCorrectIndex = (num) => {
    return num > 255 ? 255 : num < 0 ? 0 : num;
};

export default (value) => {
    const [r, g, b] = value
        .substr(7, 3)
        .split("")
        .map((char) => getCorrectIndex(char.charCodeAt(0)));
    return {
        color: tinycolor({ r, g, b }).lighten(10).saturate(30).toHexString(),
        lightColor: tinycolor({ r, g, b })
            .lighten(30)
            .saturate(20)
            .toHexString(),
    };
};
