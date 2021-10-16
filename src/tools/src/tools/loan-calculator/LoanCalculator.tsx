import { MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownLink, MDBDropdownMenu, MDBDropdownToggle, MDBInputGroup, MDBInputGroupElement, MDBInputGroupText, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { LoanCalculatorUtils, Result } from "./LoanCalculatorUtils";

interface FormValue {
    currency: string,
    amount: number,
    term: number,
    rate: number,
    result: Result | null,
}

export const LoanCalculator: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        currency: "$",
        amount: 5000,
        term: 10,
        rate: 4.5,
        result: null,
    });

    useEffect(() => calculate(formValue), []);

    const calculate = (formValue: FormValue) => {
        const result = LoanCalculatorUtils.calculate({...formValue});
        console.log(result);
        setFormValue({ ...formValue, result });
    };

    const onChange = (e: any) => {
        const newFormValue = { ...formValue, [e.target.name]: e.currentTarget.value };
        setFormValue({ ...newFormValue });
        calculate(newFormValue);
    };

    return (
        <>
            <h1>Loan Calculator</h1>
            <MDBRow>
                <MDBCol md="6">
                    <LoanCalculatorFrom
                        currency={formValue.currency}
                        amount={formValue.amount}
                        term={formValue.term}
                        rate={formValue.rate}
                        onChange={onChange}
                    />
                </MDBCol>
            </MDBRow>
        </>
    )
}

interface LoanCalculatorFromProps {
    currency: string,
    amount: number,
    term: number,
    rate: number,
    onChange: (e: any) => void,
}

const LoanCalculatorFrom: React.FC<LoanCalculatorFromProps> = (props: LoanCalculatorFromProps) => {
    return (
        <>
            <MDBCol md="12" className="mb-3">
                <label htmlFor="amount" className="form-label">
                    Loan amount
                </label>
                <MDBInputGroup>
                    <MDBInputGroupText>{props.currency}</MDBInputGroupText>
                    <MDBInputGroupElement 
                        type="text"
                        value={props.amount.toString()}
                        name="amount"
                        id="amount"
                        onChange={props.onChange}
                    />
                </MDBInputGroup>
            </MDBCol>

            <MDBCol md="12" className="mb-3">
                <LoanCalculatorFromTerm name="term" term={props.term} onChange={props.onChange} />
            </MDBCol>

            <MDBCol md="12" className="mb-3">
                <label htmlFor="amount" className="form-label">
                    Interest rate per year
                </label>
                <MDBInputGroup>
                    <MDBInputGroupElement 
                        type="text"
                        value={props.rate.toString()}
                        name="rate"
                        id="rate"
                        onChange={props.onChange}
                    />
                    <MDBInputGroupText>%</MDBInputGroupText>
                </MDBInputGroup>
            </MDBCol>
        </>
    )
}

interface LoanCalculatorFromTermProps {
    name: string,
    term: number,
    onChange: (e: any) => void,
}

interface LoanCalculatorFromTermValue {
    term: number,
    termPeriod: string,
}

const LoanCalculatorFromTerm: React.FC<LoanCalculatorFromTermProps> = (props: LoanCalculatorFromTermProps) => {
    const [formValue, setFormValue] = useState<LoanCalculatorFromTermValue>({
        term: props.term,
        termPeriod: "years",
    });

    const calculateAndSendChange = (term: number, termPeriod: string) => {
        const value = termPeriod === "years" ? term * 12 : term;
        props.onChange({
            target: {name: props.name},
            currentTarget: {value},
        });
    }
    
    const onChange = (e: any) => {
        const newFormValue = { ...formValue, [e.target.name]: e.currentTarget.value };
        setFormValue({ ...newFormValue });
        calculateAndSendChange(newFormValue.term, newFormValue.termPeriod)
    }
    
    const onChangePeriod = (name: string, value: string) => {
        onChange({
            target: {name},
            currentTarget: {value},
        });
    }

    return (
        <>
            <label htmlFor="term" className="form-label">
                Loan term
            </label>
            <MDBInputGroup>
                <MDBInputGroupElement 
                    type="text"
                    value={formValue.term.toString()}
                    name="term"
                    id="term"
                    onChange={onChange}
                />
                <LoanCalculatorFromDropDown 
                    name="termPeriod"
                    values={["years", "months"]}
                    className="group-drop-down-right"
                    onChange={onChangePeriod}
                />
            </MDBInputGroup>
        </>
    )
}

interface DropDownValue {
    value: string,
}

interface LoanCalculatorFromDropDownParams {
    name: string,
    values: string[],
    className?: string,
    onChange: (name: string, value: string) => void,
}

const LoanCalculatorFromDropDown: React.FC<LoanCalculatorFromDropDownParams> = (props: LoanCalculatorFromDropDownParams) => {
    const [formValue, setFormValue] = useState<DropDownValue>({
        value: props.values[0],
    });

    const onChange = (value: string) => {
        setFormValue({ ...formValue, value });
        props.onChange(props.name, value);
    }

    return (
        <MDBDropdown>
            <MDBDropdownToggle className={props.className}>{formValue.value}</MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBDropdownItem>
                    <MDBDropdownLink tag="button" type="button" className="bg-light p-0 m-0"></MDBDropdownLink>
                </MDBDropdownItem>
                {props.values.map(x => (
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
    )
}