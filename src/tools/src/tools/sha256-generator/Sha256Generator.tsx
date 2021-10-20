import { MDBCol, MDBIcon, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { SHA256 } from "sha256-js-tools";

interface FormValue {
    decoded: string;
    encoded: string;
}

export const Sha256Generator: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: "",
        encoded: "",
    });

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: SHA256.generate(value) });
    };

    return (
        <>
            <h1 className="d-inline-block me-3">Online SHA256 Generator</h1>
            <a
                href="https://github.com/simetrio/sha256-js-tools"
                title="Code on Github"
                target="_blank"
                rel="noreferrer nofollow"
            >
                <MDBIcon color="black" fab icon="github-square" size="2x" />
            </a>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="Text"
                        textarea
                        rows={15}
                        value={formValue.decoded}
                        onChange={onEncode}
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <MDBInput
                        label="SHA256"
                        textarea
                        rows={15}
                        value={formValue.encoded}
                        readonly={true}
                    />
                </MDBCol>
            </MDBRow>
        </>
    );
};
