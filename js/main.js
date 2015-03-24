window.onload = function() 
{
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});
    
    var girl;
    var walkSpeed = 200;
    var reunited;
    var map;
    var map2;
    var tiles;
    var background;
    var walls;
    var boxes;
    var collision;
    
    var phoneRing;
    var whichBedroom;
    var phoneAnswer;
    
    var phoneRingDone = false;
    var whichBedroomDone = false;
    var phoneAnswerDone = false;
    
    var story;
    var style;
    
    function preload() 
    {
        game.load.spritesheet('girlChar', 'assets/ExGirl.png', 40, 40, 12 );
        game.load.image('boxTrigger', 'assets/phoneRingTest.png');
        game.load.image('boxes', 'assets/bw boxes.png');
        game.load.image('apartment', 'assets/apartment.png');
        game.load.tilemap('map', 'assets/floorPlan.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.audio('reunited', 'assets/Reunited.mp3');
    }
    
    
    function create() 
    {
        game.world.setBounds(0, 0, 1840, 1040);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //setting up the images used in the tilemap
        map2 = game.add.tilemap('map');
        map = game.add.tilemap('map');
    //    map3 = game.add.tilemap('map');
        map.addTilesetImage('apartment', 'apartment');
        map.addTilesetImage('bw boxes', 'boxes');
        map2.addTilesetImage('bw boxes', 'boxes');
        
        //sets up the layers of the filemap
        walls = map2.createLayer('Walls');
        //This debug code makes the colliders green
        walls.debug = true;
        walls.resizeWorld();

        //sets the platforms layer to all be colliders
        map2.setCollisionBetween(0, 1, true, 'Walls');
        background = map.createLayer('Background');
        background.resizeWorld();
        
        phoneRing = game.add.sprite(400, (game.world.height - 400), 'boxTrigger');
        whichBedroom = game.add.sprite(480, (game.world.height - 800), 'boxTrigger');
        whichBedroom.scale.set(5);
    //    phoneAnswer;
        
        
        reunited = game.add.audio('reunited');
        reunited.loop = true;
        reunited.volume = .5;
        reunited.play();

        
        girl = game.add.sprite(165, 100, 'girlChar');
        game.physics.arcade.enable(girl);
        girl.body.bounce.y = 0;
        girl.body.gravity.y = 0;
        girl.body.velocity.x = 0;
        girl.body.collideWorldBounds = true;
        //girl.scale.set(2);
        
        girl.animations.add('left', [0, 1, 2], 10, true);
        girl.animations.add('down', [3, 4, 5], 10, true);
        girl.animations.add('up', [6, 7, 8], 10, true);
        girl.animations.add('right', [9, 10, 11], 10, true); 


        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP]);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.DOWN]);
        
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
        girl.body.velocity.y = 0;
         
         
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
            //  Move up
            girl.body.velocity.y = (0 - walkSpeed);
            girl.animations.play('up');
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            //  Move down
            girl.body.velocity.y = walkSpeed;
            girl.animations.play('down');
        }
        else
        {
            //  Stand still
            girl.animations.stop();
            girl.frame = 4;
        } 
        
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
