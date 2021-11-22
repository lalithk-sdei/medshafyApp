export const ValidateEmail = (mail) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,4}$/.test(mail)) {
        return true;
    } else {
        return false;
    }
}

export const chargecutoff = (pcent, subtotal) => {
    return +((subtotal / 100) * pcent).toFixed(2);
}


export const getTotalAmt = (total, shipping, vat) => {
    return (total + chargecutoff(shipping, total) + chargecutoff(vat, total)).toFixed(2);
}

