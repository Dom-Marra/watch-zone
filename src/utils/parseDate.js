/**
 * 
 * @param {String} date 
 */
export default function parseDate(date) {
    const MONTHS = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let dateParts = date.split('-');
    const year = dateParts[0];
    let month = MONTHS[parseInt(dateParts[1] - 1)];
    let day = dateParts[2];

    return `${month} ${day}, ${year}`;
}