import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Unit, UnitConverterUtils, UnitGroups, UnitTypes } from "./UnitConverterUtils";

export const UnitConverter: React.FC = () => {
    return (
        <>
            <h1>Online Unit Converter</h1>
            {UnitTypes.map((x) => (
                <MDBCard border="primary" className="mb-3">
                    <MDBCardHeader background="primary" className="text-white">
                        {x}
                    </MDBCardHeader>
                    <MDBCardBody className="pb-2">
                        <UnitConverterRow units={UnitGroups[x]} />
                    </MDBCardBody>
                </MDBCard>
            ))}
        </>
    );
};

interface FormValue {
    value: number;
    from: Unit;
    to: Unit;
    result: number;
}

interface UnitConverterRowParams {
    units: Unit[];
}

const UnitConverterRow: React.FC<UnitConverterRowParams> = (params: UnitConverterRowParams) => {
    const [formValue, setFormValue] = useState<FormValue>({
        value: 0,
        from: params.units[0],
        to: params.units[0],
        result: 0,
    });

    const onConvert = (e: any) => {
        const newFormValue = { ...formValue, [e.target.name]: e.currentTarget.value };
        setFormValue({
            ...newFormValue,
            result: UnitConverterUtils.convert(newFormValue.value, newFormValue.from, newFormValue.to),
        });
    };

    const onChangeUnit = (name: string, value: Unit) => {
        onConvert({
            target: { name },
            currentTarget: { value },
        });
    };

    return (
        <>
            <MDBRow>
                <MDBCol md="3" className="mb-3">
                    <MDBInput
                        name="value"
                        label="Value"
                        value={formValue.value.toString()}
                        onChange={onConvert}
                        type="number"
                    />
                </MDBCol>

                <MDBCol md="3" className="mb-3">
                    <UnitConverterUnitsDropDown name="from" units={params.units} onChange={onChangeUnit} />
                </MDBCol>

                <MDBCol md="3" className="mb-3">
                    <MDBInput
                        name="result"
                        label="Result"
                        value={formValue.result.toString()}
                        type="number"
                        readonly={true}
                    />
                </MDBCol>

                <MDBCol md="3" className="mb-3">
                    <UnitConverterUnitsDropDown name="to" units={params.units} onChange={onChangeUnit} />
                </MDBCol>
            </MDBRow>
        </>
    );
};

interface DropDownValue {
    value: Unit;
}

interface UnitConverterUnitsDropDownParams {
    name: string;
    units: Unit[];
    onChange: (name: string, unit: Unit) => void;
}

const UnitConverterUnitsDropDown: React.FC<UnitConverterUnitsDropDownParams> = (
    params: UnitConverterUnitsDropDownParams,
) => {
    const [formValue, setFormValue] = useState<DropDownValue>({
        value: params.units[0],
    });

    const onChange = (value: Unit) => {
        setFormValue({ ...formValue, value });
        params.onChange(params.name, value);
    };

    return (
        <>
            <MDBDropdown group className="w-100">
                <MDBDropdownToggle>{formValue.value}</MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem>
                        <MDBDropdownLink tag="button" type="button" className="bg-light p-0 m-0"></MDBDropdownLink>
                    </MDBDropdownItem>
                    {params.units.map((x) => (
                        <MDBDropdownItem>
                            <MDBDropdownLink
                                tag="button"
                                type="button"
                                onClick={() => onChange(x)}
                                className={formValue.value === x ? "active" : ""}
                                aria-current={formValue.value === x ? "true" : ""}
                            >
                                {x}
                            </MDBDropdownLink>
                        </MDBDropdownItem>
                    ))}
                </MDBDropdownMenu>
            </MDBDropdown>
        </>
    );
};
