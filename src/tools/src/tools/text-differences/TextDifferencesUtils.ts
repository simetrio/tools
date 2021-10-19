export const TextDifferencesUtils = {
    findDifferences: (before: string, after: string): string => {
        if (!before || !after) {
            return "";
        }
        if (before === after) {
            return before;
        }
        return new TextDifferencer().findDifferencesBetweenStrings(before, after).toString();
    },
};

function insertElementAt<T>(array: T[], element: T, index: number): void {
    array.splice(index, 0, element);
}

function insertElementsAt<T>(array: T[], elements: T[], index: number) {
    for (let i = 0; i < elements.length; i++) {
        array.splice(index + i, 0, elements[i]);
    }
}

function removeAt<T>(array: T[], index: number) {
    array.splice(index, 1);
}

class TextDifferencer {
    public findDifferencesBetweenStrings(string0: string, string1: string): TextDifferences {
        let lengthOfShorterString: number = string0.length <= string1.length ? string0.length : string1.length;

        let numberOfExtremes = 2;
        let passagePairsMatchingAtExtremes: TextPassagePair[] = [];

        for (let e = 0; e < numberOfExtremes; e++) {
            let lengthOfMatchingSubstring = 0;

            for (let i = 0; i < lengthOfShorterString; i++) {
                let offsetForString0 = e === 0 ? i : string0.length - i - 1;
                let offsetForString1 = e === 0 ? i : string1.length - i - 1;

                let charFromString0 = string0[offsetForString0];
                let charFromString1 = string1[offsetForString1];

                if (charFromString0 !== charFromString1) {
                    lengthOfMatchingSubstring = i;
                    break;
                }
            }

            let matchingSubstringAtExtreme: string;

            if (e === 0) {
                matchingSubstringAtExtreme = string0.substr(0, lengthOfMatchingSubstring);
                string0 = string0.substr(lengthOfMatchingSubstring);
                string1 = string1.substr(lengthOfMatchingSubstring);
            } // if (e === 1)
            else {
                matchingSubstringAtExtreme = string0.substr(string0.length - lengthOfMatchingSubstring);
                string0 = string0.substr(0, string0.length - lengthOfMatchingSubstring);
                string1 = string1.substr(0, string1.length - lengthOfMatchingSubstring);
            }

            let passagePairMatchingAtExtreme = new TextPassagePair(
                true, // doPassagesMatch
                [new TextPassage(matchingSubstringAtExtreme), new TextPassage(matchingSubstringAtExtreme)],
            );

            passagePairsMatchingAtExtremes.push(passagePairMatchingAtExtreme);
        }

        let passagePairsAll: TextPassagePair[] = [];

        var passagePairsMatching = this.findPassagePairsMatchingBetweenStrings(string0, string1, [0, 0]);

        this.insertPassagePairsDifferentBetweenMatching(string0, string1, passagePairsMatching, passagePairsAll);

        for (var e = 0; e < passagePairsMatchingAtExtremes.length; e++) {
            var passagePairMatchingAtExtreme = passagePairsMatchingAtExtremes[e];
            insertElementAt(passagePairsAll, passagePairMatchingAtExtreme, e === 0 ? 0 : passagePairsAll.length);
        }

        var returnValue = new TextDifferences(passagePairsAll);

        return returnValue;
    }

