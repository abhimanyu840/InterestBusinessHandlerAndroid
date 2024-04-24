interface User {
    Email: string;
    Password: string;
}

interface SignupUser extends User {
    Name: string
}

interface Payment {
    amount: number;
    date: string; // Assuming the date is a string in ISO 8601 format
}

interface Customer {
    _id: string;
    uid: string;
    cname: string;
    gname: string;
    address: string;
    pamount: number;
    paidamount: Payment[];
    paidinterest: Payment[];
    slug: string;
    date: string;
    paidtill: string;
    paidfine: Payment[];
    total: Payment[];
}
