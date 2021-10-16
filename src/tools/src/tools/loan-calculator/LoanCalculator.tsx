import { MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownLink, MDBDropdownMenu, MDBDropdownToggle, MDBInputGroup, MDBInputGroupElement, MDBInputGroupText, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { memo, useEffect, useState } from "react";
import { LoanCalculatorUtils, Result, ResultRow } from "./LoanCalculatorUtils";

interface FormValue {
    amount: number,
    term: number,
    rate: number,
    result: Result | null,
}

let timeout = 0;

export const LoanCalculator: React.FC = () => {
    const [formValue, setFormValue] = useState<FormValue>({
        amount: 5000,
        term: 60,
        rate: 4.5,
        result: null,
    });

    // eslint-disable-next-line
    useEffect(() => calculate(formValue), []);

    const executeAsync = (action: () => void) => {
        if (timeout) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(action, 1000);
    }

    const calculate = (formValue: FormValue) => {
        const result = LoanCalculatorUtils.calculate({...formValue});
        setFormValue({ ...formValue, result });
    };

    const onChange = (name: string, value: any) => {
        const newFormValue = { ...formValue, [name]: value };
        setFormValue({ ...newFormValue });
        executeAsync(() => calculate(newFormValue));
    };

    return (
        <>
            <h1>Loan Calculator</h1>
            <MDBRow>
                <MDBCol md="6">
                    <LoanCalculatorFrom
                        amount={formValue.amount}
                        term={formValue.term}
                        rate={formValue.rate}
                        onChange={onChange}
                    />
                </MDBCol>
                {formValue.result && (
                    <MDBCol md="6">
                        <LoanCalculatorSummary result={formValue.result} />
                    </MDBCol>
                )}
            </MDBRow>
            {formValue.result && (
                <MDBRow>
                    <MDBCol md="12">
                        <LoanCalculatorTable result={formValue.result} />
                    </MDBCol>
                </MDBRow>
            )}
        </>
    )
}

interface LoanCalculatorFromProps {
    amount: number,
    term: number,
    rate: number,
    onChange: (name: string, value: number) => void,
}

const LoanCalculatorFrom: React.FC<LoanCalculatorFromProps> = (props: LoanCalculatorFromProps) => {
    return (
        <>
            <MDBCol md="12" className="mb-3">
                <label htmlFor="amount" className="form-label">
                    Loan amount
                </label>
                <MDBInputGroup>
                    <NumberEdit
                        value={props.amount}
                        name="amount"
                        onChange={props.onChange}
                    />
                </MDBInputGroup>
            </MDBCol>

            <MDBCol md="12" className="mb-3">
                <LoanCalculatorFromTerm name="term" value={props.term} onChange={props.onChange} />
            </MDBCol>

            <MDBCol md="12" className="mb-3">
                <label htmlFor="amount" className="form-label">
                    Interest rate per year
                </label>
                <MDBInputGroup>
                    <NumberEdit 
                        value={props.rate}
                        name="rate"
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
    value: number,
    onChange: (name: string, value: number) => void,
}

interface LoanCalculatorFromTermValue {
    term: number,
    termPeriod: string,
}

const LoanCalculatorFromTerm: React.FC<LoanCalculatorFromTermProps> = (props: LoanCalculatorFromTermProps) => {
    const [formValue, setFormValue] = useState<LoanCalculatorFromTermValue>({
        term: props.value / 12,
        termPeriod: "years",
    });

    const calculateAndSendChange = (term: number, termPeriod: string) => {
        const value = termPeriod === "years" ? term * 12 : term;
        props.onChange(props.name, value);
    }
    
    const onChange = (name: string, value: any) => {
        const newFormValue = { ...formValue, [name]: value };
        setFormValue({ ...newFormValue });
        calculateAndSendChange(newFormValue.term, newFormValue.termPeriod)
    }

    return (
        <>
            <label htmlFor="term" className="form-label">
                Loan term
            </label>
            <MDBInputGroup>
                <NumberEdit
                    value={formValue.term}
                    name="term"
                    onChange={onChange}
                />
                <LoanCalculatorFromDropDown 
                    name="termPeriod"
                    values={["years", "months"]}
                    className="group-drop-down-right"
                    onChange={onChange}
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
    onChange: (name: string, value: any) => void,
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
                    <MDBDropdownItem key={x}>
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

interface LoanCalculatorTableValue {
    maxCount: number,
}

interface LoanCalculatorTableParams {
    result: Result,
}

const maxCountStep = 300;

const LoanCalculatorTable: React.FC<LoanCalculatorTableParams> = (props: LoanCalculatorTableParams) => {
    const [formValue, setFormValue] = useState<LoanCalculatorTableValue>({
        maxCount: maxCountStep,
    });
    
    useEffect(() => {
        window.setTimeout(() => {
        if (props.result.months.length > formValue.maxCount) {
                setFormValue({ ...formValue, maxCount: formValue.maxCount + maxCountStep });
            }
        }, 1000);
    // eslint-disable-next-line
    }, [formValue])

    useEffect(() => {
        setFormValue({ ...formValue, maxCount: maxCountStep });
    // eslint-disable-next-line
    }, [props.result])

    return (
        <MDBTable small hover>
            <MDBTableHead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Principal</th>
                    <th scope="col">Interest</th>
                    <th scope="col">Balance</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <td></td>
                    <td><DateView value={new Date()} /></td>
                    <td>&ndash;</td>
                    <td>&ndash;</td>
                    <td>&ndash;</td>
                    <td><NumberView value={props.result.amount} /></td>
                </tr>
                {props.result.months.slice(0, formValue.maxCount).map(x => (
                    <LoanCalculatorTableRowMemo key={x.date.toString()} {...x} />
                ))}
                {props.result.months.length <= formValue.maxCount && (
                    <tr className="table-success">
                        <td></td>
                        <td></td>
                        <th><NumberView value={props.result.total.payment} /></th>
                        <th><NumberView value={props.result.total.principal} /></th>
                        <th><NumberView value={props.result.total.interest} /></th>
                        <td></td>
                    </tr>
                )}
            </MDBTableBody>
        </MDBTable>
    )
}

const LoanCalculatorTableRow: React.FC<ResultRow> = (x: ResultRow) => {
    return (
        <tr>
            <th>{x.index}</th>
            <td><DateView value={x.date} /></td>
            <td><NumberView value={x.payment} /></td>
            <td><NumberView value={x.principal} /></td>
            <td><NumberView value={x.interest} /></td>
            <td><NumberView value={x.balance} /></td>
        </tr>
    )
}

const LoanCalculatorTableRowMemo = memo(LoanCalculatorTableRow);

interface LoanCalculatorSummaryParams {
    result: Result,
}

const LoanCalculatorSummary: React.FC<LoanCalculatorSummaryParams> = (props: LoanCalculatorSummaryParams) => {
    return (
        <MDBTable small>
            <MDBTableBody>
                <tr>
                    <td className="h6">Monthly Payments</td>
                    <td className="h6"><NumberView value={props.result.monthlyPayment} /></td>
                </tr>
                <tr>
                    <td className="h6">Total Principal Paid</td>
                    <td className="h6"><NumberView value={props.result.total.principal} /></td>
                </tr>
                <tr>
                    <td className="h6">Total Interest Paid</td>
                    <td className="h6"><NumberView value={props.result.total.interest} /></td>
                </tr>
                <tr>
                    <td className="h6">Total Payments</td>
                    <td className="h6"><NumberView value={props.result.total.payment} /></td>
                </tr>
            </MDBTableBody>
        </MDBTable>
    )
}

interface ViewParams<T> {
    value: T,
}

const NumberView: React.FC<ViewParams<number>> = (props: ViewParams<number>) => {
    const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }
    return <>{new Intl.NumberFormat(undefined, options).format(props.value)}</>;
}

const DateView: React.FC<ViewParams<Date>> = (props: ViewParams<Date>) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        dateStyle: "long",
    }
    
    const parts = new Intl.DateTimeFormat("en-us", dateOptions).formatToParts(props.value);
    const month = parts.find(x => x.type === "month")?.value;
    const year = parts.find(x => x.type === "year")?.value;

    return <>{month} {year}</>;
}

interface EditParams<T> {
    name: string,
    value: T,
    onChange: (name: string, value: T) => void,
}

interface EditValue {
    value: string,
}

const NumberEdit: React.FC<EditParams<number>> = (props: EditParams<number>) => {
    const [formValue, setFormValue] = useState<EditValue>({
        value: props.value.toString(),
    });

    const onChange = (e: any) => {
        const value = e.currentTarget.value as string;
        setFormValue({ ...formValue, value });
        props.onChange(props.name, parseFloat(value.replace(",", ".")))
    };
  
    return (
        <MDBInputGroupElement 
            type="text"
            value={formValue.value}
            name={props.name}
            id={props.name}
            onChange={onChange}
        />
    );
}