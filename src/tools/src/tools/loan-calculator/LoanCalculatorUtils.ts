interface Props {
    amount: number,
    term: number,
    rate: number,
}

export interface Result {
    monthlyPayment: number,
    totalInterestPaid: number,
    years: ResultYear[],
    total: ResultRow,
}

export interface ResultYear {
    year: number,
    months: ResultRow[],
    total: ResultRow,
}

export interface ResultRow {
    date: Date,
    payment: number,
    principal: number,
    interest: number,
    totalInterest	: number,
    balance: number,
}

export const LoanCalculatorUtils = {
    calculate: (props: Props): Result | null => calculate(props),
}

function calculate(props: Props): Result | null {
    console.log(props);
    if (!props.amount || !props.term || !props.rate) {
        return null;
    }

    const monthlyPayment = calculateMonthlyPayment(props);
    return {
        monthlyPayment,
        totalInterestPaid: 0,
        years: [],
        total: {} as any
    }
}

function calculateMonthlyPayment(props: Props): number {
    const monthlyRate = props.rate / 12 / 100;
    return props.amount * (monthlyRate + monthlyRate / (Math.pow(1 + monthlyRate, props.term) - 1))
}