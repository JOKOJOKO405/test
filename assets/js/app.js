const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// 画面設定
const canvasH = 512
const canvasW = 768

// canvasの設定
canvas.height = canvasH
canvas.width = canvasW

// 青とオレンジの共通項目
class GameObject {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.centerX = null
    this.centerY = null
    this.width = width
    this.height = height
  }
  // 対象との衝突差
  computedDistance(obj){
    const distX = Math.abs(obj.centerX - this.centerX)
    const distY = Math.abs(obj.centerY - this.centerY)
    console.log('distX', distX, 'distY', distY)
    if(distX <= 100 && distY <= 100){
      console.log('hit！!!！')
    } 
  }
  // オブジェクトの真ん中算出 updateの度に計算する
  calculateCenterPos() {
    this.centerX = this.x + this.width / 2
    this.centerY = this.y + this.height / 2
    console.log('centerX',this.centerX, 'centerY',this.centerY)
  }
  draw(color) {
    ctx.fillStyle = color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Blue extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height,)
    this.speed = 20 // キーイベントで進む距離
  }
  update() {
    ctx.clearRect(0, 0, canvasW, canvasH)
    this.draw('#006ede') // 青
    this.calculateCenterPos()
    if(this.computedDistance(orange)){
      console.log('オレンジにぶつかってます！！')
    }
  }
  moveRight() {
    this.x += this.speed
  }
  moveLeft() {
    this.x -= this.speed
  }
  moveDown() {
    this.y += this.speed
  }
  moveUp() {
    this.y -= this.speed
  }
}
class Orange extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height,)
    this.speed = 10 // キーイベントで進む距離
  }
  update() {
    this.draw('#ff8f00') // オレンジ
    this.calculateCenterPos()
  }
}


let blue = new Blue(240, 240, 100, 100)
let orange = new Orange(400, 150, 100, 100)

window.onkeydown = (event) => {
  if (event.code === 'ArrowUp') {
    blue.moveUp()
  } else if (event.code === 'ArrowRight') {
    blue.moveRight()
  } else if (event.code === 'ArrowLeft') {
    blue.moveLeft()
  } else if (event.code === 'ArrowDown') {
    blue.moveDown()
  }
  blue.update()
  orange.update()
}