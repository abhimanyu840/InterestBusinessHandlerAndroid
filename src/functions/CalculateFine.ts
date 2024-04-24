
export const calcFine = (month: number, interest: number): number => {
    let fine = 0;
    for (let i = 1; i < month; i++) {
        fine += (interest * 10 * i) / 100
    }
    return fine;
}