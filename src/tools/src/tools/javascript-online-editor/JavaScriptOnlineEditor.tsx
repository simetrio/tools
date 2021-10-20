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
import { createRef, useEffect, useState } from "react";

interface FormValue {
    html: string;
    javaScript: string;
    css: string;
}

interface ConsoleValue {
    messages: string[];
}

interface ReloadValue {
    reload: boolean;
}

interface IMessages {
    values: string[];
}

const messages: IMessages = {
    values: [],
};

export const JavaScriptOnlineEditor: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        html: defaultHtml,
        javaScript: defaultJavaScript,
        css: defaultCss,
    });

    const [consoleValue, setConsoleValue] = useState<ConsoleValue>({
        messages: [],
    });

    const [reloadValue, setReloadValue] = useState<ReloadValue>({
        reload: false,
    });

    const onChange = (name: string, value: string) => {
        setReloadValue({ reload: true });

        messages.values = [];
        setConsoleValue({ messages: [...messages.values] });
        setFormValue({ ...formValue, [name]: value });

        window.setTimeout(() => {
            setReloadValue({ reload: false });
        }, 500);
    };

    const onLog = (message: string) => {
        messages.values = [message].concat(...messages.values).slice(0, 10);
        setConsoleValue({ messages: [...messages.values] });
    };

    return (
        <>
            <h1>Online JavaScript Editor</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <JavaScriptOnlineEditorTabs
                        items={[
                            {
                                title: "Html",
                                name: "html",
                                value: formValue.html,
                            },
                            {
                                title: "JavaScript",
                                name: "javaScript",
                                value: formValue.javaScript,
                            },
                            {
                                title: "Css",
                                name: "css",
                                value: formValue.css,
                            },
                        ]}
                        defaultItem={1}
                        onChange={onChange}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <JavaScriptOnlineEditorResultTabs
                        html={formValue.html}
                        javaScript={formValue.javaScript}
                        css={formValue.css}
                        reload={reloadValue.reload}
                        messages={consoleValue.messages}
                        onLog={onLog}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};

interface JavaScriptOnlineEditorTabsProps {
    items: JavaScriptOnlineEditorTabsItem[];
    defaultItem: number;
    onChange: (name: string, value: string) => void;
}

interface JavaScriptOnlineEditorTabsItem {
    title: string;
    name: string;
    value: string;
}

const JavaScriptOnlineEditorTabs: React.FC<JavaScriptOnlineEditorTabsProps> = (
    props: JavaScriptOnlineEditorTabsProps,
) => {
    const [activeTab, setActiveTab] = useState(props.items[props.defaultItem].name);

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
                        <MDBTabsLink onClick={() => onClick(x.name)} active={activeTab === x.name}>
                            {x.title}
                        </MDBTabsLink>
                    </MDBTabsItem>
                ))}
            </MDBTabs>

            <MDBTabsContent>
                {props.items.map((x) => (
                    <MDBTabsPane show={activeTab === x.name}>
                        <JavaScriptOnlineEditorInput
                            name={x.name}
                            value={x.value}
                            onChange={props.onChange}
                        />
                    </MDBTabsPane>
                ))}
            </MDBTabsContent>
        </>
    );
};

interface JavaScriptOnlineEditorInputProps {
    name: string;
    value: string;
    onChange: (name: string, value: string) => void;
}

const JavaScriptOnlineEditorInput: React.FC<JavaScriptOnlineEditorInputProps> = (
    props: JavaScriptOnlineEditorInputProps,
) => {
    return (
        <MDBInput
            name={props.name}
            textarea
            rows={16}
            value={props.value}
            onChange={(e: any) => props.onChange(e.target.name, e.currentTarget.value)}
        />
    );
};

interface JavaScriptOnlineEditorResultTabsProps {
    html: string;
    javaScript: string;
    css: string;
    reload: boolean;
    messages: string[];
    onLog: (message: string) => void;
}

enum JavaScriptOnlineEditorResultTab {
    preview,
    console,
}

