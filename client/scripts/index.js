const baseUrl = 'http://localhost:8080';
export default baseUrl;

import navbar_$func from 'http://localhost:8080/source/navbar';
import homePage_$html from 'http://localhost:8080/source/home';
import contactUsPage_$html from 'http://localhost:8080/source/contact-us';
import aboutUsPage_$html from 'http://localhost:8080/source/about-us';
import signUp_$html from 'http://localhost:8080/source/signup';
import logIn_$html from 'http://localhost:8080/source/login';
import createElement from 'http://localhost:8080/source/create-element';

const pages_$html = [
    { url: '/', pageContent: homePage_$html, },
    { url: '/contact-us', pageContent: contactUsPage_$html, },
    { url: '/about-us', pageContent: aboutUsPage_$html, },
    { url: '/sign-up', pageContent: signUp_$html, },
    { url: '/log-in', pageContent: logIn_$html, }
];

(async () => {
    await navbar_$func(false);

    await pages_$html.forEach(value => {
        if (`${baseUrl}${value.url}` === window.location.href) {
            createElement({
                tagName: 'main',
                inner: value.pageContent
            });
        }
    });

    const submitBtn_$dom = document.querySelector('button');
    let showPassInner = 'show';

    if (submitBtn_$dom !== null) {
        await document.querySelector('#show-pass').addEventListener('click', (e)=>{
            const {target: elem} = e;
            const passInp_$dom = document.querySelector('#pass');

            if(elem.innerText==='show') {
                showPassInner='hide';
                passInp_$dom.type='text';
            }
            else if(elem.innerText==='hide') {
                showPassInner='show';
                passInp_$dom.type='password';
            }

            elem.removeChild(elem.firstChild);
            elem.append(showPassInner);
        });
        
        await submitBtn_$dom.addEventListener('click', () => {
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
            ).then(res=>res.json()).then(err=>{
                const inpName = [
                    'Email must be valid', 
                    'Password length must be at least 5 characters long'
                ];
                err.forEach((value, index) => {
                    if(value.error !== undefined)
                        err_$dom[index].innerText = inpName[index];
                    else 
                        err_$dom[index].innerText = '';
                });
            });
        });
    }

    await createElement({
        tagName: 'footer',
        cls: ['jce', 'flex', 'ic'],
        inner: (`
            <span>Designed and Developed by <i>Erfan Gharib</i></span>
            <span>All Rights Reserved 2022-2021©</span>
        `)
    });
})()