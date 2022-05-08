let backendUrl = 'http://127.0.0.1:8000';

let prettifyDate = (uglyDate) => {
    let date = uglyDate.substr(0, 10);
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);
    return day + "." + month + "." + year;
}

export {
    prettifyDate, backendUrl
}