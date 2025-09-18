import { Application } from "https://unpkg.com/@splinetool/runtime@1.0.70/build/runtime.js";
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);

app.load("https://prod.spline.design/0oWNOpUMZSLfUHxD/scene.splinecode").then(() => {
  let model = app.findObjectByName("keyboard") || app.scene.children[0];
  if (!model) {
    console.error("⚠️ No 3D object found in the Spline scene!");
    return;
  }

  // --- 🔑 Map of keys with their objects and links ---
  const keyMap = {
    v: {
      obj: app.findObjectByName("V"),
      link: "https://drive.google.com/file/d/1jHyEW_FDOqqb3A0LGbPQDX7RmwNdD_TU/view?usp=sharing"
    },
    n: {
      obj: app.findObjectByName("N"),
      link: "https://www.linkedin.com/in/sambhavam/" 
    },
    b: {
      obj: app.findObjectByName("B"),
      link: "https://github.com/sambhavamsharma" 
    },
    s: {
      obj: app.findObjectByName("S"),
      link: "https://drive.google.com/file/d/1dfAfMZltn0Al5cGEtVB5XwwCfu4Y9wWv/view?usp=sharing" 
    }
  };

  let lastKeyPressed = null;

  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    console.log("Key pressed:", key);

    if (keyMap[key]) {
      lastKeyPressed = key;
      console.log(`✅ ${key.toUpperCase()} pressed, waiting for Enter...`);

      // Animate key down
      if (keyMap[key].obj) {
        gsap.to(keyMap[key].obj.position, { y: keyMap[key].obj.position.y - 5, duration: 0.1 });
      }
    }

    if ((event.key === "Enter" || event.code === "Enter") && lastKeyPressed) {
      const entry = keyMap[lastKeyPressed];
      if (entry) {
        console.log(`🚀 Opening link for ${lastKeyPressed.toUpperCase()}...`);
        window.open(entry.link, "_blank");

        // Animate key back up
        if (entry.obj) {
          gsap.to(entry.obj.position, { y: entry.obj.position.y + 5, duration: 0.1 });
        }
      }
      lastKeyPressed = null;
    }
  });

  window.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (keyMap[key] && keyMap[key].obj) {
      gsap.to(keyMap[key].obj.position, { y: 0, duration: 0.2 });
    }
  });
});
