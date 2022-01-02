/**
 * Blur Shader
 * 
 taken from https://github.com/Jam3/glsl-fast-gaussian-blur

 */

let BlurShader = {
    uniforms: {
        byp: { value: 0 }, //apply the glitch ?
        texture: { type: 't', value: null },
        time: { type: 'f', value: 0.0 },
        factor: { type: 'f', value: 0.0 },
        resolution: { type: 'v3', value: null }
    },

    vertexShader: [
        `precision mediump float;

        attribute vec2 position;
        
        void main() {
            gl_Position = vec4(position, 1, 1);
        }`
    ].join('\n'),

    fragmentShader: [
        `precision highp float;

        uniform vec3 iResolution;
        uniform sampler2D iChannel0;
        uniform bool flip;
        uniform vec2 direction;
        
        vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
            vec4 color = vec4(0.0);
            vec2 off1 = vec2(1.3846153846) * direction;
            vec2 off2 = vec2(3.2307692308) * direction;
            color += texture2D(image, uv) * 0.2270270270;
            color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
            color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
            color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
            color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
            return color;
        }
        
        void main() {
            vec2 uv = vec2(gl_FragCoord.xy / iResolution.xy);
            if (flip) {
            uv.y = 1.0 - uv.y;
            }
        
            gl_FragColor = blur(iChannel0, uv, iResolution.xy, direction);
        }`
    ].join('\n')
}

export { BlurShader }
