const VERT = `
  attribute vec4 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec3 vLighting;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;

    // Apply lighting effect
    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
  }
`;

const FRAG = `
  varying highp vec3 vLighting;
  void main() {
    gl_FragColor = vec4(vLighting, 1.0);
  }
`;

let rotate_X = 1.0; //
let rotate_Y = 1.0; //
let rotate_Z = 1.0; //

const EVENT = 'deviceorientation';
window.addEventListener(EVENT, function (event) {
  console.log(event);
  alpha = Math.round(event.alpha);
  beta = Math.round(event.beta);
  gamma = Math.round(event.gamma);
  rotate_X = alpha;
  rotate_Y = beta;
  rotate_Z = gamma;
});

//start
main();

function getProgramInfo(shaderProgram, gl) {
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    }
  };
}

/**
 * main function - draws magic and makes me cry
 */
function main() {
  const selector = '#glcanvas';
  const contextId = 'webgl';
  const canvas = document.querySelector(selector);
  const gl = canvas.getContext(contextId);

  const shaderProgram = initShaderProgram(gl, VERT, FRAG);
  const programInfo = getProgramInfo(shaderProgram, gl);
  const fig = makeFigBuff(gl);

  function render() {
    draw(gl, programInfo, fig);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function processSegments(num_rings, num_segments, indices) {
  let o = 0;
  for (let i = 1; i < num_rings; ++i) {
    for (let j = 0; j < i * num_segments; ++j) {
      indices.push(j);
      indices.push(j + 1 + num_segments);
      indices.push(j + 2 + num_segments);

      indices.push(j);
      indices.push(j + 2 + num_segments);
      indices.push(j + 1);
    }
    o += num_segments;
  }
}

function assembleBuffs(gl, positions, vertexNormals, textureCoordinates, indices) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
    gl.STATIC_DRAW);
  const tCordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tCordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
    gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  return {positionBuffer, normalBuffer, tCordBuffer, indexBuffer};
}

/**
 * variant 4 - Holovachuk Stanislav - Richmond Minimal Surface
 * @param num_rings
 * @param num_segments
 * @param textureCoordinates
 * @param radius
 * @param pi
 * @param positions
 * @param vertexNormals
 * @returns {{textureCoordinates, vertexNormals, positions}}
 */
function richmondSurf(num_rings, num_segments, textureCoordinates, radius, pi, positions, vertexNormals) {
  for (let i = 0; i <= num_rings; ++i) {
    for (let j = 0; j <= num_segments; ++j) {
      let u = i / num_rings;
      let v = (j + u) / num_segments;
      textureCoordinates = textureCoordinates.concat([u, v]);

      // Compute angles
      let u_angle = u * 4 * Math.PI;
      let v_angle = v * 2 * Math.PI;

      let rho = (1 + 3 * radius) * u - 2 - radius;
      const u1 = Math.exp(rho) * Math.cos(2 * pi * v);
      const v1 = Math.exp(rho) * Math.sin(2 * pi * v);

      let x = -u1 / (u1 * u1 + v1 * v1) - u1 * u1 * u1 / 3 + u1 * v1 * v1;
      let y = -v1 / (u1 * u1 + v1 * v1) - u1 * u1 * v1 + v1 * v1 * v1 / 3;
      let z = 2 * u1;

      positions = positions.concat([x / 5, y / 5, z / 5]);

      // Normal
      let nx = Math.cos(u_angle) * Math.cos(v_angle);
      let ny = Math.sin(u_angle) * Math.cos(v_angle);
      let nz = Math.sin(v_angle);

      vertexNormals = vertexNormals.concat(nx, ny, nz);
    }
  }
  return {textureCoordinates, positions, vertexNormals};
}

/**
 * buffers
 * @param gl
 * @returns {{normal: AudioBuffer | WebGLBuffer, indices: AudioBuffer | WebGLBuffer, size: number, position: AudioBuffer | WebGLBuffer, textureCoord: AudioBuffer | WebGLBuffer}}
 */
function makeFigBuff(gl) {
  const pi = Math.PI;
  const radius = 0.5;
  const vStep = Math.PI * 6 / 180;
  const phiStep = Math.PI * 6 / 180;

  let positions = [];
  let textureCoordinates = [];
  let vertexNormals = [];
  let indices = [];

  let num_rings = 4 * Math.PI / phiStep;
  let num_segments = 2 * Math.PI / vStep;
  const richmondSurface = richmondSurf(num_rings, num_segments, textureCoordinates, radius, pi, positions, vertexNormals);

  textureCoordinates = richmondSurface.textureCoordinates;
  positions = richmondSurface.positions;
  vertexNormals = richmondSurface.vertexNormals;

  processSegments(num_rings, num_segments, indices);

  const {
    positionBuffer,
    normalBuffer,
    tCordBuffer,
    indexBuffer
  } = assembleBuffs(gl, positions, vertexNormals, textureCoordinates, indices);

  return {
    position: positionBuffer,
    normal: normalBuffer,
    textureCoord: tCordBuffer,
    indices: indexBuffer,
    size: indices.length
  };
}

function dtg(v) {
  return v * Math.PI / 180;
}

// 1 - 360
// х - V
function maptovan(v) {
  return 1 * v / 360;
}

function pointer1(gl, buffers, programInfo) {
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);
  }
}

function pointer2(gl, buffers, programInfo) {
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.textureCoord);
  }
}

function pointer3(gl, buffers, programInfo) {
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexNormal,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexNormal);
  }
}

/**
 * draw
 * @param gl
 * @param programInfo
 * @param buffers
 */
function draw(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 45 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.01;
  const zFar = 200.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar);

  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix,
    modelViewMatrix,
    [0.0, 0.0, -6.0]);

  mat4.rotate(modelViewMatrix,
    modelViewMatrix,
    dtg(rotate_Z),
    [0, 0, 1]);
  mat4.rotate(modelViewMatrix,
    modelViewMatrix,
    dtg(rotate_X),
    [0, 1, 0]);
  mat4.rotate(modelViewMatrix,
    modelViewMatrix,
    dtg(rotate_Y),
    [1, 0, 0]);

  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  pointer1(gl, buffers, programInfo);
  pointer2(gl, buffers, programInfo);
  pointer3(gl, buffers, programInfo);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.normalMatrix,
    false,
    normalMatrix);

  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  {
    const vertexCount = buffers.size;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}

/**
 * init
 * @param gl
 * @param vsSource
 * @param fsSource
 * @returns {WebGLProgram}
 */
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  return shaderProgram;
}

/**
 * load
 * @param gl
 * @param type
 * @param source
 * @returns {WebGLShader}
 */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}