    private findPassagePairsMatchingBetweenStrings(
        string0: string,
        string1: string,
        positionOffsets: number[],
    ): TextPassagePair[] {
        var passagePairsMatching: TextPassagePair[] = [];

        var longestCommonPassagePair = this.findLongestCommonPassagePair(string0, string1);

        var longestCommonPassageText = longestCommonPassagePair.passages[0].text;
        var lengthOfCommonPassage = longestCommonPassageText.length;

        if (lengthOfCommonPassage === 0) {
            return passagePairsMatching;
        }

        passagePairsMatching.push(longestCommonPassagePair);

        var passages = longestCommonPassagePair.passages;
        var passage0 = passages[0];
        var passage1 = passages[1];

        var passagePairsMatchingBeforeCommon = this.findPassagePairsMatchingBetweenStrings(
            string0.substr(0, passage0.position),
            string1.substr(0, passage1.position),
            [positionOffsets[0], positionOffsets[1]],
        );

        var passagePairsMatchingAfterCommon = this.findPassagePairsMatchingBetweenStrings(
            string0.substr(passage0.position + lengthOfCommonPassage),
            string1.substr(passage1.position + lengthOfCommonPassage),
            [
                positionOffsets[0] + passage0.position + lengthOfCommonPassage,

                positionOffsets[1] + passage1.position + lengthOfCommonPassage,
            ],
        );

        var passagePairSetsMatchingBeforeAndAfter = [passagePairsMatchingBeforeCommon, passagePairsMatchingAfterCommon];

        for (var i = 0; i < passagePairSetsMatchingBeforeAndAfter.length; i++) {
            var passagePairsToInsert = passagePairSetsMatchingBeforeAndAfter[i];
            insertElementsAt(passagePairsMatching, passagePairsToInsert, i === 0 ? 0 : passagePairsMatching.length);
        }

        for (i = 0; i < longestCommonPassagePair.passages.length; i++) {
            var passage = longestCommonPassagePair.passages[i];
            passage.position += positionOffsets[i];
        }

        return passagePairsMatching;
    }

    private findLongestCommonPassagePair(string0: string, string1: string): TextPassagePair {
        var passage0 = new TextPassage("", 0);
        var passage1 = new TextPassage("", 0);

        var returnValue = new TextPassagePair(
            true, // doPassagesMatch
            [passage0, passage1],
        );

        var lengthOfString0 = string0.length;
        var lengthOfString1 = string1.length;

        var substringLengthsForRow: number[] = [];
        var substringLengthsForRowPrev: number[] = [];

        var lengthOfLongestCommonSubstringSoFar = 0;

        // Build a table whose y-axis is chars from string0,
        // and whose x-axis is chars from string1.
        // Put length of the longest substring in each cell.

        for (var i = 0; i < lengthOfString0; i++) {
            substringLengthsForRowPrev = substringLengthsForRow;
            substringLengthsForRow = [];

            for (var j = 0; j < lengthOfString1; j++) {
                if (string0[i] !== string1[j]) {
                    substringLengthsForRow[j] = 0;
                } else {
                    var cellValue;

                    if (i === 0 || j === 0) {
                        // first row or column
                        cellValue = 1;
                    } else {
                        // Copy cell to upper left, add 1.
                        cellValue = substringLengthsForRowPrev[j - 1] + 1;
                    }

                    substringLengthsForRow[j] = cellValue;

                    if (cellValue > lengthOfLongestCommonSubstringSoFar) {
                        lengthOfLongestCommonSubstringSoFar = cellValue;
                        var startIndex = i - lengthOfLongestCommonSubstringSoFar + 1;
                        var longestCommonSubstringSoFar = string0.substring(
                            // not "substr"!
                            startIndex,
                            i + 1,
                        );

                        passage0.text = longestCommonSubstringSoFar;
                        passage0.position = startIndex;

                        passage1.text = longestCommonSubstringSoFar;
                        passage1.position = j - lengthOfLongestCommonSubstringSoFar + 1;
                    }
                }
            }
        }

        return returnValue;
    }

