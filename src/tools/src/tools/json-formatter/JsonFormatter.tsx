import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { JsonFormatterUtils } from "./JsonFormatterUtils";

interface FormValue {
    decoded: string,
    encoded: string,
}

export const JsonFormatter: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: '',
        encoded: '',
    });

    const formatValue = (value: string | number): string => {
        if (typeof value === "string") {
            return `<span class=text-success>${value}</span>`;
        }
        return `<span class=text-danger>${value}</span>`;
    };

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: JsonFormatterUtils.format(value, formatValue) });
    }

    const formatHtml = (value: string) => value.replace(/\n/g, "<br/>").replace(/\s\s/g, "&nbsp;&nbsp;");

    return (
        <>
            <h1>Online Json Formatter</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput 
                        label="Json" 
                        textarea 
                        rows={15} 
                        value={formValue.decoded}
                        onChange={onEncode} 
                    />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <div className="square border-gray rounded wordwrap px-2 py-1" style={{height: 385}}>
                        <div dangerouslySetInnerHTML={{ __html: formatHtml(formValue.encoded) }} />
                    </div>
                </MDBCol>
            </MDBRow>
        </>
    )
}