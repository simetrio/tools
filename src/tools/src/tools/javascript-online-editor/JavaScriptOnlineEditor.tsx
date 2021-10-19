import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
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

    const onChange = (e: any) => {
        setReloadValue({ reload: true });
        messages.values = [];
        setConsoleValue({ messages: [...messages.values] });
        setFormValue({ ...formValue, [e.target.name]: e.currentTarget.value });
        window.setTimeout(() => {
            setReloadValue({ reload: false });
        }, 500);
    };

    const onLog = (message: string) => {
        messages.values = [message].concat(...messages.values).slice(0, 10);
        setConsoleValue({ messages: [...messages.values] });
    };

    const consoleText = !consoleValue.messages.length
        ? ""
        : consoleValue.messages.reduce((r, x) => `${r}\n${x}`);

    return (
        <>
            <h1>Online JavaScript Editor</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBRow>
                        <MDBCol md="12" className="mb-3">
                            <MDBInput
                                label="Html"
                                name="html"
                                textarea
                                rows={15}
                                value={formValue.html}
                                onChange={onChange}
                            />
                        </MDBCol>

                        <MDBCol md="12" className="mb-3">
                            <MDBInput
                                label="JavaScript"
                                name="javaScript"
                                textarea
                                rows={15}
                                value={formValue.javaScript}
                                onChange={onChange}
                            />
                        </MDBCol>

                        <MDBCol md="12" className="mb-3">
                            <MDBInput
                                label="Css"
                                name="css"
                                textarea
                                rows={15}
                                value={formValue.css}
                                onChange={onChange}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBRow>
                        <MDBCol md="12" className="mb-3">
                            <div
                                className="square border-gray rounded wordwrap px-2 py-1"
                                style={{ height: 385 }}
                            >
                                <div dangerouslySetInnerHTML={{ __html: consoleText }} />
                            </div>
                        </MDBCol>

                        <MDBCol md="12" className="mb-3">
                            {!reloadValue.reload && (
                                <JavaScriptOnlineEditorHtml
                                    html={formValue.html}
                                    javaScript={formValue.javaScript}
                                    css={formValue.css}
                                    onLog={onLog}
                                />
                            )}
                            {reloadValue.reload && <JavaScriptOnlineEditorEmptyHtml />}
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
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
        const newConsole = ((oldCons: any) => {
            return {
                log: function (message: string) {
                    oldCons.log(message);
                    props.onLog(message);
                },
                info: function (message: string) {
                    oldCons.info(message);
                    props.onLog(message);
                },
                warn: function (message: string) {
                    oldCons.warn(message);
                    props.onLog(message);
                },
                error: function (message: string) {
                    oldCons.error(message);
                    props.onLog(message);
                },
            };
        })(iframeRef.current.contentWindow.console);

        iframeRef.current.contentWindow.console = newConsole;
    }, []);

    const html = htmlTemplate
        .replace("<!-- Edited Html -->", props.html)
        .replace("<!-- Edited JavaScript -->", props.javaScript)
        .replace("<!-- Edited Css -->", props.css);

    return (
        <iframe
            ref={iframeRef}
            srcDoc={html}
            className="w-100 square border-gray rounded"
            style={{ height: 385 }}
            frameBorder="0"
        ></iframe>
    );
};

const JavaScriptOnlineEditorEmptyHtml: React.FC = () => {
    return <div className="w-100 square border-gray rounded" style={{ height: 385 }}></div>;
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
