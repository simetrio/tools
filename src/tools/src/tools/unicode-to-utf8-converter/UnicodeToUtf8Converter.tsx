import { MDBCol, MDBIcon, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { UTF8 } from "utf8-js-tools";

interface FormValue {
    decoded: string;
    encoded: string;
}

export const UnicodeToUtf8Converter: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: "",
        encoded: "",
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: UTF8.encode(value) });
    };

    const formatView = (utf8Text: string): string => {
        let symbols = "";
        for (let i = 0; i < utf8Text.length; i++) {
            symbols += `\\x${utf8Text.charCodeAt(i).toString(16).toLocaleUpperCase()}`;
        }
        return symbols;
    };

    return (
        <>
            <h1 className="d-inline-block me-3">Online Unicode To UTF8 Converter</h1>
            <a
                href="https://github.com/simetrio/utf8-js-tools"
                title="Code on Github"
                target="_blank"
                rel="noreferrer nofollow"
            >
                <MDBIcon color="black" fab icon="github-square" size="2x" />
            </a>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Unicode"
                        textarea
                        rows={15}
                        value={formValue.decoded}
                        onChange={onEncode}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="UTF8"
                        textarea
                        rows={15}
                        value={formatView(formValue.encoded)}
                        readonly={true}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};
