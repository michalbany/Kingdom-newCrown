import Player from "../entities/Player";

export function renderGameUI(
  context: CanvasRenderingContext2D,
  player: Player,
  deltaTime: number
) {
  const padding = 10;
  const barWidth = 200;
  const barHeight = 20;

  // Render FPS
  context.fillStyle = "white";
  context.font = "15px Arial";
  context.fillText(`FPS: ${Math.round(1 / deltaTime)}`, 10, 120);

  

  // Render entity name
  context.fillStyle = "white";
  context.font = "15px Arial";
  context.fillText(`Entity: ${player.name}`, padding, padding + 15);

  // Render health bar
  renderBar(
    padding,
    padding + 30,
    barWidth,
    barHeight,
    player.currentHealth,
    player.baseHealth,
    "Health",
    "red",
    context
  );

  // Render energy bar
  renderBar(
    padding,
    padding + 60,
    barWidth,
    barHeight,
    player.currentEnergy,
    player.baseEnergy,
    "Energy",
    "blue",
    context
  );
}

function renderBar(
  x: number,
  y: number,
  width: number,
  height: number,
  current: number,
  max: number,
  label: string,
  color: string,
  context: CanvasRenderingContext2D
) {
  // Draw background
  context.fillStyle = "rgba(0,0,0,0.5)";
  context.fillRect(x, y, width, height);

  // Draw fill
  const fillWidth = (current / max) * width;
  context.fillStyle = color;
  context.fillRect(x, y, fillWidth, height);

  // Draw border
  context.strokeStyle = "white";
  context.strokeRect(x, y, width, height);

  // Draw text
  context.fillStyle = "white";
  context.font = "12px Arial";
  context.fillText(`${label}: ${current}/${max}`, x + 5, y + height - 5);
}
