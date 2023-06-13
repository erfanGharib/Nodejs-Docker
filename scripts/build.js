const fs = require('fs-extra');
const path = require('path');

const includedFoldersName = [
    'components',
    'assets',
    'views'
]
try {
    includedFoldersName.forEach(folder => {
        fs.copy(
            path.join(__dirname, `../src/client/${folder}`),
            path.join(__dirname, `../dist/client/${folder}`),
            (err) => {
                if (err) throw new Error(String(err));
            }
        )
    })
    console.log('Build Complete');
}
catch (err) {
    throw new Error(err);
}