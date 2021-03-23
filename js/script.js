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
            "../js/slider.js"

        ],
        function() {



            class SiemaWithDots extends Siema {

                addDots() {
                    // create a contnier for all dots
                    // add a class 'dots' for styling reason
                    this.dots = document.createElement('div');
                    this.dots.classList.add('dots');

                    // loop through slides to create a number of dots
                    for (let i = 0; i < Math.ceil((this.innerElements.length + (this.perPage - 1)) / this.perPage); i++) {
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
                printSlideIndex() {
                        const slideNumber = Math.abs(this.currentSlide);
                        console.log(slideNumber)
                        document.querySelector('.slider-title').textContent = this.innerElements[slideNumber].getAttribute('data-title');
                        document.querySelector('.slider-descr').textContent = this.innerElements[slideNumber].getAttribute('data-descr');
                        document.querySelector('.slider-content-inner').classList.remove('text-show');
                        setTimeout(function() {
                            document.querySelector('.slider-content-inner').classList.add('text-show');
                        }, 300);
                        document.querySelector('.current-slide').textContent = slideNumber + 1;
                        document.querySelector('.total-slides').textContent = this.innerElements.length;
                        console.log(this.innerElements.length);


                    }
                    // SlideIndex() {
                    //     if (this.currentSlide == 0) {
                    //         $('.slider-prev').addClass('hiden')
                    //     } else {
                    //         $('.slider-prev').removeClass('hiden')
                    //     }
                    //     if (this.innerElements.length < (this.currentSlide + this.perPage + 1)) {
                    //         $('.slider-next').addClass('hiden')
                    //     } else {
                    //         $('.slider-next').removeClass('hiden')
                    //     }
                    // }
            }

            var servSlider = new SiemaWithDots({
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
                onInit: function() {
                    this.addDots();
                    this.updateDots();
                    this.printSlideIndex();
                },
                onChange: function() {
                    this.updateDots();
                    this.printSlideIndex();
                }
            });


            document.querySelector('.next').addEventListener('click', function(e) {
                servSlider.next()
            })

            document.querySelector('.prev').addEventListener('click', function(e) {
                servSlider.prev()
            })



        });





    let priceSwap = document.querySelector('.price-swap');
    let priceContainer = document.querySelector('.prices-wrapper')

    priceSwap.addEventListener('input', function(e) {
        if (this.checked) {
            priceContainer.style.height = document.querySelector('.price-tables.active').offsetHeight + 'px';
            setTimeout(function() {
                document.querySelector('.price-tables.active').classList.remove('active');
                document.querySelector('[data-plan=subscription]').classList.add('active');
                priceContainer.style.height = document.querySelector('.price-tables.active').offsetHeight + 'px';

            }, 10)
        } else {

            setTimeout(function() {
                document.querySelector('.price-tables.active').classList.remove('active');
                document.querySelector('[data-plan=one-off]').classList.add('active');
                priceContainer.style.height = document.querySelector('[data-plan=one-off]').offsetHeight + 'px'
            }, 10)
        }
    })
    let contButtons = document.querySelectorAll('.country-btn')
    contButtons.forEach(function(contButton) {
        contButton.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                var nextCountry = document.querySelector('[data-from=' + this.getAttribute('data-to') + ']');
                var curentCountry = document.querySelector('.country_info.active');
                document.querySelector('.country-btn.active').classList.remove('active');
                this.classList.add('active');
                nextCountry.classList.add('active');
                curentCountry.classList.remove('active');
            }
        })
    })

    let sprintSelectors = document.querySelectorAll('.sprint')
    let sprintWrapper = document.querySelector('.tasks-wrapper')
    sprintSelectors.forEach(function(sprintSelector) {
        sprintSelector.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                sprintWrapper.style.height = presentActive + 'px';
                var presentActive = document.querySelector('.sprint-tasks.active');
                var newActive = document.querySelector('[data-sprint=sprint-' + this.getAttribute('sprint') + ']');
                document.querySelector('.sprint.active').classList.remove('active')
                this.classList.add('active')
                setTimeout(function() {
                    presentActive.classList.remove('active');
                    newActive.classList.add('active');
                    sprintWrapper.style.height = newActive.offsetHeight + 'px';
                }, 10)
            }
        })
    })

    let priceTables = document.querySelectorAll('.price-table')
    priceTables.forEach(function(priceTable) {
        priceTable.addEventListener('mouseenter', function() {
            document.querySelector('.active .pcs-3.price-selected').classList.remove('price-selected')
            this.closest('.pcs-3').classList.add('price-selected')
        })
    })


    let tabChats = document.querySelectorAll('[data-target]')
    tabChats.forEach(function(tabChat) {
        tabChat.addEventListener('click', function() {
            document.querySelector('.chat-select.active').classList.remove('active')
            document.querySelector('.select-tab.selected').classList.remove('selected')
            this.classList.add('selected')
            document.querySelector('[data-chat=' + this.getAttribute('data-target') + ']').classList.add('active')
            document.querySelector('[data-indicator]').setAttribute('data-indicator', this.getAttribute('data-target'))
        })
    })





    // var play = new autoPlayTabs();
    let tabSelects = document.querySelectorAll('.tailored-tab-select-inner')
    tabSelects.forEach(function(tabSelect) {
        tabSelect.addEventListener('click', function() {
            this.querySelector('.tab-progress-indicator').style.width = '0%';
            tabSwap(this.getAttribute('data-for-tab'));
            play.stopLoop();
        })
    })

    document.querySelector('.tailored-selects').addEventListener('mouseover', function() {
        play.stopLoop();
        console.log(play.stopLoop())
    });
    document.querySelector('.tailored-selects').addEventListener('mouseleave', function() {
        play.runTimer(document.querySelector('.tailored-tab-select-inner.active').getAttribute('data-for-tab'), 5);
    });

    function Timer() {

        var timeinterval;
        this.runTimer = function autoPlayTabs(startIndex, time) {
            var start = 0;
            var time = Math.round(time * 10);
            var activeTab = document.querySelector('[data-for-tab="' + startIndex + '"]');
            var activeTabIndicator = activeTab.querySelector('.tab-progress-indicator');
            timeinterval = setInterval(function() {
                if (start > 100) {
                    clearInterval(timeinterval);
                    if (startIndex >= 4) {
                        startIndex = 1;
                        autoPlayTabs(startIndex, 5)
                        tabSwap(1)
                    } else {
                        startIndex++;
                        tabSwap(startIndex)
                        autoPlayTabs(startIndex, 5)
                    }
                } else {
                    activeTabIndicator.style.width = start + '%';
                }
                start++;
            }, time);

            this.stopLoop = function stopLoopTabs() {
                clearInterval(timeinterval);
            }
        }
    }

    function tabSwap(tabIndex) {
        let recentActiveTab = document.querySelector('.tailored-tab-select-inner.active')
        let nowActive = document.querySelector('[data-for-tab="' + tabIndex + '"]');
        recentActiveTab.classList.remove('active');
        document.querySelector('[data-tab="' + recentActiveTab.getAttribute('data-for-tab') + '"]').classList.remove('active');
        nowActive.classList.add('active');
        document.querySelector('[data-tab="' + nowActive.getAttribute('data-for-tab') + '"]').classList.add('active');
    }
    var play = new Timer();
    play.runTimer(1, 5)







    document.body.classList.remove('loading')


    var contactsUsButton = document.querySelectorAll('[data-get]');
    var contactsUs = document.querySelector('.modal');
    var closeModal = document.querySelector('.close-modal');
    var mobileButton = document.querySelector('.ham')
    var headerOverlay = document.querySelector('.heder-overlay');
    var mobileMenu = document.querySelector('.header .nav-block')

    // mobileButton.addEventListener('click', function(e) {
    //     if (this.classList.contains('active')) {
    //         document.body.style.overflow = 'auto';
    //         document.body.style.paddingRight = '0px';
    //         this.classList.remove('active');
    //         headerOverlay.classList.remove('overlay-active')
    //         mobileMenu.classList.remove('active');
    //     } else {
    //         this.classList.add('active');
    //         document.body.style.overflow = 'hidden';
    //         document.body.style.paddingRight = getScrollbarWidth() + 'px';
    //         headerOverlay.classList.add('overlay-active')
    //         mobileMenu.classList.add('active');
    //     }
    // })
    // headerOverlay.addEventListener('click', function(e) {
    //     if (mobileButton.classList.contains('active')) {
    //         document.body.style.overflow = 'auto';
    //         document.body.style.paddingRight = '0px';
    //         mobileButton.classList.remove('active');
    //         this.classList.remove('overlay-active')
    //         mobileMenu.classList.remove('active');
    //     }
    // })


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
        if (contactsUs.classList.contains('visible')) {
            contactsUs.classList.remove('visible');

            if (document.body.clientHeight > window.innerHeight) {
                setTimeout(function() {
                    document.body.style.overflow = 'auto';
                    document.body.style.paddingRight = 0 + 'px';
                    document.querySelector('.header').style.paddingRight = 0 + 'px';
                }, 150)
            }

        }
    }



    if (contactsUsButton) {
        for (var i = 0; i < contactsUsButton.length; i++) {
            contactsUsButton[i].addEventListener('click', function(e) {

                document.querySelector('.header').style.paddingRight = getScrollbarWidth() + 'px';

                for (var i = 0; i < contactsUsButton.length; i++) {
                    if (!contactsUs.classList.contains('modal-will-active')) {
                        contactsUs.classList.add('modal-will-active')
                    }
                    contactsUs.classList.add('visible');

                    if (document.body.clientHeight > window.innerHeight) {

                        document.body.style.overflow = 'hidden';
                        document.body.style.paddingRight = getScrollbarWidth() + 'px';
                    }
                    setTimeout(function() {
                        document.getElementById('name').focus();
                    }, 50);
                }
            })
        }
    }


    closeModal.addEventListener('click', function(e) {
        hideModal();
    })

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            hideModal();
        }
    };


    var formInputs = document.querySelectorAll('.form input,.form textarea')
    for (var i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function() {
            this.setAttribute('value', this.value);
        })
    }



    document.querySelector(".form").addEventListener("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();

        var params = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        };
        var url = "../php/mail.php?data=" + encodeURIComponent(JSON.stringify(params));;

        xhttp = new XMLHttpRequest();
        xhttp.open("get", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onload = function() {
            if (xhttp.readyState == 4 && xhttp.status === 200 && xhttp.responseText) {
                document.querySelector('.form').style.minHeight = document.querySelector('.form').offsetHeight + 'px';
                document.querySelector('.after-submit').classList.add('submited');
                console.log('submited')
                setTimeout(function() {
                    document.querySelector('.form-inner').remove();
                }, 150);
            } else if (xhttp.status !== 200 || !xhttp.responseText) {

            }
        };
        xhttp.send();


    });



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