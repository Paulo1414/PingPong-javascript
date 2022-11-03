//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let velocidadeXBolinha = 9;
let velocidadeYBolinha = 9;
let raio = diametro / 2;

//sons jogo
let raquetada;
let ponto;
let trilha;

//chance de errar
let chanceDeErrar = 0;


//pontuacao
let meusPontos = 0;
let pontosOponente = 0;

//variaveis raquete oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let raqueteComprimentoOponente = 10
let raqueteAlturaOponente = 90
let velocidadeYOponente;

//variaveis da raquete
let xRaquete = 5
let yRaquete = 150
let raqueteComprimento = 10
let raqueteAltura = 90

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha()
   movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoBolinha();
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPontos();
  bolinhaNaoFicaPresa();
  
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 20
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 20
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaBolinha(){
   xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

function verificaColisaoBorda(){
    if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1; 
  }
 if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
  
}

function mostrarRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}



function mostraBolinha(){
circle(xBolinha, yBolinha, diametro);
}

function movimentaMinhaRaquete()
{
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
}

function verificaColisaoBolinha(){
  if(xBolinha - raio <xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function verificaColisaoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluirPlacar(){
  textAlign(CENTER)
  textSize(16)
  fill(color(255,140,0))
  rect(258, 10,40,20)
  fill(255)
  text(meusPontos, 278, 26);
  fill(color(255,140,0))
  rect(300, 10,40,20)
  fill(255)
  text(pontosOponente, 321, 26);
}


function marcaPontos(){
  if(xBolinha > 590){
    meusPontos += 1
    ponto.play();
  }if(xBolinha < 10){
    pontosOponente += 1
    ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
