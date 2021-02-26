/*
The Game Project 4 - Side scrolling
Week 6
*/
var Left;


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var scrollPos;

var clouds;
var mountains;
var trees_x;
var collectables;
var canyons;

function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    Left = [1001, 1001, 1001, 1001]

    // Boolean variables to control the movement of the game character.
    isLeft = false;
    isRight = false;

    // Variable to control the background scrolling.
    scrollPos = 0;

    // Initialise arrays of scenery objects.
    trees_x = [304, 323, 510];
    clouds = [
        {
            x_pos: 110,
            y_pos: 245,
            size: 123,
            left: 300
        }, {
            x_pos: 400,
            y_pos: 120,
            size: 200,
            left: 1001
        }, {
            x_pos: 700,
            y_pos: 90,
            size: 80,
            left: 1002
        }];
    mountains = [
        {
            x_pos: 80,
            y_pos: 201,
            size: 70,
            left: 1002
        },
        {
            x_pos: 120,
            y_pos: 100,
            size: 124,
            left: 1002
        }
    ];
    collectables = [
        {
            x_pos: 300,
            y_pos: floorPos_y,
            size: 50, isFound: false,
            left: 1004
        },
        {
            x_pos: 122,
            y_pos: floorPos_y,
            size: 50, isFound: false,
            left: 1004
        }
    ]
    canyons = [
        {
            x_pos: 60,
            width: 80,
            left: 1004
        },
        {
            x_pos: 700,
            width: 50,
            left: 1005

        }
    ]

}

function draw() {
    background(100, 155, 255); // fill the sky blue

    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height / 4); // draw some green ground
    push();
    translate(scrollPos, 0);


    // Draw clouds.
    for (var i = 0; i < clouds.length; i++) {
        fill(255, 255, 255);

        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].size);
        ellipse(clouds[i].x_pos - 40, clouds[i].y_pos, clouds[i].size - 20, clouds[i].size - 20);
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos, clouds[i].size - 20, clouds[i].size - 20);

        if ((scrollPos + clouds[i].x_pos) < -width) {
            clouds[i].x_pos = (-scrollPos) + random(0, width) + width;
        }

        else if (scrollPos > clouds[i].left) {
            clouds[i].x_pos = - (scrollPos - random(0, width) + width);
            clouds[i].left = scrollPos + 1005
                * 2.4;
        }



    }
    // Draw mountains.
    for (var i = 0; i < mountains.length; i++) {
        fill(155);

        triangle(mountains[i].x_pos, floorPos_y,
            mountains[i].x_pos + (mountains[i].size / 2), mountains[i].y_pos,
            mountains[i].x_pos + mountains[i].size, floorPos_y);



        if ((scrollPos + mountains[i].x_pos) < -1005
        ) {
            mountains[i].x_pos = (-scrollPos) + random(0, 1005
            ) + 1005
                ;
        }

        else if (scrollPos > mountains[i].left) {
            mountains[i].x_pos = - (scrollPos - random(0, 1005
            ) + 1005
            );
            mountains[i].left = scrollPos + 1005
                * 2.4;
        }



    }
    // Draw trees.
    for (var i = 0; i < trees_x.length; i++) {
        fill(100, 50, 0);
        rect(75 + trees_x[i], -200 / 2 + floorPos_y, 50, 200 / 2);

        //branches
        fill(0, 100, 0);
        triangle(trees_x[i] + 25, -200 / 2 + floorPos_y,
            trees_x[i] + 100, -200 + floorPos_y,
            trees_x[i] + 175,
            -200 / 2 + floorPos_y);

        triangle(trees_x[i],
            -200 / 4 + floorPos_y,
            trees_x[i] + 100,
            -200 + 3 / 4 + floorPos_y,
            trees_x[i] + 200,
            -200 / 4 + floorPos_y
        );

        if ((scrollPos + trees_x[i]) < -1005
        ) {
            Left[i] = (-scrollPos) + random(0, 1005
            ) + 1005
                ;
        }

        else if (scrollPos > Left[i]) {
            trees_x[i] = - (scrollPos - random(0, 1005
            ) + 1005
            );
            Left[i] = scrollPos + 1005
                * 2.4;
        }


    }

    // Draw canyons
    for (var i = 0; i < canyons.length; i++) {
        fill(246, 246, 246, 200);
        rect(canyons[i].x_pos, floorPos_y, canyons[i].width, floorPos_y);

        if ((scrollPos + canyons[i].x_pos) < -300) {
            canyons[i].x_pos = (-scrollPos) + random(0, 1005
            ) + 1005
                ;
        }


        else if (scrollPos > canyons[i].left) {
            canyons[i].x_pos = - (scrollPos - random(0, 1005
            ) + 1005
            );
            canyons[i].left = scrollPos + 1005
                * 2.4;
        }

    }

    // Draw collectable items
    for (var i = 0; i < collectables.length; i++) {
        fill(241, 190, 44);
        ellipse(collectables[i].x_pos, collectables[i].y_pos - 20, collectables[i].size);

        if ((scrollPos + collectables[i].x_pos) < -300) {
            collectables[i].x_pos = (-scrollPos) + random(0, 1000) + 1000;
        }

        else if (scrollPos > collectables[i].left) {
            collectables[i].x_pos = - (scrollPos - random(0, 1000) + 1000);
            collectables[i].left = scrollPos + 1000 * 2.4;
        }

    }


    // Draw the game character - this must be last
    pop();



    fill(200, 150, 150);
    ellipse(gameChar_x, gameChar_y - 50, 35);

    fill(255, 0, 0);
    rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

    fill(0);
    rect(gameChar_x - 15, gameChar_y - 5, 10, 10);
    rect(gameChar_x + 5, gameChar_y - 5, 10, 10);

    //////// Game character logic ///////
    // Logic to move

    if (isLeft) {
        if (gameChar_x > width * 0.2) {
            gameChar_x -= 5;
        } else {
            scrollPos += 5;
        }
    }

    if (isRight) {
        if (gameChar_x < width * 0.8) {
            gameChar_x += 5;
        } else {
            scrollPos -= 5; // negative for moving against the background
        }

    }
}

function keyPressed() {

    if (key == 'A' || keyCode == 37) {
        isLeft = true;
    }

    if (key == 'D' || keyCode == 39) {
        isRight = true;
    }


}

function keyReleased() {
    if (key == 'A' || keyCode == 37) {
        isLeft = false;
    }

    if (key == 'D' || keyCode == 39) {
        isRight = false;
    }

}
