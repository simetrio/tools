import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { createRef, memo, useState } from "react";
import { Base64 } from "base64-js-tools";

interface FormValue {
    encoded: string;
}

const maxSizeMB = 5;

export const Base64EncodeFileOrImage: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        encoded: "",
    });

    const uploadFileRef: any = createRef();

    const onUpload = (e: any) => {
        if (e.target.files.length > 0) {
            setFormValue({ encoded: "Loading..." });

            const file = e.target.files[0] as File;
            const fileSizeMB = file.size / 1024 / 1024;
            if (fileSizeMB > maxSizeMB) {
                setFormValue({
                    encoded: `File too large. Max file size ${maxSizeMB} MB. File size ${fileSizeMB.toFixed(1)} MB`,
                });
                return;
            }

            const reader = new FileReader();
            reader.readAsArrayBuffer(new Blob([file]));
            reader.onload = function () {
                var arrayBuffer = reader.result;
                var bytes = new Uint8Array(arrayBuffer as any);
                setFormValue({ encoded: Base64.encodeByteArray(bytes as any) });
            };
        }
    };

    const onChooseFile = () => {
        uploadFileRef.current && uploadFileRef.current.click();
    };

    const onCopyToClipboard = () => {
        navigator.clipboard.writeText(formValue.encoded);
    };

    return (
        <>
            <h1 className="d-inline-block me-3">Online Base64 Encode File Or Image</h1>
            <a
                href="https://github.com/simetrio/base64-js-tools"
                title="Code on Github"
                target="_blank"
                rel="noreferrer"
            >
                <MDBIcon color="black" fab icon="github-square" size="2x" />
            </a>
            <div className="mb-3">
                <MDBBtn onClick={onChooseFile}>Choose file</MDBBtn>
                <MDBBtn className="mx-3" color="success" disabled={!formValue.encoded} onClick={onCopyToClipboard}>
                    Copy to clipboard
                </MDBBtn>
                <input type="file" style={{ display: "none" }} onChange={onUpload} ref={uploadFileRef} />
            </div>
            <div className="mb-3">
                <Base64EncodeFileOrImageEncodedMemo value={formValue.encoded} />
            </div>
        </>
    );
};

interface Base64EncodeFileOrImageEncodedProps {
    value: string;
}

const Base64EncodeFileOrImageEncoded: React.FC<Base64EncodeFileOrImageEncodedProps> = (
    props: Base64EncodeFileOrImageEncodedProps,
) => {
    return (
        <div className="square border-gray rounded wordwrap px-2 py-1" style={{ height: 430 }}>
            <div dangerouslySetInnerHTML={{ __html: props.value }} />
        </div>
    );
};

const Base64EncodeFileOrImageEncodedMemo = memo(Base64EncodeFileOrImageEncoded);
