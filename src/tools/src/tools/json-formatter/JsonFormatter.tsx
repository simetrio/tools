import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { JsonFormatterUtils } from "./JsonFormatterUtils";

interface FormValue {
    decoded: string;
    encoded: string;
}

export const JsonFormatter: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        decoded: "",
        encoded: "",
    });

    const formatValueHtml = (value: string | number | boolean, className: "text-danger" | "text-success"): string => {
        return `<span class=${className}>${value}</span>`;
    };

    const formatValue = (value: string | number | boolean | null): string => {
        if (value === null) {
            return formatValueHtml("null", "text-danger");
        }

        const type = typeof value === "number" || typeof value === "boolean" ? "text-danger" : "text-success";
        return formatValueHtml(value, type);
    };

    const onEncode = (e: any) => {
        const value = e.currentTarget.value || "";
        setFormValue({ ...formValue, decoded: value, encoded: JsonFormatterUtils.format(value, formatValue) });
    };

    const formatHtml = (value: string) => value.replace(/\n/g, "<br/>").replace(/\s\s/g, "&nbsp;&nbsp;");

    return (
        <>
            <h1>Online Json Formatter</h1>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <MDBInput label="Json" textarea rows={15} value={formValue.decoded} onChange={onEncode} />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <div className="square border-gray rounded wordwrap px-2 py-1" style={{ height: 385 }}>
                        <div dangerouslySetInnerHTML={{ __html: formatHtml(formValue.encoded) }} />
                    </div>
                </MDBCol>
            </MDBRow>
        </>
    );
};
