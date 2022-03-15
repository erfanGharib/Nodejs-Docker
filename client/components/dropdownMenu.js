import createElement, { get } from "http://localhost:8080/source/create-element";
import baseUrl, { userId } from 'http://localhost:8080/source/indexjs';

const accountBtnsFunc = [
    () => {
        console.log('user logged out');
        const cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        
        window.location.reload();
    },
    () => {
        console.log('delete account');
        const userConfirm = confirm('Are you sure you want to delete your account?');
        if (userConfirm) {
            fetch(
                `${baseUrl}/api/users`,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify([userId])
                }
            )
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
        value.addEventListener('click', ()=> accountBtnsFunc[index]() );
    });
}
export default dropdownMenu;