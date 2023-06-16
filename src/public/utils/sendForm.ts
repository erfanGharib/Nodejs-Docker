type T_FormErrObj = {
    err: boolean,
    msg: string
}

// goal: validate input for not being empty
export const sendForm = (e: MouseEvent, url: string) => {
    e.preventDefault();

    let initErr = {
        err: false,
        msg: null
    };
    let err: T_FormErrObj = initErr;
    const data = {};

    const disableSubmitBtn = () => {
        document.querySelector('button#submitBtn').setAttribute(
            'disabled',
            String(Boolean(!err))
        )
    }

    // gather all input values and datas
    const inputValues: Array<Array<any>> = Object.entries(e.target);

    const IS_DATA_VALID = (
        inputValues
            .map(([_, element]) => {
                if ((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
                    data[element?.name] = element?.value;

                    return element;
                }
                return undefined;
            })
            .filter(v => v !== undefined)
            .every(element => {
                if (element?.required === true) {
                    return (
                        element?.value !== null &&
                        element?.value !== ''
                    )
                }
                else {
                    return true;
                }
            })
    );

    // generate error on validation
    err = {
        err: !IS_DATA_VALID,
        msg: !IS_DATA_VALID ? 'Please Fill Out the Form' : null
    };

    // post data if no error occurred
    if (IS_DATA_VALID) {
        fetch(url, {
            method: 'post',
            body: JSON.stringify({ data }),
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            ?.then((res: Response) => res.json())
            ?.then((data) => {
                console.log(data);
                
                err = {
                    err: !data.ok,
                    msg: data.message
                };

                data.ok &&
                setTimeout(() => {
                    err = initErr;
                    window.location.reload();
                }, 4000)
            })
            ?.catch((res) => {
                err = res.response?.data?.message ?? res.response?.statusText;
                disableSubmitBtn();
            })
            ?.finally(() => {
                const errElement = document.querySelector('.err');
                errElement.innerHTML = err.msg;
                errElement.setAttribute(
                    'style',
                    `color: ${err.err ? 'rgb(220 38 38)' : 'rgb(22 163 74)'}`
                )
            })

            disableSubmitBtn();
    }
}