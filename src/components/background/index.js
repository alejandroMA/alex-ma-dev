import React from 'react'
import Loadable from '@loadable/component'
const Bakcground = Loadable(() => import('./backgroud'))
// const Bakcground = lazy(() => import('./backgroud'))

export default function BackgroundLoader() {
    // const isSSR = typeof window === 'undefined'

    return (
        <div className="backgound-canvas">
            <Bakcground />
            {/* {!isSSR && (
                <Suspense fallback={null}>
                    <Bakcground />
                </Suspense>
            )} */}
        </div>
    )
}
