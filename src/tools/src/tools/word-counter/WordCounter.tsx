import {
    MDBCol,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { WordCounterUtils, IWordCount, IKeyword } from "./WordCounterUtils";

interface FormValue {
    text: string;
}

interface WordCountValue {
    wordCount: IWordCount | null;
}

let timeout = 0;

export const WordCounter: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        text: "",
    });

    const [wordCount, setWordCount] = useState<WordCountValue>({
        wordCount: null,
    });

    const executeAsync = (action: () => void) => {
        if (timeout) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(action, 500);
    };

    const onCalculate = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, text: value });
        executeAsync(() => setWordCount({ wordCount: WordCounterUtils.calculate(value) }));
    };

    return (
        <>
            <h1>Online Word Counter</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Text"
                        textarea
                        rows={15}
                        value={formValue.text}
                        onChange={onCalculate}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <WordCounterTabs
                        items={[
                            {
                                title: "Statistics",
                                render: () => (
                                    <WordCounterStatistics wordCount={wordCount.wordCount} />
                                ),
                            },
                            {
                                title: "Keywords",
                                render: () => (
                                    <WordCounterKeywords wordCount={wordCount.wordCount} />
                                ),
                            },
                        ]}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};

interface WordCounterViewProps {
    wordCount: IWordCount | null;
}

const WordCounterStatistics: React.FC<WordCounterViewProps> = (props: WordCounterViewProps) => {
    if (!props.wordCount) {
        return null;
    }

    return (
        <>
            {props.wordCount.statistics.map((x) => (
                <MDBRow>
                    <MDBCol sm="6">{x.name}</MDBCol>
                    <MDBCol sm="6">{x.value}</MDBCol>
                </MDBRow>
            ))}
        </>
    );
};

const WordCounterKeywords: React.FC<WordCounterViewProps> = (props: WordCounterViewProps) => {
    if (!props.wordCount) {
        return null;
    }

    return (
        <WordCounterTabs
            items={[
                {
                    title: "x1",
                    render: () => (
                        <WordCounterKeywordsItems keywords={props.wordCount!.oneKeywords} />
                    ),
                },
                {
                    title: "x2",
                    render: () => (
                        <WordCounterKeywordsItems keywords={props.wordCount!.twoKeywords} />
                    ),
                },
                {
                    title: "x3",
                    render: () => (
                        <WordCounterKeywordsItems keywords={props.wordCount!.threeKeywords} />
                    ),
                },
            ]}
        />
    );
};

interface WordCounterKeywordsItemsProps {
    keywords: IKeyword[];
}

const WordCounterKeywordsItems: React.FC<WordCounterKeywordsItemsProps> = (
    props: WordCounterKeywordsItemsProps,
) => {
    return (
        <MDBTable small hover>
            <MDBTableHead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Count</th>
                    <th scope="col">% of Text</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {props.keywords.map((x) => (
                    <tr>
                        <td>{x.words.reduce((a, b) => `${a} ${b}`)}</td>
                        <td>{x.count}</td>
                        <td>
                            <NumberView value={x.percent} />%
                        </td>
                    </tr>
                ))}
            </MDBTableBody>
        </MDBTable>
    );
};

interface WordCounterTabsProps {
    items: WordCounterTabsItem[];
}

interface WordCounterTabsItem {
    title: string;
    render: () => JSX.Element;
}

const WordCounterTabs: React.FC<WordCounterTabsProps> = (props: WordCounterTabsProps) => {
    const [activeTab, setActiveTab] = useState(props.items[0].title);

    const onClick = (name: string) => {
        if (name === activeTab) {
            return;
        }

        setActiveTab(name);
    };

    return (
        <>
            <MDBTabs justify className="mb-3">
                {props.items.map((x) => (
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => onClick(x.title)}
                            active={activeTab === x.title}
                        >
                            {x.title}
                        </MDBTabsLink>
                    </MDBTabsItem>
                ))}
            </MDBTabs>

            <MDBTabsContent>
                {props.items.map((x) => (
                    <MDBTabsPane show={activeTab === x.title}>{x.render()}</MDBTabsPane>
                ))}
            </MDBTabsContent>
        </>
    );
};

interface ViewParams<T> {
    value: T;
}

const NumberView: React.FC<ViewParams<number>> = (props: ViewParams<number>) => {
    const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    };
    return <>{new Intl.NumberFormat(undefined, options).format(props.value)}</>;
};
