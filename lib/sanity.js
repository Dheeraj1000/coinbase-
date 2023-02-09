import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '5z5rwjl7',
  dataset: 'production',
  apiVersion: '2022-12-15', // use current UTC date - see "specifying API version"!
  token:
    'skWUohpKBvn8zVmaj04aBY9iB8Zo0fmI0g5IsUPcVMrGybmsEoUeTPpryyLXlJvf5ET1Z6RYWo9KjE72kHw7jzYuhU713EccmkcQUo57tM5zVEuGlvsrXSBYCfhEVPrCVfyuCeHmMSzznY67okwOdgYfBwInymCHGlKca8qUqZOlBftBW7MD', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})
