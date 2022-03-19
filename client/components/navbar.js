import baseUrl from 'http://localhost:5000/source/indexjs';
import createElement, { get } from "http://localhost:5000/source/create-element";
import dropdownMenu from 'http://localhost:5000/source/dropdown-menu';

const navbtns_$arr = [
    [   // constant - links
        { text: 'Home', link: `/` },
        { text: 'About us', link: `/about-us` },
        { text: 'Contact us', link: `/contact-us` },
    ],
    [   // did not logged in - links
        { text: 'Sign up', link: `/sign-up` },
        { text: 'Log in', link: `/log-in` },
    ],
    [   // logged in - links
        { text: 'Account', link: '' },
    ],
];
let pages_link='';

const navbar_$func = async (user_status = false) => {
    let btns = [
        ...navbtns_$arr[0],
        ...navbtns_$arr[ user_status ? 2 : 1 ]
    ];
    await btns.map(btn => {
        const useUrl = btn.link === '' ? '' : baseUrl + btn.link;
        pages_link += (`
            <span class="nav-links">
                <a href="${useUrl}">${btn.text}</a>
            </span>
        `);
    });

    await createElement({
        tagName: 'nav',
        cls: ['flex', 'ic', 'jcc', 'w-full'],
        inner: pages_link,
    });

    if(user_status) {
        await get('a', true)[3].addEventListener('click', e => e.preventDefault());
        await get('.nav-links', true)[3].firstElementChild.addEventListener('click', e =>{
            e.target.parentElement.lastElementChild.classList.toggle('flex');
        });

        await dropdownMenu();
    }
};
export default navbar_$func;