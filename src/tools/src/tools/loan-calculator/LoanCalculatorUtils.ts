interface Props {
    amount: number;
    term: number;
    rate: number;
}

export interface Result {
    amount: number;
    term: number;
    rate: number;
    monthlyPayment: number;
    months: ResultRow[];
    total: ResultRow;
}

export interface ResultRow {
    index: number;
    date: Date;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
}

export const LoanCalculatorUtils = {
    calculate: (props: Props): Result | null => calculate(props),
};

function calculate(props: Props): Result | null {
    if (!props.amount || !props.term || !props.rate) {
        return null;
    }

    const monthlyRate = props.rate / 12 / 100;
    const monthlyPayment = props.amount * (monthlyRate + monthlyRate / (Math.pow(1 + monthlyRate, props.term) - 1));
    const months = calculateMonths(monthlyRate, props.amount, props.term, monthlyPayment);
    const total = calculateTotal(months);

    return {
        amount: props.amount,
        term: props.term,
        rate: props.rate,
        monthlyPayment,
        months,
        total,
    };
}

function calculateMonths(monthlyRate: number, amount: number, term: number, monthlyPayment: number): ResultRow[] {
    const month: ResultRow[] = [];
    let balance = amount;

    for (let i = 1; i <= term; i++) {
        const now = new Date();
        const date = new Date(now.setMonth(now.getMonth() + i));
        const interest = balance * monthlyRate;
        const principal = balance > monthlyPayment - interest ? monthlyPayment - interest : balance;
        const payment = principal + interest;
        balance -= principal;

        month.push({
            index: i,
            date,
            payment,
            principal,
            interest,
            balance,
        });
    }

    return month;
}

function calculateTotal(months: ResultRow[]): ResultRow {
    return months.reduce((current, next) => ({
        ...current,
        payment: current.payment + next.payment,
        principal: current.principal + next.principal,
        interest: current.interest + next.interest,
    }));
}
