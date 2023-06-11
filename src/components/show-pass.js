const showPass =()=> {
    let showPassInner = 'show';

    document.querySelector('#show-pass').addEventListener('click', (e) => {
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
}
export default showPass;