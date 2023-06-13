 export const routesData: { route: string, handler: { get: () => void, post?: () => void } }[] = [{ route: '/403', handler: require('../router/handlers/403').default, },
 { route: '/aboutUs', handler: require('../router/handlers/aboutUs').default, },
 { route: '/contactUs', handler: require('../router/handlers/contactUs').default, },
 { route: '/', handler: require('../router/handlers/home').default, },
 { route: '/signin', handler: require('../router/handlers/signin').default, },
 { route: '/signup', handler: require('../router/handlers/signup').default, },
 { route: '/*', handler: require('../router/handlers/404').default, }, ]; 