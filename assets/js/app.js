const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// 画像設定
const imgBird = new Image()
const imgGun = new Image()
imgBird.src = './assets/img/128.png'
imgGun.src = './assets/img/don.png'
// 画面設定
const canvasH = 512
const canvasW = 768

canvas.height = canvasH
canvas.width = canvasW

// キャラクター格納配列
let gameObjs = []
const crowsObj = []

// 乱数
const makeRandomNum = (max, min) => {
  const num = Math.floor(Math.random() * (max - min + 1) + min)
  return num
}

class GameObject {
  constructor(image, x, y, width, height) {
    this.image = image
    this.x = x
    this.y = y
    this.centerX = this.x + this.width / 2
    this.centerY = this.y + this.height / 2
    this.width = width
    this.height = height
    this.column = 0
    this.row = 0
    gameObjs.push(this)
  }
  // 対象との衝突差
  computedDistance(obj){
    const distX = Math.abs(obj.centerX - this.centerX)
    const distY = Math.abs(obj.centerY - this.centerY)
    console.log('distX', this.distX, 'distY', this.distY)
    return distX <= 20 && distY <= 20
  }
  // オブジェクトの真ん中算出
  calculateCenterPos() {
    this.centerX = this.x + this.width / 2
    this.centerY = this.y + this.height / 2
    console.log(this.centerX, this.centerY)
  }
  draw(image) {
    ctx.drawImage(image, this.column * this.width, this.row * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

class Bird extends GameObject {
  constructor(image, x, y, width, height) {
    super(image, x, y, width, height)
    this.frameCount = 0
    this.jumpMode = false
    this.isShooting = false
    this.isHit = false
    this.speed = 10
    this.vy = 0
    this.jumpPower = -21
    this.walkFrame = [
      // col,rowの順
      /* [col, row]
       [cpl, row] */
      [1, 0],
      [0, 0],
    ]
    this.jumpFrame = [
      [2, 0],
      [3, 0]
    ]
    this.deadFrame = [
      [2, 1],
      [3, 1]
    ]
    this.squatFrame = [
      [0, 1],
      [1, 1]
    ]
    this.currentFrame = this.walkFrame
  }
  update() {
    ctx.clearRect(0, 0, canvasW, canvasH)
    this.draw(this.image)
    this.calculateCenterPos()
    if(this.computedDistance(don)){
      console.log('hit')
    }
  }
  jump(){
    this.y -= this.speed
  }
  moveRight() {
    if (this.x < canvasW - this.width) {
      this.x += this.speed
    }
  }
  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speed
    }
  }
  moveDown() {
    this.y += this.speed
  }
}

class Gun extends GameObject{
  constructor(image, x, y, width, height){
    super(image, x, y, width, height)
    this.speed = 10
  }
  update(){
      super.draw(this.image)
      super.calculateCenterPos()
  }
}


let bird = new Bird(imgBird, 0, canvasH - 128, 128, 128)
let don = new Gun(imgGun, 300, 300, 64, 64)
console.log(bird, don)



window.onkeydown = (event) => {

  if (event.code === 'ArrowUp') {
    bird.jump()
  } else if (event.code === 'ArrowRight') {
    bird.moveRight()
  } else if (event.code === 'ArrowLeft') {
    bird.moveLeft()
  } else if (event.code === 'ArrowDown') {
    bird.moveDown()
  } else if(event.code === 'Space'){
    bird.shot()
  }
  gameObjs.forEach((gameObj) => {
    gameObj.update()
  })
}
