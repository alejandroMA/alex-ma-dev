import * as THREE from 'three'
import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import { extend, Canvas, useRender, useThree } from 'react-three-fiber'
import { useSprings, a } from 'react-spring/three'
import debounce from 'debounce'
import * as resources from './resources/index'
// Make extra stuff available as native-elements (<effectComposer />, etc.)
extend(resources)

// const number = 35
const number = 50
// const colors = ['#d79abc', '#baabda', '#9fdfcd', '#dcffcc']
// const colors = ['#f9fce1', '#d3f6f3', '#fee9b2', '#fbd1b7']
const colors = ['#dcffcc', '#d3f6f3', '#fee9b2', '#fbd1b7']
// const colors = ['#586651', '#546261', '#655d47', '#645349']
// const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff']
// const colors = ['#F04C6E', '#FFCB64', '#FF5A4C', '#AF63E6']
const random = v => {
    const r = Math.random()
    const width = v.width * 1.1
    const height = v.height * 1.1
    return {
        // position: [30 - Math.random() * 60, 30 - Math.random() * 60, 0],
        // position: [45, -30, 0],
        // position: [50 - Math.random() * 100, 30 - Math.random() * 60, 0],
        position: [
            width / 2 - Math.random() * width,
            height / 2 - Math.random() * height,
            0
        ],
        color: colors[Math.round(Math.random() * (colors.length - 1))],
        scale: [1 + r * 2.5, 1 + r * 2.5, 1],
        // scale: [1 + r * 2, 1 + r * 2, 1],
        rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)]
    }
}

function makePositions(viewport) {
    let positions = []

    for (let i = 0; i < number; i++) {
        positions.push(random(viewport))
    }

    return positions
}

function Content() {
    const { viewport, scene, gl } = useThree()

    useEffect(() => {
        gl.setClearColor(0xf9fce1, 0)
        scene.background = new THREE.Color(0xf9fce1)
    }, [gl, scene])

    const aspect = useMemo(() => viewport.width / 8, [viewport.width])

    const positionsRef = useRef(makePositions(viewport))
    const [springs, set] = useSprings(number, i => ({
        from: random(viewport),
        ...positionsRef.current[i],
        config: { mass: 20, tension: 500, friction: 200 }
    }))
    const isFirstMount = useRef(true)
    const refViewport = useRef(null)

    const resetPositions = useCallback(
        debounce(() => {
            if (refViewport.current) {
                let newPositions = makePositions(refViewport.current)
                positionsRef.current = newPositions
                set(i => ({ ...newPositions[i], delay: i * 50 }))
            }
        }, 200),
        [set]
    )

    const handleMouseEnterSpring = useCallback(
        idx => {
            set(i => {
                if (idx === i) {
                    return {
                        scale: [
                            positionsRef.current[i].scale[0] * 2,
                            positionsRef.current[i].scale[0] * 2,
                            1
                        ]
                    }
                } else {
                    return null
                }
            })
        },
        [set]
    )

    const handleMouseLeaveSpring = useCallback(
        idx => {
            set(i => {
                if (idx === i) {
                    return {
                        scale: [
                            positionsRef.current[i].scale[0],
                            positionsRef.current[i].scale[0],
                            1
                        ]
                    }
                } else {
                    return null
                }
            })
        },
        [set]
    )

    useEffect(() => {
        let interval = setInterval(() => resetPositions(), 12000)
        let isIntervalActive = true

        document.addEventListener('click', function() {
            resetPositions()
            clearInterval(interval)
            isIntervalActive = false
        })

        return () => {
            if (isIntervalActive) {
                clearInterval(interval)
            }
        }
    }, [gl.domElement, resetPositions])

    useEffect(() => {
        if (!isFirstMount.current) {
            refViewport.current = viewport
            resetPositions()
        }
        if (isFirstMount.current) {
            refViewport.current = viewport
            setTimeout(() => {
                isFirstMount.current = false
            }, 600)
        }
    }, [resetPositions, set, viewport])

    return springs.map(({ color, ...props }, index) => (
        <Box
            key={index}
            idx={index}
            color={color}
            aspect={aspect}
            onMouseEnter={handleMouseEnterSpring}
            onMouseLeave={handleMouseLeaveSpring}
            {...props}
        />
    ))
}

function Box({ idx, color, aspect, onMouseEnter, onMouseLeave, ...props }) {
    const handlePointerEnter = useCallback(() => onMouseEnter(idx), [
        idx,
        onMouseEnter
    ])
    const handlePointerLeave = useCallback(() => onMouseLeave(idx), [
        idx,
        onMouseLeave
    ])

    return (
        <a.mesh
            onPointerOver={handlePointerEnter}
            onPointerOut={handlePointerLeave}
            {...props}>
            <planeBufferGeometry
                attach="geometry"
                args={[
                    0.5 + Math.random() * aspect,
                    0.5 + Math.random() * aspect
                ]}
            />
            {/* <planeBufferGeometry attach="geometry" args={[1, 1]} /> */}
            <a.meshPhongMaterial attach="material" color={color} />
        </a.mesh>
    )
}

function Effect() {
    const composer = useRef()
    const { scene, gl, size, camera } = useThree()
    const waterPassRef = useRef(null)

    useEffect(() => {
        composer.current.setSize(size.width, size.height)
        if (waterPassRef.current) {
            let ratio = size.width / size.height

            if (ratio >= 1.5) {
                let strechRatio = 1 / (ratio / 1.6)
                waterPassRef.current.camera.left = -1
                waterPassRef.current.camera.right = 1
                waterPassRef.current.camera.top = 1 * strechRatio
                waterPassRef.current.camera.bottom = -1 * strechRatio
                // waterPassRef.current.camera.zoom = 1 / strechRatio
            } else if (ratio < 1.5 && ratio >= 1) {
                waterPassRef.current.camera.left = -1
                waterPassRef.current.camera.right = 1
                waterPassRef.current.camera.top = 1
                waterPassRef.current.camera.bottom = -1
                waterPassRef.current.camera.zoom = 1
            } else {
                let strechRatio = 1 / (ratio / 1.3)
                waterPassRef.current.camera.left = -1 / strechRatio
                waterPassRef.current.camera.right = 1 / strechRatio
                waterPassRef.current.camera.top = 1
                waterPassRef.current.camera.bottom = -1
                // waterPassRef.current.camera.zoom = 1 / ratio
            }

            waterPassRef.current.camera.updateProjectionMatrix()
        }
    }, [size.width, size.height])
    useRender(() => composer.current.render(), true)

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <waterPass attachArray="passes" factor={5} ref={waterPassRef} />
            <shaderPass
                attachArray="passes"
                args={[resources.FXAAShader]}
                material-uniforms-resolution-value={[
                    1 / (window.devicePixelRatio * size.width),
                    1 / (window.devicePixelRatio * size.height)
                ]}
                renderToScreen
            />
        </effectComposer>
    )
}

export default function Background() {
    return (
        <Canvas
            // style={{ background: '#A2CCB6' }}
            // invalidateFrameloop
            // style={{ background: '#f9fce1' }}
            pixelRatio={window.devicePixelRatio}
            camera={{ position: [0, 0, 30] }}>
            <ambientLight intensity={1} />
            <Effect />
            <Content />
        </Canvas>
    )
}
