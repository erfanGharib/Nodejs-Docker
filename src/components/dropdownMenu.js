import createElement, { get } from '../scripts/createElement.js';
import baseUrl, { userId } from '../scripts/index.js';

const deleteAllCookies =()=> {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

const accountBtnsFunc = [
    () => {
        console.log('user logged out');
        deleteAllCookies();
        window.location.reload();
    },

    () => {
        console.log('delete account');
        const userConfirm = confirm('Are you sure you want to delete your account?');
        if (userConfirm) {
            fetch(`${baseUrl}/api/users/${userId}`, { method: 'delete' })
            .then(res => {
                if(res.status === 200) {
                    alert('Your account deleted succesfully');
                    deleteAllCookies();
                    return location.href = '/';
                }
                else return console.log(res);
            });
        }
    }
];

const dropdownMenu =()=> {
    createElement({
        target:'.nav-links',
        targetIndex:3,
        id: 'navbar-dropdown',
        cls: ['hidden', 'ic', 'jcb', 'col', 'w-full'],
        inner: (`
            <button class='w-full account'>Log out</button>
            <button class='w-full account'>Delete account</button>
        `)
    });
    get('.account', true).forEach((value, index) => {
        value.addEventListener('click', ()=> accountBtnsFunc[index]());
    });
}
export default dropdownMenu;