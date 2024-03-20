function formatDate(date) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date object');
    }
    return date.toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long' ,
        year: 'numeric'
    }).replace(/\//g, ' ');
}
export default formatDate;