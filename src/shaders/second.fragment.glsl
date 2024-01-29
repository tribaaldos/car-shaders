varying vec3 v_position;

float rect(vec2 pt, vec2 size, vec2 center) {
    vec2 p = pt - center;
    vec2 halfsize = size * 0.5;

    float( (v_position.x > 0.0) && (v_position.x < 1.0) && (v_position.y > 0.0) && (v_position.y < 1.0) );
    return 1.0;
}
void main(void) {
    float inRect = rect(v_position.xy, vec2(1.0), vec2(0.0));

    vec3 color = vec3(1.0, 0.0, 0.0) * inRect;

    gl_FragColor = vec4(color, 1.0);
}