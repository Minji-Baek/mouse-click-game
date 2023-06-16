import App from "./mouse-over-mini-game/js/App.js"

const app = new App()

window.addEventListener('load', () => {
  app.init()
  app.render()
})