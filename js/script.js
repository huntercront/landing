WebFontConfig = {
    custom: {
        families: ['Graphik'],
        urls: ['./css/font.css']
    }
};

(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);

document.addEventListener("DOMContentLoaded", function(event) {
    var Loader = function() {}
    Loader.prototype = {
        require: function(scripts, callback) {
            this.loadCount = 0;
            this.totalRequired = scripts.length;
            this.callback = callback;

            for (var i = 0; i < scripts.length; i++) {
                this.writeScript(scripts[i]);
            }
        },
        loaded: function(evt) {
            this.loadCount++;

            if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
        },
        writeScript: function(src) {
            var self = this;
            var s = document.createElement('script');
            s.type = "text/javascript";
            s.defer = true;
            s.src = src;
            s.addEventListener('load', function(e) { self.loaded(e); }, false);
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(s);
        }
    }

    // var l = new Loader();
    // l.require([
    //         "../js/typed.min.js"

    //     ],
    //     function() {

    //         var typed = new Typed('.print-text', {
    //             strings: ["digital marketing campaigns", "mobile shopping", "Facebook shopping", "Instagram shopping", "ads campaigns", "e-mail campaigns", "Office365 sync", "CRM integration", "ERP integration"],
    //             typeSpeed: 70,
    //             backSpeed: 50,
    //             loop: true,
    //             backDelay: 1500
    //         });

    //     });

    var r = new Loader();
    r.require([
            "./js/slider.js",
            "./js/scroll.js"

        ],
        function() {

            function printSlide() {
                document.querySelector('[data-slide="1"]').classList.add('text-show')

                let totalSlides = this.innerElements.length;
                const slide = this.currentSlide;
                let slideNumberCurent;

                if (slide <= 0) {
                    slideNumberCurent = totalSlides + slide;
                } else {
                    slideNumberCurent = slide;
                }
                document.querySelector('.current-slide').textContent = slideNumberCurent;
                document.querySelector('.total-slides').textContent = totalSlides;
            }


            function printSlideIndex() {
                let totalSlides = this.innerElements.length;
                const slide = this.currentSlide;
                let slideNumberCurent;

                if (slide <= 0) {
                    slideNumberCurent = totalSlides + slide;
                } else {
                    slideNumberCurent = slide;
                }
                document.querySelector('.text-show').classList.remove('text-show')

                setTimeout(function() {
                    document.querySelector('[data-slide="' + slideNumberCurent + '"]').classList.add('text-show');
                }, 300);

                document.querySelector('.current-slide').textContent = slideNumberCurent;
                document.querySelector('.total-slides').textContent = totalSlides;


            }
            const servSlider = new Siema({
                selector: '.case-slider',
                duration: 400,
                easing: 'ease-out',
                startIndex: 1,
                draggable: false,
                multipleDrag: false,
                threshold: 90,
                loop: true,
                rtl: false,
                perPage: {
                    664: 1,
                    1024: 3,
                },
                onInit: printSlide,
                onChange: printSlideIndex,
            });



            document.querySelector('.next').addEventListener('click', function(e) {
                servSlider.next();

            })

            document.querySelector('.prev').addEventListener('click', function(e) {
                servSlider.prev();

            })


            class SiemaWithDots extends Siema {

                addDots() {
                    // create a contnier for all dots
                    // add a class 'dots' for styling reason
                    this.dots = document.createElement('div');
                    this.dots.classList.add('dots');

                    // loop through slides to create a number of dots
                    for (let i = 0; i < this.innerElements.length; i++) {
                        // create a dot
                        const dot = document.createElement('button');

                        // add a class to dot
                        dot.classList.add('dots__item');

                        // add an event handler to each of them
                        dot.addEventListener('click', () => {
                            this.goTo(i);
                        })

                        // append dot to a container for all of them
                        this.dots.appendChild(dot);
                    }

                    // add the container full of dots after selector
                    this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
                }

                updateDots() {
                    // loop through all dots
                    for (let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
                        // if current dot matches currentSlide prop, add a class to it, remove otherwise
                        const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
                        this.dots.querySelectorAll('button')[i].classList[addOrRemove]('dots__item--active');
                    }

                }
                curentShowSlide() {
                    return this.currentSlide;

                }
            }



            var work = new SiemaWithDots({
                selector: '.work-slider',
                duration: 400,
                easing: 'ease-out',
                startIndex: 0,
                draggable: true,
                multipleDrag: true,
                threshold: 90,
                loop: false,
                rtl: false,
                perPage: {
                    664: 1,
                    1024: 3,
                },
                onInit: function() {
                    this.addDots();
                    this.updateDots();
                },
                onChange: function() {
                    this.updateDots();
                }

            });

            document.querySelector('.work-next').addEventListener('click', function(e) {
                work.next();
            })

            document.querySelector('.work-prev').addEventListener('click', function(e) {
                work.prev();
            })

        });


    function offset(el) {
        var rect = el.getBoundingClientRect();
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return (rect.top - window.innerHeight / 3)
    }


    var header = document.querySelector(".header"),
        isScrolling = !1;

    function throttleScroll(e) {
        0 == isScrolling && window.requestAnimationFrame(function() {
                scrolling(e),
                    isScrolling = !1
            }),
            isScrolling = !0,
            document.querySelector(".hero").getBoundingClientRect().top < -100 && window.matchMedia("(min-width: 1024px)").matches ? header.classList.add("fixed") : header.classList.remove("blur-active")
    }
    window.addEventListener("scroll", throttleScroll, !1),
        document.addEventListener("DOMContentLoaded", scrolling, !1);
    var listItems = document.querySelectorAll(".animate");


    let menuitems = document.querySelectorAll('[data-menu]');
    let siteSections = document.querySelectorAll('[data-block]');

    function scrolling(e) {
        for (var t = 0; t < listItems.length; t++) {
            var o = listItems[t];
            if (o.getAttribute('data-anim')) {
                isFullyVisible(o) && o.classList.add(o.getAttribute('data-anim'))
            } else {
                isFullyVisible(o) && o.classList.add("animate-active")
            }

        }
        siteSections.forEach(function(siteSection) {
            if (offset(siteSection) < 0 && Math.abs(offset(siteSection)) < siteSection.scrollHeight) {
                document.querySelector('[data-menu="' + siteSection.getAttribute('data-block') + '"] span').style.width = Math.abs(offset(siteSection)) / siteSection.scrollHeight * 100 + '%'
            }
            if (offset(siteSection) > 0) {
                document.querySelector('[data-menu="' + siteSection.getAttribute('data-block') + '"] span').style.width = '0%';
            }
            if (offset(siteSection) < 0 && Math.abs(offset(siteSection)) > siteSection.scrollHeight) {
                document.querySelector('[data-menu="' + siteSection.getAttribute('data-block') + '"] span').style.width = '100%';
            }

        })



    }

    function isPartiallyVisible(e) {
        var t = e.getBoundingClientRect(),
            o = t.top,
            n = t.bottom,
            a = t.height;
        return o + a >= 0 && a + window.innerHeight >= n
    }

    function isFullyVisible(e) {
        var t = e.getBoundingClientRect(),
            o = t.top,
            n = t.bottom;
        return o >= 0 && n <= window.innerHeight;
    }


    function contains(arr, elem) {
        return arr.indexOf(elem) != -1;
    }

    function randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    let playGames = document.querySelectorAll('[data-stack]');
    const luckCombo = [1, 2, 3, 4, 7, 8, 9, 10, 11];
    var curenttext = 0;
    document.querySelector('.total-stack').textContent = luckCombo.length;

    playGames.forEach(function(playGame) {
        playGame.addEventListener('click', function() {
            let curentNumber = parseInt(this.getAttribute('data-stack'));
            let curentEl = this;

            playGames.forEach(function(playGame) {
                playGame.style.order = randomInteger(0, playGames.length)
                playGame.classList.add('random-anim')
                setTimeout(function() {
                    playGame.classList.remove('random-anim')
                }, 200)
            })


            if (contains(luckCombo, curentNumber) == true) {
                if (curentEl.classList.contains('selected')) {
                    curenttext = curenttext - 1;
                    document.querySelector('.curent-stack').textContent = parseInt(curenttext);
                    curentEl.classList.remove('selected');
                } else {
                    curenttext = curenttext + 1;
                    document.querySelector('.curent-stack').textContent = parseInt(curenttext);
                    curentEl.classList.add('selected');
                }
            } else {
                if (curentEl.classList.contains('selected')) {
                    curentEl.classList.remove('selected');
                } else {
                    curentEl.classList.add('selected');
                }
            }
            if (curenttext == luckCombo.length) {
                document.querySelector('.action').classList.add('action-complite')
            }
            let restartGame = document.querySelector('.action-overlay')
            restartGame.addEventListener('click', function() {
                playGames.forEach(function(playGame) {
                    playGame.style.order = randomInteger(0, playGames.length)
                    playGame.classList.remove('selected')
                })
                document.querySelector('.action').classList.remove('action-complite')
                curenttext = 0;
                document.querySelector('.curent-stack').textContent = parseInt(curenttext);
            })
        })
    })


    var countDownDate = new Date("Sep 5, 2021 15:37:25").getTime();

    var x = setInterval(function() {

        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.querySelector(".time-tostart").innerHTML = days + ":" + hours + ":" +
            minutes + ":" + seconds;

        if (distance < 0) {
            clearInterval(x);
        }
    }, 1000);


    var videoOpen = document.querySelector('.play-video a');
    var modal = document.querySelector('.modal');
    var closeModal = document.querySelector('.close-modal');
    var mobileButton = document.querySelector('.ham')
    var headerOverlay = document.querySelector('.heder-overlay');
    var mobileMenu = document.querySelector('.header .nav-block')

    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }

    function hideModal() {
        if (modal.classList.contains('visible')) {
            modal.classList.remove('visible');


            if (document.body.clientHeight > window.innerHeight) {
                setTimeout(function() {
                    modal.classList.remove('modal-will-active');
                    document.body.style.overflow = 'auto';
                    document.body.style.paddingRight = 0 + 'px';
                    document.querySelector('.header').style.paddingRight = 0 + 'px';
                }, 150)
            }

        }
    }


    videoOpen.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector('.header').style.paddingRight = getScrollbarWidth() + 'px';

        if (!modal.classList.contains('modal-will-active')) {
            modal.classList.add('modal-will-active')
        }
        setTimeout(function() {
            modal.classList.add('visible');
        }, 10);

        if (document.body.clientHeight > window.innerHeight) {

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = getScrollbarWidth() + 'px';
        }
    })

    modal.addEventListener('click', function(event) {
        if (event.target !== event.currentTarget) return;
        hideModal();
    })

    closeModal.addEventListener('click', function(e) {
        hideModal();
    })

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            hideModal();
        }
    };





    let heroAnims = document.querySelectorAll('.stack-el');
    heroAnims.forEach(function(heroAnim) {
        heroAnim.classList.add(heroAnim.getAttribute('data-anim'));
        heroAnim.style.animationDelay = heroAnim.getAttribute('data-delay') + 'ms';
    })

})