const JavaScriptOnlineEditorResultTabs: React.FC<JavaScriptOnlineEditorResultTabsProps> = (
    props: JavaScriptOnlineEditorResultTabsProps,
) => {
    const [activeTab, setActiveTab] = useState(JavaScriptOnlineEditorResultTab.preview);

    const onClick = (tab: JavaScriptOnlineEditorResultTab) => {
        if (tab === activeTab) {
            return;
        }

        setActiveTab(tab);
    };

    return (
        <>
            <MDBTabs justify className="mb-3">
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => onClick(JavaScriptOnlineEditorResultTab.preview)}
                        active={activeTab === JavaScriptOnlineEditorResultTab.preview}
                    >
                        Preview
                    </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => onClick(JavaScriptOnlineEditorResultTab.console)}
                        active={activeTab === JavaScriptOnlineEditorResultTab.console}
                    >
                        Console
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={activeTab === JavaScriptOnlineEditorResultTab.preview}>
                    {!props.reload && (
                        <JavaScriptOnlineEditorHtml
                            html={props.html}
                            javaScript={props.javaScript}
                            css={props.css}
                            onLog={props.onLog}
                        />
                    )}
                    {props.reload && <JavaScriptOnlineEditorEmptyHtml />}
                </MDBTabsPane>

                <MDBTabsPane show={activeTab === JavaScriptOnlineEditorResultTab.console}>
                    <JavaScriptOnlineEditorConsole messages={props.messages} />
                </MDBTabsPane>
            </MDBTabsContent>
        </>
    );
};

interface JavaScriptOnlineEditorHtmlProps {
    html: string;
    javaScript: string;
    css: string;
    onLog: (message: string) => void;
}

const JavaScriptOnlineEditorHtml: React.FC<JavaScriptOnlineEditorHtmlProps> = (
    props: JavaScriptOnlineEditorHtmlProps,
) => {
    const iframeRef: any = createRef();

    useEffect(() => {
        const newConsole = ((oldConsole: any) => {
            return {
                log: function (message: string) {
                    oldConsole.log(message);
                    props.onLog(message);
                },
                info: function (message: string) {
                    oldConsole.info(message);
                    props.onLog(message);
                },
                warn: function (message: string) {
                    oldConsole.warn(message);
                    props.onLog(message);
                },
                error: function (message: string) {
                    oldConsole.error(message);
                    props.onLog(message);
                },
            };
        })(iframeRef.current.contentWindow.console);

        iframeRef.current.contentWindow.console = newConsole;
        // eslint-disable-next-line
    }, []);

    const html = htmlTemplate
        .replace("<!-- Edited Html -->", props.html)
        .replace("<!-- Edited JavaScript -->", props.javaScript)
        .replace("<!-- Edited Css -->", props.css);

    return (
        <iframe
            title="html view"
            ref={iframeRef}
            srcDoc={html}
            className="w-100 square border-gray rounded"
            style={{ height: 410 }}
            frameBorder="0"
        ></iframe>
    );
};

const JavaScriptOnlineEditorEmptyHtml: React.FC = () => {
    return <div className="w-100 square border-gray rounded mb-2" style={{ height: 410 }}></div>;
};

interface JavaScriptOnlineEditorConsoleProps {
    messages: string[];
}

const JavaScriptOnlineEditorConsole: React.FC<JavaScriptOnlineEditorConsoleProps> = (
    props: JavaScriptOnlineEditorConsoleProps,
) => {
    const consoleText = !props.messages.length ? "" : props.messages.reduce((r, x) => `${r}\n${x}`);

    return (
        <div className="square border-gray rounded wordwrap px-2 py-1" style={{ height: 410 }}>
            <div dangerouslySetInnerHTML={{ __html: consoleText }} />
        </div>
    );
};

const htmlTemplate: string = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>JavaScript Editor</title>

    <style><!-- Edited Css --></style>
  </head>
  <body>
    <!-- Edited Html -->

    <script><!-- Edited JavaScript --></script>
  </body>
</html>`;

const defaultHtml: string = `<input type="button" value="Click Me" onclick="onClick()" />`;

const defaultJavaScript: string = `function onClick() {
    console.log("Hello World!!!");
}

console.log("Application started");`;

const defaultCss: string = `body {
    padding: 50px;
}`;
