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

    const oneWords = words.map((x) => [x]);
    
    return calculateKeywords(oneWords);
}

function calculateTwoKeywords(value: string): IKeyword[] {
    const words = getWords(value);

    const twoWords: string[][] = [];
    for (let i = 0; i < words.length - 1; i++) {
        twoWords.push([words[i], words[i + 1]]);
    }

    return calculateKeywords(twoWords);
}

function calculateThreeKeywords(value: string): IKeyword[] {
    const words = getWords(value);

    const threeWords: string[][] = [];
    for (let i = 0; i < words.length - 2; i++) {
        threeWords.push([words[i], words[i + 1], words[i + 2]]);
    }

    return calculateKeywords(threeWords);
}

function calculateKeywords(words: string[][]): IKeyword[] {
    const keywords: Map<string, number> = new Map<string, number>();

    words.forEach((x) => {
        if (hasNotStopWord(x)) {
            const word = x.reduce((a, b) => `${a} ${b}`);
            keywords.set(word, (keywords.get(word) || 0) + 1);
        }
    });

    return toKeywordsArray(keywords);
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

function toKeywordsArray(map: Map<string, number>): IKeyword[] {
    const keywords: IKeyword[] = [];

    map.forEach((value: number, key: string) => {
        keywords.push(keyword(key, value, map.size));
    });

    return keywords.sort((a, b) => b.count - a.count).slice(0, 50);
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
