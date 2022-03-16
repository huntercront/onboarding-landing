WebFontConfig = {

        google: { families: ['Inter:400,500,600,700,&display=swap'] }

    },
    function(e) {
        var t = e.createElement("script"),
            e = e.scripts[0];
        t.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
            t.async = !0,
            e.parentNode.insertBefore(t, e)
    }(document);
var Loader = function() {};
Loader.prototype = {
    require: function(e, t) {
        this.loadCount = 0,
            this.totalRequired = e.length,
            this.callback = t;
        for (var o = 0; o < e.length; o++)
            this.writeScript(e[o])
    },
    loaded: function(e) {
        this.loadCount++,
            this.loadCount == this.totalRequired && "function" == typeof this.callback && this.callback.call()
    },
    writeScript: function(e) {
        var t = this,
            o = document.createElement("script");
        o.type = "text/javascript",
            o.defer = !0,
            o.src = e,
            o.addEventListener("load", function(e) {
                t.loaded(e)
            }, !1),
            document.getElementsByTagName("head")[0].appendChild(o)
    }
};




document.addEventListener("DOMContentLoaded", function(event) {

    document.body.classList.remove('loading')
    let last_known_scroll_position = 0;
    let ticking = false;

    function doSomething(scroll_pos) {
        animOnScroll()
    }

    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(last_known_scroll_position);
                ticking = false;
            });

            ticking = true;
        }
    });
    const aminItems = document.querySelectorAll('.animate');
    let rect = document.querySelector('.rect');

    function animOnScroll() {
        aminItems.forEach(function(aminItem) {
            let animItemHeight = aminItem.offsetHeight;
            let animItemOffset = offset(aminItem).top;
            let animStart = 1.5;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                if (aminItem.classList.contains('rect-zone')) {
                    let imagePos = aminItem.querySelector('.lazy-img');
                    rect.style.width = imagePos.offsetHeight * aminItem.getAttribute('data-width') + "px";
                    if (aminItem.getAttribute('data-pos')) {
                        rect.style.left = imagePos.offsetLeft + imagePos.offsetWidth - rect.offsetWidth * 0.8 + "px";
                        rect.style.top = imagePos.offsetTop - rect.offsetHeight / 6 + "px";
                    } else {
                        rect.style.left = imagePos.offsetLeft + "px";
                        rect.style.top = imagePos.offsetTop + "px";
                    }

                } else {
                    if (aminItem.classList.contains('hero-animation')) {
                        aminItem.classList.add('will-start');
                        setTimeout(() => {
                            aminItem.classList.add('animate-active');
                        }, 300);
                    } else {
                        if (aminItem.getAttribute('data-delay')) {
                            aminItem.style.transitionDelay = aminItem.getAttribute('data-delay') + "ms";
                        }
                        aminItem.classList.add('animate-active');
                    }

                }

            }
        })
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);






    var l = new Loader();
    l.require([
            '../js/date-select.js'
        ],
        function() {

            (function() {

                'use strict';

                var dayNamesShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
                var monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
                var icon = '<i class="chevron"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4L13 10L7 16" stroke="#9c9c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></i>';

                var root = document.getElementById('picker');
                var dateInput = document.getElementById('date');
                var altInput = document.getElementById('alt');
                var doc = document.documentElement;

                function format(dt) {
                    return Picker.prototype.pad(dt.getDate()) + ' ' + monthNames[dt.getMonth()].slice(0, 3) + ' ' + dt.getFullYear();
                }

                function show() {
                    root.classList.add('active');
                }

                function hide() {
                    root.classList.remove('active');
                    doc.removeEventListener('click', hide);
                }

                function onSelectHandler() {

                    var value = this.get();

                    if (value.start) {
                        dateInput.value = value.start.Ymd();
                        altInput.value = format(value.start);
                        hide();
                    }
                }

                var rightNow = new Date();
                var res = rightNow.toISOString().slice(0, 10).replace(/-/g, "-");



                var picker = new Picker(root, {
                    min: new Date(res),
                    max: new Date(dateInput.max),
                    icon: icon,
                    twoCalendars: false,
                    dayNamesShort: dayNamesShort,
                    monthNames: monthNames,
                    onSelect: onSelectHandler
                });

                picker.select(new Date(res))
                root.parentElement.addEventListener('click', function(e) { e.stopPropagation(); });

                dateInput.addEventListener('change', function() {

                    if (dateInput.value) {
                        picker.select(new Date(dateInput.value));

                    } else {
                        picker.clear();
                    }
                });

                altInput.addEventListener('focus', function() {
                    altInput.blur();
                    show();
                    doc.addEventListener('click', hide, false);
                });

            }());
        }
    );



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


    var modals = document.querySelectorAll('[data-modal-open]');
    var modalOverlay = document.querySelector('.modal-overley');

    function openModal(modal) {
        modalOverlay.classList.add('overley-active')
        let modalWindow = document.querySelector('[data-modal=' + modal.getAttribute('data-modal-open') + ']')
        modalWindow.classList.add('modal-open');
        if (document.body.offsetHeight > window.innerHeight) {
            document.body.classList.add('bodylock');
            document.body.style.paddingRight = getScrollbarWidth() + 'px';

        }
        if (modal.getAttribute('data-modal-open') == 'testimonial') {
            let text = modal.getAttribute('data-descr')
            let photo = modal.closest('.slider-slide').querySelector('.persone-photo img')
            let name = modal.closest('.slider-slide').querySelector('.persone-name')
            let role = modal.closest('.slider-slide').querySelector('.persone-role')
            document.querySelector('.full-testimonial').innerHTML = text;
            modalWindow.querySelector('.persone-photo img').setAttribute('src', photo.getAttribute('src'));
            modalWindow.querySelector('.persone-name').textContent = name.textContent;
            modalWindow.querySelector('.persone-role').textContent = role.textContent;

        }
        if (modal.getAttribute('data-modal-open') == 'video') {
            let videoSrc = modalWindow.querySelector('.m-video').getAttribute('data-video');
            modalWindow.querySelector('.m-video').innerHTML = '<iframe src="' + videoSrc + '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

        }

    }


    var stopVideo = function(element) {
        var iframe = element.querySelector('iframe');
        iframe.remove()
    };


    function closeModal(modal) {
        modal.classList.add('modal-will-close');
        if (modal.getAttribute('data-modal') == 'video') {
            stopVideo(document.querySelector('.m-video'))
        }

        modal.addEventListener("animationend", function() {
            if (modal.classList.contains('modal-will-close')) {
                modalOverlay.classList.remove('overley-active')
                this.classList.remove('modal-open');
                this.classList.remove('modal-will-close');
                if (document.body.offsetHeight > window.innerHeight) {
                    document.body.classList.remove('bodylock');
                    document.body.style.paddingRight = '0px';

                }
            }
        });
    }

    modals.forEach(function(modal) {
        modal.addEventListener('click', function(event) {
            event.preventDefault();
            openModal(modal);
        });
    });

    var modalCloseButtons = document.querySelectorAll('.close-modal')
    if (modalCloseButtons) {
        modalCloseButtons.forEach(function(modalCloseButton) {
            modalCloseButton.addEventListener('click', function(event) {
                event.preventDefault();
                closeModal(modalCloseButton.closest('.modal'))
            });
        });
    }

    if (document.querySelector('.modal')) {
        document.querySelector('.modal').addEventListener('click', function(event) {
            if (!event.target.matches('.modal-open')) return
            closeModal(this);
        });
    }



})