#####REDIRECT WITH DISCORD#####
the redirect uri for discord provider can only be configured on discord developer portal. if the production url uses something else than localhost:3000, then we must config it on discord dev portal


#####RENAMING OF useRouter from 'next/navigation'######
why does nextjs do this lmao. okay so i just replaced the name of `useRouter()` to `useNavigation()` (you can check my look at `tsconfig.json` to see the added path under `compilerOptions => path => [.../navigation.ts]`, and then the mentioned file to see me just renaming it)

#####TAILWIND CONFIG SAFELIST#####
apparently we need to add tailwind custom colors that require a variable (despite it being `as const`) to config since it doesnt see it beforehand so it just doesnt read it I guess

#####PATHS EQUIVALENT CHECKS WITH USER#####
right now if u do `useRouter().pathname`, this would be the correct way to check if the path (without queries) matches an existing route. however, i think nextjs just uses ur folder name isnt of actually checking the url, so if u did this on the users page, you would get `/[username]` literally. my current workaround is using `useRouter().asPath` but this uses queries also, unless you regex it.
no mistakes yet from this, but potentially, so be careful.