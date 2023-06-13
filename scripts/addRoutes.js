const fs = require('fs');
const path = require('path');

fs.readdir('src/client/views', (err, files) => {
    if(err) throw new Error(String(err));
    
    const noExtFilenames = (
        files
        .filter(name => name.match(/\.\w+/))
        .map(fileName => {
            let fileNameCpy = fileName.replace(/\.\w+/, ''),
                route       = '';

            if(fileNameCpy.includes('home')) route = '';
            else if(fileNameCpy.includes('404')) route = '*';
            else route = fileNameCpy;

            return {
                route,
                handler: fileNameCpy
            }
        })
    )
    const data = `
        export const routesData: { route: string, handler: { get: () => void, post?: () => void } }[] = [
            ${noExtFilenames.map(({route, handler}) => 
                `\n{ route: '/${route}', handler: require('../router/handlers/${handler}').default, }`
            )}
        ];
    `.replace(/\s{2}/g, '')

    fs.writeFile(path.join(__dirname, '../src/server/data/', 'routesData.ts'), data, (err) => {
        if(err) throw new Error(String(err));
        console.log('routes added!');
    })
});