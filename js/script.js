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
            "./js/slider.js"

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
                    664: 2,
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



        });





    var header = document.querySelector(".hero"),
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


    function scrolling(e) {
        for (var t = 0; t < listItems.length; t++) {
            var o = listItems[t];
            if (o.getAttribute('data-anim')) {
                isFullyVisible(o) && o.classList.add(o.getAttribute('data-anim'))
            } else {
                isFullyVisible(o) && o.classList.add("animate-active")
            }

        }
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

    let playGames = document.querySelectorAll('[data-stack]');
    console.log(playGames);
    const luckCombo = [1, 2, 3, 4, 7, 8, 9, 10, 11];
    var curenttext = 0;
    document.querySelector('.total-stack').textContent = luckCombo.length;

    playGames.forEach(function(playGame) {
        playGame.addEventListener('click', function() {
            let curentNumber = parseInt(this.getAttribute('data-stack'));
            let curentEl = this;



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
        })
    })


    (function() {
        scrollTo();
    })();

    function scrollTo() {
        const links = document.querySelectorAll('[data-anchor]');
        links.forEach(each => (each.onclick = scrollAnchors));
    }

    function scrollAnchors(e, respond = null) {
        // if (mobileButton.classList.contains('active')) {
        //     document.body.style.overflow = 'auto';
        //     document.body.style.paddingRight = '0px';
        //     mobileButton.classList.remove('active');
        //     headerOverlay.classList.remove('overlay-active')
        //     mobileMenu.classList.remove('active');
        // }
        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
        e.preventDefault();
        var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);
        if (!targetAnchor) return;
        const originalTop = (distanceToTop(targetAnchor)) - document.querySelector('header').offsetHeight;
        window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
        const checkIfDone = setInterval(function() {
            const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            if (distanceToTop(targetAnchor) === 0 || atBottom) {
                targetAnchor.tabIndex = '-1';
                window.history.pushState('', '', targetID);
                clearInterval(checkIfDone);
            }
        }, 100);
    }

});