    private insertPassagePairsDifferentBetweenMatching(
        string0: string,
        string1: string,
        passagePairsToInsertBetween: TextPassagePair[],
        passagePairsAll: TextPassagePair[],
    ) {
        insertElementAt(
            passagePairsToInsertBetween,
            new TextPassagePair(
                true, // doPassagesMatch
                [new TextPassage("", 0), new TextPassage("", 0)],
            ),
            0,
        );

        passagePairsToInsertBetween.push(
            new TextPassagePair(
                true, // doPassagesMatch
                [new TextPassage("", string0.length), new TextPassage("", string1.length)],
            ),
        );

        var pMax = passagePairsToInsertBetween.length - 1;

        for (var p = 0; p < pMax; p++) {
            let passagePairToInsertAfter = passagePairsToInsertBetween[p];
            let passagePairToInsertBefore = passagePairsToInsertBetween[p + 1];

            this.buildAndInsertPassagePairBetweenExisting(
                string0,
                string1,
                passagePairToInsertBefore,
                passagePairToInsertAfter,
                passagePairsAll,
            );

            passagePairsAll.push(passagePairToInsertBefore);
        }

        var indexOfPassagePairFinal = passagePairsAll.length - 1;

        var passagePairFinal = passagePairsAll[indexOfPassagePairFinal];

        if (passagePairFinal.doPassagesMatch === true && passagePairFinal.passages[0].text.length === 0) {
            removeAt(passagePairsAll, indexOfPassagePairFinal);
        }
    }

    private buildAndInsertPassagePairBetweenExisting(
        string0: string,
        string1: string,
        passagePairToInsertBefore: TextPassagePair,
        passagePairToInsertAfter: TextPassagePair,
        passagePairsAll: TextPassagePair[],
    ) {
        var lengthOfPassageToInsertAfter = passagePairToInsertAfter.passages[0].text.length;

        var positionsForPassagePairDifferent = [
            [
                passagePairToInsertAfter.passages[0].position + lengthOfPassageToInsertAfter,

                passagePairToInsertAfter.passages[1].position + lengthOfPassageToInsertAfter,
            ],
            [passagePairToInsertBefore.passages[0].position, passagePairToInsertBefore.passages[1].position],
        ];

        var passageToInsert0 = new TextPassage(
            string0.substring(
                // not "substr"!
                positionsForPassagePairDifferent[0][0],
                positionsForPassagePairDifferent[1][0],
            ),
            positionsForPassagePairDifferent[0][0],
        );

        var passageToInsert1 = new TextPassage(
            string1.substring(
                // not "substr"!
                positionsForPassagePairDifferent[0][1],
                positionsForPassagePairDifferent[1][1],
            ),
            positionsForPassagePairDifferent[0][1],
        );

        var passagePairToInsert = new TextPassagePair(
            false, // doPassagesMatch
            [passageToInsert0, passageToInsert1],
        );

        if (passagePairToInsert.passages[0].text.length > 0 || passagePairToInsert.passages[1].text.length > 0) {
            passagePairsAll.push(passagePairToInsert);
        }
    }
}

class TextDifferences {
    constructor(passagePairs: any) {
        this.passagePairs = passagePairs;
    }

    public passagePairs: any;

    // instance methods

    public toString() {
        var returnValue = "";

        for (var p = 0; p < this.passagePairs.length; p++) {
            var passagePair = this.passagePairs[p];
            var passagePairAsString = passagePair.toString();

            returnValue += passagePairAsString;
        }

        return returnValue;
    }
}

class TextPassage {
    constructor(text: string, position: number = 0) {
        this.text = text;
        this.position = position;
    }

    public text: string;
    public position: number;
}

class TextPassagePair {
    constructor(doPassagesMatch: any, passages: any) {
        this.doPassagesMatch = doPassagesMatch;
        this.passages = passages;
    }

    public doPassagesMatch: any;
    public passages: any;

    public toString() {
        var returnValue = "";

        if (this.doPassagesMatch === true) {
            returnValue = this.passages[0].text;
            returnValue = this.escapeStringForHTML(returnValue);
        } else {
            returnValue += "<mark class='bg-danger px-0'>";
            returnValue += this.escapeStringForHTML(this.passages[0].text);
            returnValue += "</mark><mark class='bg-success px-0'>";
            returnValue += this.escapeStringForHTML(this.passages[1].text);
            returnValue += "</mark>";
        }

        return returnValue;
    }

    public escapeStringForHTML(stringToEscape: string) {
        var returnValue = stringToEscape
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\n", "<br />");

        return returnValue;
    }
}
