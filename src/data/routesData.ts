 export const routesData: { route: string, handler: () => void }[] = [{ route: '/aboutUs', handler: require('../router/handlers/aboutUs').default },
{ route: '/contactUs', handler: require('../router/handlers/contactUs').default },
{ route: '/signin', handler: require('../router/handlers/signin').default },
{ route: '/signup', handler: require('../router/handlers/signup').default } ]; 