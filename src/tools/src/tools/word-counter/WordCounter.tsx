import {
    MDBCol,
    MDBInput,
    MDBRow,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { WordCounterUtils, IWordCount } from "./WordCounterUtils";

interface FormValue {
    text: string;
    wordCount: IWordCount | null;
}

export const WordCounter: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        text: "",
        wordCount: null,
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, text: value, wordCount: WordCounterUtils.calculate(value) });
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
                        onChange={onEncode}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <WordCounterTabs
                        items={[
                            {
                                title: "Statistics",
                                render: () => (
                                    <WordCounterStatistics wordCount={formValue.wordCount} />
                                ),
                            },
                            {
                                title: "Keywords",
                                render: () => (
                                    <WordCounterKeywords wordCount={formValue.wordCount} />
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
    return <></>;
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
