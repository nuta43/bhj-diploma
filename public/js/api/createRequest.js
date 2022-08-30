/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData= new FormData();
    let url=options.url
    
    if (options.data){
        if (options.method==='GET') {
            url+='?'+Object.entries(options.data).map(([key,value])=>`${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
        }
        else {Object.entries(options.data).forEach(v =>formData.append(...v))}
    }

    try {
        xhr.open(options.method, url);
        xhr.send(formData);       
    }
    catch (err) {
        options.callback(err, null);
    }
    xhr.responseType = 'json';
    xhr.addEventListener('readystatechange', function() {
        if (xhr.status === 200 && xhr.readyState === xhr.DONE) {           
            options.callback(null, xhr.response);       
        }
    });
}
