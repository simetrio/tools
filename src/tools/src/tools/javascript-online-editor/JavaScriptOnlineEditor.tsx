import { MDBCol, MDBIcon, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";

interface FormValue {
    html: string;
    javaScript: string;
    css: string;
}

export const JavaScriptOnlineEditor: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        html: defaultHtml,
        javaScript: defaultJavaScript,
        css: defaultCss,
    });

    const onChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.currentTarget.value });
    };

    const html = htmlTemplate
        .replace("<!-- Edited Html -->", formValue.html)
        .replace("<!-- Edited JavaScript -->", formValue.javaScript)
        .replace("<!-- Edited Css -->", formValue.css);

    return (
        <>
            <h1>Online JavaScript Editor</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Html"
                        name="html"
                        textarea
                        rows={15}
                        value={formValue.html}
                        onChange={onChange}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="JavaScript"
                        name="javaScript"
                        textarea
                        rows={15}
                        value={formValue.javaScript}
                        onChange={onChange}
                    />
                </MDBCol>
            
                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Css"
                        name="css"
                        textarea
                        rows={15}
                        value={formValue.css}
                        onChange={onChange}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <iframe 
                        src={"data:text/html;charset=utf-8," + escape(html)}
                        id="id_description_iframe" 
                        width="200" 
                        height="200" 
                        frameBorder="0"
                    >
                    
                    </iframe>
                </MDBCol>
            </MDBRow>
        </>
    );
};

const htmlTemplate: string = 
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>JavaScript Editor</title>

    <script><!-- Edited Css --></script>
  </head>
  <body>
    <!-- Edited Html -->
    <script><!-- Edited JavaScript --></script>
  </body>
</html>`

const defaultHtml: string = 
`<input type="button" value="Click Me" onclick="onClick()" />`

const defaultJavaScript: string = 
`function onClick() {
    console.log("Hello World!!!");
}`

const defaultCss: string = 
`body {
    padding: 50px;
}`
