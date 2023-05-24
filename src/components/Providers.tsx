'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


interface Providerprops {
    children: React.ReactNode
}

const Providers: React.FC<Providerprops> = (props) => {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}

export default Providers