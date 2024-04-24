

export const calculateInterest = (month: number, principleAmount: number, rate: number): number => {
    let interest = (principleAmount * rate * month) / 100
    return interest;
};
