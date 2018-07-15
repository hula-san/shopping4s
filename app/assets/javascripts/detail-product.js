        var container, stats;

        var camera, scene, renderer;

        var geometry, objects;

        var mesh, jacket;
        var human;
        var sign = 1;
        var lon, lat, mouse = new THREE.Vector2();;
        var group = new THREE.Group();
        var raycaster = new THREE.Raycaster();
        init();
        animate();

        function init() {
            
            g = document.createElement('div');
            g.setAttribute("id", "container");

            container = document.getElementById("container");
            // document.body.appendChild(container);

            camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.2, 10000);
            camera.position.set(5, 2, 5);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xcecdc6);
            /*scene.fog = new THREE.Fog(0x000000, 1, 15000);*/

            // LIGHTS

            // LIGHTS

            var light = new THREE.HemisphereLight(0xe3eff4, 0xf5f4ee, 1);
            scene.add(light);
            
             var light = new THREE.DirectionalLight( 0xffffff, 1 );
        scene.add( light );


            scene.add(group);
            var loader = new THREE.GLTFLoader();


            loader.load("uploads/models/clo/human/glb/female1.glb", function(data) {
                human = data.scene;
                human.scale.set(0.001, 0.001, 0.001);
                human.position.set(0,-1,0);
                scene.add(human);
            });

            //RENDERER

            renderer = new THREE.WebGLRenderer({
                precision: "mediump",
                devicePixelRatio: 1,
                alpha: true,
                antialias: !0
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            
            container.appendChild(renderer.domElement);

            /*loader.load("models/clo/shirt/glb/l.glb", function(data) {
                var object = data.scene;
                object.scale.set(0.001, 0.001, 0.001);

                scene.add(object);
            });*/
            //

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableZoom = true;

            window.addEventListener('resize', onWindowResize, false);

            document.addEventListener('mousedown', onDocumentMouseDown, false);
            document.addEventListener('wheel', onDocumentMouseWheel, false);
        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }


        function MenuLoadSize(item) {
            if(human.children.length > 1){
                RemoveGarment();
            }
            switch (item.getAttribute("id")) {
                case "product-s":
                    LoadGarmentFromSize(0);
                    break;
                case "product-m":
                    LoadGarmentFromSize(1);
                    break;
                case "product-l":
                    LoadGarmentFromSize(2);
                    break;
                case "product-other":
                    break;

            }
            return false;
        }

        function RemoveGarment() {
           
                var obj = human.children[human.children.length -1];
                human.remove(obj);
            
        }

        function LoadGarmentFromSize(IndexSize) {
            var loader = new THREE.GLTFLoader();
            var modelPrefix = "models/clo/shirt/glb/";
            var direction = ["S", "M", "L"];
            var modelSuffix = ".glb";

            console.log(modelPrefix + direction[IndexSize] + modelSuffix);
            loader.load(modelPrefix + direction[IndexSize] + modelSuffix, function(data) {
                var object = data.scene;
               /* object.scale.set(0.001, 0.001, 0.001);*/

                human.add(object);
            });
        }

        function onDocumentMouseDown(event) {

            event.preventDefault();
            var x, y;

            if (event.changedTouches) {

                x = event.changedTouches[0].pageX;
                y = event.changedTouches[0].pageY;

            } else {

                x = event.clientX;
                y = event.clientY;

            }
            var rect = renderer.domElement.getBoundingClientRect();

            mouse.x = ((x - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((y - rect.top) / rect.height) * 2 + 1;

            onPointerDownPointerX = event.clientX;
            onPointerDownPointerY = event.clientY;

            onPointerDownLon = lon;
            onPointerDownLat = lat;

            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('mouseup', onDocumentMouseUp, false);
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                console.log(intersects[0].object);
            }

        }

        function onDocumentMouseMove(event) {

            lon = (event.clientX - onPointerDownPointerX) * 0.1 + onPointerDownLon;
            lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;

        }

        function onDocumentMouseUp(event) {

            document.removeEventListener('mousemove', onDocumentMouseMove, false);
            document.removeEventListener('mouseup', onDocumentMouseUp, false);

        }

        function onDocumentMouseWheel(event) {

            var fov = camera.fov + event.deltaY * 0.05;

            camera.fov = THREE.Math.clamp(fov, 10, 75);

            camera.updateProjectionMatrix();

        }

        function render() {

            renderer.clear();
            renderer.render(scene, camera);

        }

        function animate() {

            requestAnimationFrame(animate);
            render();

        }
