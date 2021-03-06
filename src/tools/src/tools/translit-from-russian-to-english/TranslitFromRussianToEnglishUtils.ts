export const TranslitFromRussianToEnglishUtils = {
    encode: (value: string): string => translit(value),
};

function translit(value: string): string {
    let result: string = "";

    for (let i = 0; i < value.length; i++) {
        const char = value.charAt(i);
        const translitChar = translitChars[char];
        result += translitChar !== undefined ? translitChar : char;
    }

    return result;
}

const translitChars: any = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "jo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "j",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "shh",
    ъ: "",
    ы: "y",
    ь: "",
    э: "je",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Jo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "J",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shh",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "Je",
    Ю: "Yu",
    Я: "Ya",
};
