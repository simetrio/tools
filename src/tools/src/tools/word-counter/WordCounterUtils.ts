import { WordCounterStopWordsUtils } from "./WordCounterStopWordsUtils";

export const WordCounterUtils = {
    calculate: (value: string): IWordCount => calculateKeyword(value),
};

export interface IWordCount {
    statistics: IStatistic[];
    oneKeywords: IKeyword[];
    twoKeywords: IKeyword[];
    threeKeywords: IKeyword[];
}

export interface IStatistic {
    name: string;
    value: number;
}

export interface IKeyword {
    words: string[];
    count: number;
    percent: number;
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
    const words = getWords(value);
    const chars = value.replace(/[\r\n]/g, "");
    const charsNoSpaces = chars.replace(/ /g, "");
    const sentences = value.match(/[.!?]+/g) || [];
    const paragraphs = value.split("\n").filter((x) => x.trim() !== "");

    return [
        statistic("Words", words.length),
        statistic("Characters", chars.length),
        statistic("Characters (no spaces)", charsNoSpaces.length),
        statistic("Sentences", sentences.length + 1),
        statistic("Paragraphs", paragraphs.length),
    ];
}

function calculateOneKeywords(value: string): IKeyword[] {
    const words = getWords(value);
    const keywords: Map<string, number> = new Map<string, number>();

    words.forEach((x) => {
        if (hasNotStopWord([x])) {
            keywords.set(x, (keywords.get(x) || 0) + 1);
        }
    });

    return toKeywordsArray(keywords);
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

function keyword(word: string, count: number, total: number): IKeyword {
    return {
        words: split(word, "\n"),
        count,
        percent: (count / total) * 100,
    };
}

function toKeywordsArray(
    map: Map<string, number>,
    filter?: (keyword: IKeyword) => boolean,
): IKeyword[] {
    const keywords: IKeyword[] = [];

    map.forEach((value: number, key: string) => {
        keywords.push(keyword(key, value, map.size));
    });

    return keywords
        .filter((x) => !filter || filter(x))
        .sort((a, b) => b.count - a.count)
        .slice(0, 50);
}

function getWords(value: string): string[] {
    return (value.match(/[\w\-@а-яА-Я]+/g) || [])
        .filter((x) => x.trim() !== "")
        .map((x) => x.toLocaleLowerCase());
}

function split(value: string, char: string): string[] {
    return value
        .split(char)
        .map((x) => x.trim())
        .filter((x) => x !== "");
}

function hasNotStopWord(words: string[]): boolean {
    return !words.filter(WordCounterStopWordsUtils.is).length;
}
