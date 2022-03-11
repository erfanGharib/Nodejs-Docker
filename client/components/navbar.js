import createElement from "http://localhost:8080/source/create-element";
import baseUrl from 'http://localhost:8080/source/indexjs';
const navbtns_$arr = [
    [   // constant links
        { text: 'Home', link: '/', },
        { text: 'About us', link: '/about-us', },
        { text: 'Contact us', link: '/contact-us', },
    ],
    [   // did not logged in links
        { text: 'Sign up', link: '/sign-up', },
        { text: 'Log in', link: '/log-in', },
    ],
    [   // logged in links
        { text: 'Log Out', link: '', },
    ],
];
let pages_link='';

const navbar_$func = (user_status = false) => {
    let btns = [
        ...navbtns_$arr[0],
        ...navbtns_$arr[ user_status ? 2 : 1 ]
    ];
    btns.map(btn => {
        pages_link += (`
            <a class="nav-links" href="${baseUrl}${btn.link}">${btn.text}</a>
        `);
    });
    createElement({
        tagName: 'nav',
        cls: ['flex', 'ic', 'jcc', 'w-full'],
        inner: pages_link,
    });
};
export default navbar_$func;