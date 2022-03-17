import { get } from 'http://localhost:8080/source/create-element';
import baseUrl from 'http://localhost:8080/source/indexjs';

const submitBtn =(submitBtn_$dom)=> {
    console.log('called');
    submitBtn_$dom.addEventListener('click', () => {
        const input_$dom = document.querySelectorAll('input');
        const err_$dom = document.querySelectorAll('.err');
    
        fetch(
            `${baseUrl}/api/users`,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: input_$dom[0].value,
                    password: input_$dom[1].value,
                })
            }
        ).then(res => res.text()).then(err_ => {
            const err = JSON.parse(err_);
    
            switch (err.id) {
                case 0:
                    err_$dom[0].innerText = err.err;
                    break;
                case 1:
                    err_$dom[1].innerText = err.err
                    break;
                case 2:
                    err_$dom[0].innerText = err.err
                    break;
    
                default:
                    err_$dom.forEach(value => value.innerText = '');
                    get('#submit-btn').disabled = true;
                    window.location = '/';
                    break;
            }
        });
    });
}
    
export default submitBtn;    