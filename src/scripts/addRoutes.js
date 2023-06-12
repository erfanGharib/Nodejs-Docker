const fs = require('fs');
const path = require('path')

fs.readdir('src/views', (err, files) => {
    if(err) throw new Error(err);
    
    const noExtFilenames = (
        files
        .filter(name => name.match(/\.\w+/) && !name.includes('home') && !name.includes('404'))
        .map(name => name.replace(/\.\w+/, ''))
    )
    const data = `
        export const routesData: { route: string, handler: () => void }[] = [
            ${noExtFilenames.map(name => 
                `\n{ route: '/${name}', handler: require('../router/handlers/${name}').default }`
            )}
        ];
    `.replace(/\s{2}/g, '')

    fs.writeFile(path.join(__dirname, '..', 'data/', 'routesData.ts'), data, (err) => {
        if(err) throw new Error(err);
        console.log('routes added!');
    })
});