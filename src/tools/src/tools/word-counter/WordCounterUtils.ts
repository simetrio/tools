export const WordCounterUtils = {
    calculate: (value: string): IWordCount => calculateKeyword(value),
};

export interface IWordCount {
    statistics: IStatistic[];
    oneKeywords: IKeyword[];
    twoKeywords: IKeyword[];
    threeKeywords: IKeyword[];
}

interface IStatistic {
    name: string;
    value: number;
}

interface IKeyword {
    word: string;
    count: number;
}

function calculateKeyword(value: string): IWordCount {
    return {
        statistics: calculateStatistics(value),
        oneKeywords: calculateOneKeywords(value),
        twoKeywords: calculateTwoKeywords(value),
        threeKeywords: calculateThreeKeywords(value),
    };
}

function calculateStatistics(value: string): IStatistic[] {
    const words = value.match(/[\w-@]+/g) || [];
    const chars = value.replace(/[\r\n]/g, "");
    const charsWithoutWhitespace = chars.replace(/ /g, "");
    const sentences = value.match(/[.!?]+/g) || [];
    const paragraphs = value.split("\n").filter((x) => x.trim() !== "");

    return [
        statistic("Words", words.length),
        statistic("Characters", chars.length),
        statistic("Characters (without whitespace)", charsWithoutWhitespace.length),
        statistic("Sentences", sentences.length + 1),
        statistic("Paragraphs", paragraphs.length),
    ];
}

function calculateOneKeywords(value: string): IKeyword[] {
    return [];
}

function calculateTwoKeywords(value: string): IKeyword[] {
    return [];
}

function calculateThreeKeywords(value: string): IKeyword[] {
    return [];
}

function statistic(name: string, value: number): IStatistic {
    return {
        name,
        value,
    };
}

function keyword(word: string, count: number): IKeyword {
    return {
        word,
        count,
    };
}
