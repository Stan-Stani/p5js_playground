let branchesToDraw = 0

function setup() {
  createCanvas(400, 400)
  colorMode(HSB)
  angleMode(DEGREES)
  background(0)
  frameRate(30)
  describe(
    "A tree drawn by recursively drawing branches, with angle determined by the user mouse position."
  )
}

function draw() {
  angle = (mouseX / width) * 90
  // angle = 90

  // Increase branches to draw each frame
  branchesToDraw = floor(frameCount / 2)

  // Redraw the tree with the current number of branches
  background(0)

  // Display frame count
  fill(255)
  noStroke()
  textSize(16)
  textAlign(LEFT, TOP)
  text(`Frame: ${frameCount}`, 10, 10)
  text(`Branches: ${branchesToDraw}`, 10, 30)

  translate(width / 2, height)
  stroke(0, 255, 255)
  line(0, 0, 0, -120)
  translate(0, -120)

  let drawn = { count: 0, currentDepth: 0 }
  branch(120, 0, drawn)

  // Display current depth reached
  push()
  resetMatrix()
  fill(255)
  noStroke()
  text(`Current Depth: ${drawn.currentDepth}`, 10, 50)
  pop()
}

function branch(h, level, drawn) {
  // Stop if we've drawn enough branches for this frame
  if (drawn.count >= branchesToDraw) {
    return
  }

  drawn.count++
  drawn.currentDepth = level

  stroke(level * 25, 255, 255)
  h *= 0.66

  if (h > 2) {
    push()
    rotate(angle)
    line(0, 0, 0, -h)
    translate(0, -h)
    branch(h, level + 1, drawn)
    pop()

    push()
    rotate(-angle)
    line(0, 0, 0, -h)
    translate(0, -h)
    branch(h, level + 1, drawn)
    pop()
  }
}
