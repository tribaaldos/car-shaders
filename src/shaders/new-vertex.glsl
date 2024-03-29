varying vec2 vUv;

void main()
{
    // vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);
    // vec4 viewPosition = viewMatrix * modelPosition;
    // vec4 projectionPosition = projectionMatrix * viewPosition;

    // gl_Position = projectionPosition;

    // vUv = uv;
    vUv = uv;
    vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}