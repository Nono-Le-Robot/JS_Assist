var noise = new SimplexNoise();
// var audio = new Audio("/media/audio.wav"); //"/media/The-Stars.mp3"
var play = false;

const edgeBrowser = navigator.userAgent.includes("Edg");
const chromeBrwoser = navigator.userAgent.includes("Chrome");

if (edgeBrowser || chromeBrwoser) {
  if (navigator.brave || navigator.userAgent.includes("OPR")) {
    alert("only work on chrome or edge.");
    document.body.style.display = "none";
  }
  startViz();
} else {
  alert("only work on chrome or edge.");
  document.body.style.display = "none";
}

function startViz() {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        deviceId: "default",
        googAutoGainControl: "true",
        googEchoCancellation: "false",
        googNoiseSuppression: "false",
        googHighpassFilter: "false",
      },
    })
    .then((stream) => {
      //audio anayser setup
      var audioContext = new AudioContext();
      var src = audioContext.createMediaStreamSource(stream);
      var analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      src.connect(analyser);
      //   analyser.connect(audioContext.destination);
      analyser.fftSize = 512;
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);

      //webgl
      var scene = new THREE.Scene();
      var group = new THREE.Group();
      var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 100;
      scene.add(camera);

      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x0000ff, 0);
      const rightSide = document.getElementById("right-side");

      rightSide.appendChild(renderer.domElement);

      var geometry = new THREE.IcosahedronGeometry(30, 1);
      var wireframe = new THREE.EdgesGeometry(geometry);
      //var material = new THREE.MeshLambertMaterial({ color: 0x383838, wireframe: true });

      var material = new THREE.ShaderMaterial({
        uniforms: {
          color1: {
            value: new THREE.Color("#ffffff"),
          },
          color2: {
            value: new THREE.Color("#3d3d3d"),
          },
        },
        vertexShader: `
          varying vec2 vUv;
      
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          
          varying vec2 vUv;
          
          void main() {
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
          }
        `,
        wireframe: true,
      });

      var ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);

      var ball = new THREE.Mesh(geometry, material);
      ball.position.set(0, 0, 0);

      group.add(ball);
      scene.add(group);

      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });

      function render() {
        analyser.getByteFrequencyData(dataArray);

        var lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
        var upperHalfArray = dataArray.slice(
          dataArray.length / 2 - 1,
          dataArray.length - 1
        );

        var overallAvg = avg(dataArray);
        var lowerMax = max(lowerHalfArray);
        var lowerAvg = avg(lowerHalfArray);
        var upperMax = max(upperHalfArray);
        var upperAvg = avg(upperHalfArray);

        var lowerMaxFr = lowerMax / lowerHalfArray.length;
        var lowerAvgFr = lowerAvg / lowerHalfArray.length;
        var upperMaxFr = upperMax / upperHalfArray.length;
        var upperAvgFr = upperAvg / upperHalfArray.length;

        ball.rotation.x += 0.001;
        ball.rotation.y += 0.005;
        ball.rotation.z += 0.002;

        WarpBall(
          ball,
          modulate(Math.pow(lowerMaxFr, 2), 0, 6, 0, 8),
          modulate(upperAvgFr, 0, 1, 0, 4)
        );

        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }

      function WarpBall(mesh, bassFr, treFr) {
        mesh.geometry.vertices.forEach(function (vertex, i) {
          var offset = mesh.geometry.parameters.radius;
          var amp = 10;
          var time = window.performance.now();
          vertex.normalize();
          var rf = 0.00001;
          var distance =
            offset +
            bassFr +
            noise.noise3D(
              vertex.x + time * rf * 6,
              vertex.y + time * rf * 7,
              vertex.z + time * rf * 8
            ) *
              amp *
              treFr;
          vertex.multiplyScalar(distance);
        });
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
      }

      render();
    })
    .catch((err) => {
      // always check for errors at the end.
      console.error(`${err.name}: ${err.message}`);
      alert("Stream generation failed.");
    });
}

//helper functions
function fractionate(val, minVal, maxVal) {
  return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
  var fr = fractionate(val, minVal, maxVal);
  var delta = outMax - outMin;
  return outMin + fr * delta;
}

function avg(arr) {
  var total = arr.reduce(function (sum, b) {
    return sum + b;
  });
  return total / arr.length;
}

function max(arr) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}
