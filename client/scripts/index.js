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
    { url: '/contact-us',pageContent: contactUsPage_$html, },
    { url: '/about-us', pageContent: aboutUsPage_$html, },
    { url: '/sign-up', pageContent: signUp_$html, },
    { url: '/log-in', pageContent: logIn_$html, }
];
// get user id from cookies
const cookie = document.cookie;
const userId = cookie.slice(cookie.indexOf('=')+1, cookie.length);
export { userId };

(async () => {
    let userExist = false;

    if(cookie !== '') {
        console.log(cookie);
        await fetch(`${baseUrl}/api/users/${userId}`)
        .then(res => {
            if (res.status === 200) return userExist = true;
            else return userExist = false;
        });
    }
    
    await navbar_$func(userExist);

    await pages_$html.forEach(value => {
        if (`${baseUrl}${value.url}` === window.location.href) {
            createElement({
                tagName: 'main',
                inner: value.pageContent
            });
        }
    });

    await createElement({
        tagName: 'footer',
        cls: ['jce', 'flex', 'ic'],
        inner: (`
            <span>Designed and Developed by <i>Erfan Gharib</i></span>
            <span>All Rights Reserved 2022-2021©</span>
        `)
    });

    const submitBtn_$dom = document.querySelector('#submit-btn');
    let showPassInner = 'show';

    if (submitBtn_$dom !== null) {
        await document.querySelector('#show-pass').addEventListener('click', (e) => {
            const { target: elem } = e;
            const passInp_$dom = document.querySelector('#pass');

            if (elem.innerText === 'show') {
                showPassInner = 'hide';
                passInp_$dom.type = 'text';
            }
            else if (elem.innerText === 'hide') {
                showPassInner = 'show';
                passInp_$dom.type = 'password';
            }

            elem.removeChild(elem.firstChild);
            elem.append(showPassInner);
        });

        await submitBtn_$dom.addEventListener('click', () => {
            console.log('called');
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
                        window.location = '/';
                        break;
                }
            });
        });
    }
})();
