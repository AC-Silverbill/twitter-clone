#####REDIRECT WITH DISCORD#####
the redirect uri for discord provider can only be configured on discord developer portal. if the production url uses something else than localhost:3000, then we must config it on discord dev portal


#####RENAMING OF useRouter from 'next/navigation'######
why does nextjs do this lmao. okay so i just replaced the name of `useRouter()` to `useNavigation()` (you can check my look at `tsconfig.json` to see the added path under `compilerOptions => path => [.../navigation.ts]`, and then the mentioned file to see me just renaming it)