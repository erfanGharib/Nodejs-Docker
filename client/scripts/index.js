const baseUrl = 'http://localhost:8080';
export default baseUrl;

import navbar_$func from 'http://localhost:8080/source/navbar';
import homePage_$html from 'http://localhost:8080/source/home';
import contactUsPage_$html from 'http://localhost:8080/source/contact-us';
import aboutUsPage_$html from 'http://localhost:8080/source/about-us';
import signUp_$html from 'http://localhost:8080/source/signup';
import logIn_$html from 'http://localhost:8080/source/login';
import createElement, { get } from 'http://localhost:8080/source/create-element';
import showPass from 'http://localhost:8080/source/show-pass';
import submitBtn from 'http://localhost:8080/source/submit-btn';

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
let userExist = false;

export { userId };

(async () => {
    if(cookie !== '') {
        await fetch(`${baseUrl}/api/users/${userId}`)
        .then(res => {
            if (res.status === 200) return userExist = true;
            else return userExist = false;
        });
    }
    
    await navbar_$func(userExist);

    await pages_$html.forEach(value => {
        if (
            (
                location.href === `${baseUrl}/sign-up` || 
                location.href === `${baseUrl}/log-in`
            ) &&
            userExist !== false
        ) {
            location.href = '/403';
        }
        else if (`${baseUrl}${value.url}` === window.location.href) {
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
    if (submitBtn_$dom !== null) {
        let isSignupPage = location.href === `${baseUrl}/sign-up` ? 'sign-up' : 'log-in';
        await showPass();
        await submitBtn(submitBtn_$dom, isSignupPage);
    }
})();
