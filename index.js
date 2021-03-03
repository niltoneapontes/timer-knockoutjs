function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

const start = new Sound('ring.wav');
const end = new Sound('finish.wav');

function ChronometerViewModel() {
  let self = this;
  self.time = ko.observable(0);
  self.message = ko.observable("Vamos lá");
  self.isRunning = ko.observable(false);

  let lastTimer = 0;

  self.startCount = function(data, event) {
    self.isRunning(true);
    lastTimer = self.time();
    self.message("GO!");
    start.play();

    const repeat = setInterval(() => {
      let aux = self.time() - 1;

      aux < 0 ? (
        clearInterval(repeat),
        self.isRunning(false),
        self.message("STOP!"),
        end.play()
      ) : (
        self.time(aux)
      )

    }, 1000);
  }

  self.resetCount = function(data, event) {
    self.time(0);
    self.isRunning(false);
    self.message("Vamos lá");
  }

  self.again = function(data,event) {
    self.time(0);
    setTimeout(() => {
    self.time(lastTimer);
    self.startCount();
    }, 500);
  }
};

const selector = document.querySelector('main#binding');

ko.applyBindings(new ChronometerViewModel, selector);