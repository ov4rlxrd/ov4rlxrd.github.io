"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sprite =
/*#__PURE__*/
function () {
  function Sprite(_ref) {
    var position = _ref.position,
        imageSrc = _ref.imageSrc,
        _ref$scale = _ref.scale,
        scale = _ref$scale === void 0 ? 1 : _ref$scale,
        _ref$framesMax = _ref.framesMax,
        framesMax = _ref$framesMax === void 0 ? 1 : _ref$framesMax,
        _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? {
      x: 0,
      y: 0
    } : _ref$offset;

    _classCallCheck(this, Sprite);

    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.freamesElapsed = 0;
    this.framesHold = 7;
    this.offset = offset;
  }

  _createClass(Sprite, [{
    key: "draw",
    value: function draw() {
      c.drawImage(this.image, this.framesCurrent * (this.image.width / this.framesMax), 0, this.image.width / this.framesMax, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y, this.image.width / this.framesMax * this.scale, this.image.height * this.scale);
    }
  }, {
    key: "animateFrames",
    value: function animateFrames() {
      this.freamesElapsed++;

      if (this.freamesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++;
        } else {
          this.framesCurrent = 0;
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.animateFrames();
    }
  }]);

  return Sprite;
}();

var Fighter =
/*#__PURE__*/
function (_Sprite) {
  _inherits(Fighter, _Sprite);

  function Fighter(_ref2) {
    var _this;

    var position = _ref2.position,
        velocity = _ref2.velocity,
        _ref2$color = _ref2.color,
        color = _ref2$color === void 0 ? 'red' : _ref2$color,
        imageSrc = _ref2.imageSrc,
        _ref2$scale = _ref2.scale,
        scale = _ref2$scale === void 0 ? 1 : _ref2$scale,
        _ref2$framesMax = _ref2.framesMax,
        framesMax = _ref2$framesMax === void 0 ? 1 : _ref2$framesMax,
        _ref2$offset = _ref2.offset,
        offset = _ref2$offset === void 0 ? {
      x: 0,
      y: 0
    } : _ref2$offset,
        sprites = _ref2.sprites,
        _ref2$attackBox = _ref2.attackBox,
        attackBox = _ref2$attackBox === void 0 ? {
      offset: {},
      width: undefined,
      height: undefined
    } : _ref2$attackBox;

    _classCallCheck(this, Fighter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Fighter).call(this, {
      imageSrc: imageSrc,
      scale: scale,
      framesMax: framesMax,
      offset: offset
    }));
    _this.position = position;
    _this.velocity = velocity;
    _this.height = 150;
    _this.width = 50;
    _this.lastKey;
    _this.attackBox = {
      position: {
        x: _this.position.x,
        y: _this.position.y
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
    };
    _this.color = color;
    _this.isAttacking;
    _this.health = 100;
    _this.framesCurrent = 0;
    _this.freamesElapsed = 0;
    _this.framesHold = 6;
    _this.sprites = sprites;
    _this.dead = false;

    for (var sprite in _this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }

    console.log(_this.sprites);
    return _this;
  }

  _createClass(Fighter, [{
    key: "update",
    value: function update() {
      this.draw();

      if (!this.dead) {
        this.animateFrames();
      }

      this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
      this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.y + this.height + this.velocity.y >= canvas.height - 89) {
        this.velocity.y = 0;
        this.position.y = 337;
      } else {
        this.velocity.y += gravity;
      }
    }
  }, {
    key: "attack",
    value: function attack() {
      var _this2 = this;

      this.switchSprites('attack1');
      this.isAttacking = true;
      setTimeout(function () {
        _this2.isAttacking = false;
      }, 1000);
    }
  }, {
    key: "takeHit",
    value: function takeHit() {
      this.health -= 20;

      if (this.health <= 0) {
        this.switchSprites('death');
      } else this.switchSprites('takeHit');
    }
  }, {
    key: "switchSprites",
    value: function switchSprites(sprite) {
      if (this.image === this.sprites.death.image) {
        if (this.framesCurrent === this.sprites.death.framesMax - 1) this.dead = true;
        return;
      }

      if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return;
      if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return;

      switch (sprite) {
        case 'idle':
          if (this.image !== this.sprites.idle.image) {
            this.image = this.sprites.idle.image;
            this.framesMax = this.sprites.idle.framesMax;
            this.framesCurrent = 0;
          }

          break;

        case 'run':
          if (this.image !== this.sprites.run.image) {
            this.image = this.sprites.run.image;
            this.framesMax = this.sprites.run.framesMax;
            this.framesCurrent = 0;
          }

          break;

        case 'jump':
          if (this.image !== this.sprites.jump.image) {
            this.image = this.sprites.jump.image;
            this.framesMax = this.sprites.jump.framesMax;
            this.framesCurrent = 0;
          }

          break;

        case 'fall':
          if (this.image !== this.sprites.fall.image) {
            this.image = this.sprites.fall.image;
            this.framesMax = this.sprites.fall.framesMax;
            this.framesCurrent = 0;
          }

          break;

        case 'attack1':
          if (this.image !== this.sprites.attack1.image) {
            this.image = this.sprites.attack1.image;
            this.framesMax = this.sprites.attack1.framesMax;
            this.framesCurrent = 0;
          }

          break;

        case 'takeHit':
          if (this.image !== this.sprites.takeHit.image) {
            this.image = this.sprites.takeHit.image;
            this.framesMax = this.sprites.takeHit.framesMax;
            this.framesCurrent = 0;
          }

          break;

        case 'death':
          if (this.image !== this.sprites.death.image) {
            this.image = this.sprites.death.image;
            this.framesMax = this.sprites.death.framesMax;
            this.framesCurrent = 0;
          }

          break;
      }
    }
  }]);

  return Fighter;
}(Sprite);