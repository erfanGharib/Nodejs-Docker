const fs = require('fs');
const path = require('path')

fs.readdir('src/views', (err, files) => {
    if(err) throw new Error(err);
    console.log(files);
    const noExtFilenames = files.filter(name => name.match(/\.\w+/)).map(name => 
        `'${name.replace(/\.\w+/, '')}': '/${name.replace(/\.\w+/, '')}'`
    );
    const data = `export const routesData = {${noExtFilenames.join(',\n')}};`

    fs.writeFile(path.join(__dirname, '..', 'data/', 'routesData.js'), data, (err) => {
        if(err) throw new Error(err);
        console.log('routes added!');
    })
});