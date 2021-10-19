import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { Sha256GeneratorUtils } from "./Sha256GeneratorUtils";

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
        setFormValue({ ...formValue, decoded: value, encoded: Sha256GeneratorUtils.encode(value) });
    };

    return (
        <>
            <h1>Online SHA256 Generator</h1>
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
