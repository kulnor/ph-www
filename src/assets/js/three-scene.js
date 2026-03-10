import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const container = document.getElementById('hero-canvas-container');

if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    camera.position.z = 5;

    const group = new THREE.Group();
    scene.add(group);

    // --- Neural / Data Surface ---
    const nodesCount = 60; // Clean, high-performance set
    const maxDistance = 2.2;
    const nodes = [];
    const positions = new Float32Array(nodesCount * 3);

    for (let i = 0; i < nodesCount; i++) {
        const isCore = Math.random() > 0.6;
        const radius = isCore ? 1.5 + Math.random() * 2 : 5 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        const pos = new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );

        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.003,
            (Math.random() - 0.5) * 0.003,
            (Math.random() - 0.5) * 0.003
        );

        nodes.push({ pos, velocity, isCore, originalRadius: radius, pulseOffset: Math.random() * Math.PI * 2 });
    }

    // Nodes (Knowledge Units)
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.35, // Reduced for better blending
        blending: THREE.AdditiveBlending
    });

    const nodeColors = new Float32Array(nodesCount * 3);
    for (let i = 0; i < nodesCount; i++) {
        if (nodes[i].isCore) {
            // AI Nodes - Vibrant Purple
            nodeColors[i * 3] = 0.66; // R
            nodeColors[i * 3 + 1] = 0.33; // G
            nodeColors[i * 3 + 2] = 0.97; // B #a855f7
        } else {
            // Data Nodes - Primary Blue
            nodeColors[i * 3] = 0.05; // R
            nodeColors[i * 3 + 1] = 0.64; // G
            nodeColors[i * 3 + 2] = 0.91; // B #0ea5e9
        }
    }
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(pointsMesh);

    // Metadata Connections (Semantic Web)
    const linesMaterial = new THREE.LineBasicMaterial({
        color: '#0ea5e9',
        transparent: true,
        opacity: 0.08, // Very subtle connections
        blending: THREE.AdditiveBlending
    });
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    group.add(linesMesh);

    // --- Core Sphere (Symbolizing AI Brain) ---
    const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: '#a855f7',
        wireframe: true,
        transparent: true,
        opacity: 0.02 // Barely visible core structure
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // --- Animation & Interactivity ---
    let frame = 0;
    let autoRotation = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        // Calculate normalized target rotation based on mouse position
        targetX = (e.clientX - window.innerWidth / 2) / 1000;
        targetY = (e.clientY - window.innerHeight / 2) / 1000;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        frame += 0.005;
        autoRotation += 0.0003; // Constant, slow drift

        // Smoothly interpolate mouse movement values
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Apply rotation ABSOLUTELY (auto + offset) instead of incrementing velocity
        group.rotation.y = autoRotation + mouseX;
        group.rotation.x = mouseY;

        coreMesh.rotation.y += 0.001;
        coreMesh.rotation.x += 0.0005;
        coreMesh.scale.setScalar(1 + Math.sin(frame) * 0.05);

        const currentPositions = [];
        const linePositions = [];

        for (let i = 0; i < nodesCount; i++) {
            const node = nodes[i];

            // Movement: Drift + Breathing
            node.pos.add(node.velocity);
            const breath = Math.sin(frame + node.pulseOffset) * 0.001; // Tiny breath
            node.pos.addScaledVector(node.pos, breath);

            const dist = node.pos.length();
            if (dist > 12 || dist < 1.5) {
                node.velocity.multiplyScalar(-1);
            }

            currentPositions.push(node.pos.x, node.pos.y, node.pos.z);

            // Lines: Contextual Relations
            for (let j = i + 1; j < nodesCount; j++) {
                const nodeB = nodes[j];
                const d = node.pos.distanceTo(nodeB.pos);

                if (d < maxDistance) {
                    linePositions.push(node.pos.x, node.pos.y, node.pos.z);
                    linePositions.push(nodeB.pos.x, nodeB.pos.y, nodeB.pos.z);
                }
            }
        }

        pointsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(currentPositions), 3));
        pointsGeometry.attributes.position.needsUpdate = true;

        if (linePositions.length > 0) {
            linesGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
            linesGeometry.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
