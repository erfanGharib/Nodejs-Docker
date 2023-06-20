import { T_User } from "../../utils/ManageDBDoc";
const Handlebars = require("handlebars");

const links = (userData, signedIn): { link?: string; text?: string; }[] => {
    const signedInLinks = [
        { link: 'signout' }, 
        { text: userData?.['email'] },
    ]
    const notSignedInLinks = [
        { link: 'signin' },
        { link: 'signup' },
    ]
    const staticsLinks = [
        { link: 'aboutUs' },
        { link: 'contactUs' },
    ];

    return [
        ...(signedIn ? signedInLinks : notSignedInLinks), 
        ...staticsLinks
    ]
}

const navbarLinks = async (userData: T_User | {}, signedIn: boolean) => {
    /** pass all navbar links to handlebars layout based on @routes */
    Handlebars.registerHelper('navbarLinks', ({ data }: { data: any }) => {
        let result = '';

        links(userData, signedIn)
        .forEach(({ link = '', text }) => {
            if(text) return result += (`
                <div class="-order-1 flex space-x-2 md:ml-3 mb-3 md:mb-0 items-center">
                    <i class="ico ico-user"></i>
                    <span class="text-blue-100">${text}</span>
                </div>
            `);

            result += (`
                <a 
                    href='/${link}'
                    class="${data?.root?.title?.toLowerCase().includes(link) && 'bg-blue-700'} capitalize md:ml-3 mb-3 md:mb-0 !bg-opacity-40 !border-opacity-60 border border-blue-600 hover:bg-blue-700 text-blue-100 py-2 px-3 text-sm transition-all"
                >
                    ${text ?? link}
                </a>
            `)
        })

        return result;
    })
}

export default navbarLinks;