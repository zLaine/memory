window.onload = function() 
{
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render} );
    
    var girl;
    var walkSpeed = 150;
    var reunited;
    var map;
    var map2;
    var tiles;
    var background;
    var walls;
    var collision;
    
    function preload() 
    {
        game.load.spritesheet('girlChar', 'assets/ExGirl.png', 40, 40, 12 );
    //    game.load.image('plainBrick', 'assets/brickPlatform.png');
        game.load.image('boxes', 'assets/bw boxes.png');
        game.load.image('apartment', 'assets/apartment.png');
        game.load.tilemap('map', 'assets/floorPlan.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.audio('reunited', 'assets/Reunited1.mp3');
    }
    
    
    function create() 
    {
        game.world.setBounds(0, 0, 1840, 1040);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //setting up the images used in the tilemap
        map = game.add.tilemap('map');
    //    map2 = game.add.tilemap('map');
    //    map3 = game.add.tilemap('map');
        map.addTilesetImage('apartment', 'apartment');
        map.addTilesetImage('bw boxes', 'bw boxes');
    //    map3.addTilesetImage('Brick', 'brick');
        
       /* map.setCollisionBetween(0, 8);
        map.setCollisionBetween(20, 25);
        map.setCollisionBetween(27, 29);
        map.setCollision(0); */
        
        //sets up the layers of the filemap
        background = map.createLayer('Background');
        background.resizeWorld();
        walls = map.createLayer('collision');
        //This debug code makes the colliders green
    //    platforms.debug = true;
        walls.resizeWorld();
    //    collision = map3.createLayer('Collision');
    //    collision.resizeWorld(); */
        
        //sets the platforms layer too all be colliders
        map.setCollisionBetween(1, 1200, true, 'walls');
        
        reunited = game.add.audio('reunited');
        reunited.loop = true;
        reunited.play();
        
    //    game.add.sprite(0,0, 'foggySky');
    //    game.stage.backgroundColor = '#2d2d2d';
        
        
        girl = game.add.sprite(32, game.world.height - 50, 'girlChar');
        game.physics.arcade.enable(girl);
        girl.body.collideWorldBounds = true;
        //girl.scale.set(2);
        
        girl.animations.add('left', [0, 1, 2], 10, true);
        girl.animations.add('down', [3, 4, 5], 10, true);
        girl.animations.add('up', [6, 7, 8], 10, true);
        girl.animations.add('right', [9, 10, 11], 10, true); 
        
       // walkRight.onStart.add(animationStarted, this);
       // walkRight.onLoop.add(animationLooped, this);
       //girl.animations.play('right', 10, true);

      //  girl.body.gravity.y = 300;
       // cursors = game.input.keyboard.createCursorKeys();
       game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
        girl.anchor.setTo(.5, .5);
        game.camera.follow(girl);
        //girl.anchor.setTo(.5, .5);

        //game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
    }
    

    
    function update() 
    {
        game.physics.arcade.collide(girl, walls);
        
        // girl.body.gravity.y = 300; 
        girl.body.velocity.x = 0;
         
         
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
         {
        //  Move to the left
             girl.body.velocity.x = (0 - walkSpeed);
             girl.animations.play('left');
             
         }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            //  Move to the right
            girl.body.velocity.x = walkSpeed;
            girl.animations.play('right');
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            //  Move to the right
            girl.body.velocity.y = walkSpeed;
            girl.animations.play('up');
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            //  Move to the right
            girl.body.velocity.y = (0 - walkSpeed);
            girl.animations.play('down');
        }
        else
        {
            //  Stand still
            girl.animations.stop();
            girl.frame = 4;
        } 
        
     
    function render() 
    {
        var zone = game.camera.deadzone;
    
        game.context.fillStyle = 'rgba(255,0,0,0.6)';
        game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(girl, 32, 500);
    } 
};
