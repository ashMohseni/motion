const scaling = "fit";
const width = 1024;
const height = 768;
const color = dark;
const outerColor = dark;
const assets = ["boom.mp3", "p1.png", "plus.mp3", "boom.png", "minus.mp3", "a5.mp3"];
const path = "assets/";

window.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start");

    console.log(startButton);

    startButton.addEventListener("click", () => {
        console.log("clicked");

        const frame = new Frame(scaling, width, height, color, outerColor, assets, path);
        frame.on("ready", () => {
            zog("ready from ZIM Frame");


            const stage = frame.stage;
            let stageW = frame.width;
            let stageH = frame.height;


            const circles = new Container(stageW, stageH).addTo();
            const rectangles = new Container(stageW, stageH).addTo();


            interval(5767, () => {
                new Circle(40, [purple, red, blue, green])
                    .centerReg(circles)
                    .alp(0.75)
                    .loc(Math.random() * stageW, -100)
                    .animate({
                        props: {
                            y: stageH + 100,
                            scale: 1.5
                        },
                        time: 5000,
                        ease: "linear"
                    })
                    .animate({
                        props: {
                            scale: 1.28
                        },
                        time: 1000,
                        loop: true,
                        rewind: true,
                        sequence: 30
                    });

            }, undefined, true)
            interval(4672, () => {
                new Rectangle(80, 80, [purple, red, blue, green])
                    .centerReg(rectangles)
                    .loc(Math.random() * stageW, -100)
                    .alp(0.75)
                    .animate({
                        props: {
                            rotation: 360
                        },
                        time: 8000,
                        ease: "linear",
                        loop: true
                    })
                    .animate({
                        props: {
                            y: stageH + 100
                        },
                        time: 5000,
                        ease: "linear"
                    })
                    .animate({
                        props: {
                            scale: 1.28
                        },
                        time: 1000,
                        loop: true,
                        rewind: true,
                        sequence: 30
                    });

            }, undefined, true)

            interval(5767, () => {
                var cir2 = new Circle(40, [purple, red, blue, green])
                    .centerReg(circles)
                    .alp(0.75)
                    .loc(-100, Math.random() * stageW)
                    .animate({
                        props: {
                            x: stageW + 100,
                            scale: 1.5
                        },
                        time: 3000,
                        ease: "linear"
                    })
                    .animate({
                        props: {
                            scale: 1.28
                        },
                        time: 1000,
                        loop: true,
                        rewind: true,
                        sequence: 30
                    });
            }, undefined, true)
            interval(4672, () => {
                new Rectangle(80, 80, [purple, red, blue, green])
                    .centerReg(rectangles)
                    .alp(0.75)
                    .loc(-100, Math.random() * stageH)
                    .animate({
                        props: {
                            rotation: 360
                        },
                        time: 8000,
                        ease: "linear",
                        loop: true
                    }).animate({
                        props: {
                            x: stageW + 100
                        },
                        time: 5000,
                        ease: "linear"
                    })
                    .animate({
                        props: {
                            scale: 1.28
                        },
                        time: 1000,
                        loop: true,
                        rewind: true,
                        sequence: 30
                    });
            }, undefined, true)


            const mtnctrl = new Rectangle(185, 10, dark)
                .centerReg()
                .pos(0, 50, CENTER, BOTTOM);
            const rect1 = new Rectangle(60, 60, light)
                .center(mtnctrl)
                .mov(-45, -35);
            const circ1 = new Circle(30, light).center(mtnctrl).mov(50, -35);
            new MotionController(mtnctrl, "mousemove", 10, "horizontal");

            const mtnctrl2 = new Rectangle(10, 185, dark)
                .centerReg()
                .pos(0, 50, RIGHT, CENTER);
            const rect2 = new Rectangle(60, 60, light)
                .center(mtnctrl2)
                .mov(-35, -45);
            const circ2 = new Circle(30, light).center(mtnctrl2).mov(-35, 60);
            new MotionController(mtnctrl2, "mousemove", 10, "vertical");

            const creators = new Label({
                    text: "Created by: Ashkan & Sam",
                    size: 20,
                    color: light,
                    border: black,
                    font: "Permanent Marker"
                })
                .pos(20, 20, LEFT, BOTTOM);

            var labelStyle = [{
                font: "Bangers",
                src: "https://fonts.googleapis.com/css?family=Bangers&display=swap"
            }];
            let score = 0;
            const scoreText = new Label({
                    text: "Score: " + score,
                    size: 30,
                    color: yellow,
                    border: black,
                    font: "Permanent Marker"
                })
                .pos(50, 50, CENTER);


            let hitTest = 0;
            Ticker.add(() => {
                circles.loop((cir) => {
                    if (cir.hitTestCircle(circ1)) {
                        cir.removeFrom();
                        cir.stopAnimate();
                        var sound = frame.asset("plus.mp3").play({
                            volume: 2,
                            loop: false
                        });
                        scoreText.text = "Score: " + (++score);

                    }

                }, true);
                // second parameter (true) of ZIM loop is to loop backward
            });

            Ticker.add(() => {
                rectangles.loop((rec) => {
                    if (rec.hitTestRect(rect1)) {
                        rec.removeFrom();
                        rec.stopAnimate();
                        var sound = frame.asset("plus.mp3").play({
                            volume: 2,
                            loop: false
                        });
                        scoreText.text = "Score: " + (++score);

                    }

                }, true);
                // second parameter (true) of ZIM loop is to loop backward
            });

            Ticker.add(() => {
                circles.loop((cir) => {
                    if (cir.hitTestCircle(rect1)) {
                        cir.removeFrom();
                        cir.stopAnimate();
                        var sound = frame.asset("minus.mp3").play({
                            volume: 2,
                            loop: false
                        });
                        var explode = explosion.sca(1.2).centerReg().loc(rect1).run(1000);
                        rect1.removeFrom();
                        hitTest++;
                        if (hitTest == 4) {
                            var gameover = frame.asset("a5.mp3").play({
                                volume: 2,
                                loop: false
                            });
                            scoreText.text = "Final Score: " + (--score);
                            circles.removeFrom();
                            rectangles.removeFrom();
                            scoreText.sca(2).centerReg();
                        } else {
                            scoreText.text = "Score: " + (--score);
                        }
                    }

                }, true);
                // second parameter (true) of ZIM loop is to loop backward
            });
            Ticker.add(() => {
                rectangles.loop((rec) => {
                    if (rec.hitTestRect(circ1)) {
                        rec.removeFrom();
                        rec.stopAnimate();
                        var sound = frame.asset("minus.mp3").play({
                            volume: 2,
                            loop: false
                        });
                        var explode = explosion.sca(1.2).centerReg().loc(circ1).run(1000);
                        circ1.removeFrom();
                        hitTest++;
                        if (hitTest == 4) {
                            var gameover = frame.asset("a5.mp3").play({
                                volume: 2,
                                loop: false
                            });
                            scoreText.text = "Final Score: " + (--score);
                            circles.removeFrom();
                            rectangles.removeFrom();
                            scoreText.sca(2).centerReg();
                        } else {
                            scoreText.text = "Score: " + (--score);
                        }
                    }

                }, true);
                // second parameter (true) of ZIM loop is to loop backward
            });
            Ticker.add(() => {
                circles.loop((cir) => {
                    if (cir.hitTestCircle(circ2)) {
                        cir.removeFrom();
                        cir.stopAnimate();
                        var sound = frame.asset("plus.mp3").play({
                            volume: 2,
                            loop: false
                        });
                        scoreText.text = "Score: " + (++score);

                    }

                }, true);
                // second parameter (true) of ZIM loop is to loop backward
            });
            Ticker.add(() => {
                rectangles.loop((rec) => {
                    if (rec.hitTestRect(rect2)) {
                        rec.removeFrom();
                        rec.stopAnimate();
                        var sound = frame.asset("plus.mp3").play({
                            volume: 2,
                            loop: false
                        });
                        scoreText.text = "Score: " + (++score);

                    }

                }, true);
                // second parameter (true) of ZIM loop is to loop backward
            });

            Ticker.add(() => {
                circles.loop((cir) => {
                    if (cir.hitTestCircle(rect2)) {
                        cir.removeFrom()
                        cir.stopAnimate();
                        var sound = frame.asset("minus.mp3").play({
                            volume: 2,
                            loop: false
                        });
                        var explode = explosion.sca(1.2).centerReg().loc(rect2).run(1000);
                        rect2.removeFrom();
                        hitTest++;
                        if (hitTest == 4) {
                            var gameover = frame.asset("a5.mp3").play({
                                volume: 2,
                                loop: false
                            });
                            scoreText.text = "Final Score: " + (--score);
                            circles.removeFrom();
                            rectangles.removeFrom();
                            scoreText.sca(2).centerReg();
                        } else {
                            scoreText.text = "Score: " + (--score);
                        }
                    }

                }, true);
                // second parameter (true) of ZIM loop is to loop backward
            });

            Ticker.add(() => {
                rectangles.loop((rec) => {
                    if (rec.hitTestRect(circ2)) {
                        rec.removeFrom();
                        rec.stopAnimate();
                        var sound = frame.asset("minus.mp3").play({
                            volume: 2,
                            loop: false
                        });
                        var explode = explosion.sca(1.2).centerReg().loc(circ2).run(1000);
                        circ2.removeFrom();
                        hitTest++;
                        if (hitTest == 4) {
                            var gameover = frame.asset("a5.mp3").play({
                                volume: 2,
                                loop: false
                            });
                            scoreText.text = "Final Score: " + (--score);
                            circles.removeFrom();
                            rectangles.removeFrom();
                            scoreText.sca(2).centerReg();
                        } else {
                            scoreText.text = "Score: " + (--score);

                        }
                    }

                }, true);
                // second parameter (true) of ZIM loop is to loop backward
            });
            let explosion = new Sprite(frame.asset("boom.png"), 8, 6);
            stage.update(); // this is needed to show any changes
        }); // end of ready
    })



}); // end of DOMContentLoaded
