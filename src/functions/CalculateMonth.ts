
export const calculateMonth = (paidtill: string): number => {

    const today = new Date();
    const paidTill = new Date(paidtill);
    // Calculate the difference in milliseconds between today and paidTill
    const differenceMs = today.getTime() - paidTill.getTime();
    // Calculate the number of milliseconds in a month (approximately 30 days)
    const monthMs = 30 * 24 * 60 * 60 * 1000;
    // Calculate the total months between paidTill and today
    const totalMonths = Math.floor(differenceMs / monthMs);
    return totalMonths
}