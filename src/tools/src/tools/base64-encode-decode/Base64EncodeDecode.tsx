import { MDBCol, MDBIcon, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { Base64 } from "base64-js-tools";

interface FormValue {
    decoded: string;
    encoded: string;
}

export const Base64EncodeDecode: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: "",
        encoded: "",
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: Base64.encodeText(value) });
    };

    const onDecode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: Base64.decodeToText(value), encoded: value });
    };

    return (
        <>
            <h1 className="d-inline-block me-3">Online Base64 Encode/Decode Text</h1>
            <a
                href="https://github.com/simetrio/base64-js-tools"
                title="Code on Github"
                target="_blank"
                rel="noreferrer"
            >
                <MDBIcon color="black" fab icon="github-square" size="2x" />
            </a>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Decoded Base64"
                        textarea
                        rows={20}
                        value={formValue.decoded}
                        onChange={onEncode}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Encoded Base64"
                        textarea
                        rows={20}
                        value={formValue.encoded}
                        onChange={onDecode}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};
