
+ function($) {
    'use strict';
    // PRODUCTS CAROUSLE DENIFITION
    //============================   
    var ProductCarousel = function(element, options) {
        this.$element = $(element)
        this.$panels = this.$element.find('.product-panel')
        this.options = options
        this.paused = null
        this.sliding = null
        this.interval = null
        this.$active = null

        this.options.keyboard && this.$element.on('keydown.bs.productCarousel', $.proxy(this.keydown, this))

        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
            .on('mouseenter.bs.productCarousel', $.proxy(this.pause, this))
            .on('mouseleave.bs.productCarousel', $.proxy(this.cycle, this))

    }

    ProductCarousel.VERSION = '1.0.0'

    ProductCarousel.TRANSITION_DURATION = 600

    ProductCarousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    }

    ProductCarousel.prototype.keydown = function(e) {
        if (/input|texteare/i.test(e.target.tagName)) return
     
        switch (e.which) {
            case 37:
                this.prev()
                return
            case 39:
                this.next()
                return
            default:
                return
        }
        e.preventDefault()
    }

    ProductCarousel.prototype.cycle = function(e) {
        e || (this.paused = false)

        this.interval && clearInterval(this.interval)
            //alert("cycle"+e +"isPaused"+this.paused)
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

        return this
    }

    ProductCarousel.prototype.getPanelIndex = function(item) {

        return this.$panels && this.$panels.index(item || this.$active)
    }

    ProductCarousel.prototype.getPanelForDirection = function(direction, active) {
        var activeIndex = this.getPanelIndex(active)

        var willWrap = (direction == 'prev' && activeIndex === 0) || (direction == 'next' && activeIndex == (this.$panels.length - 1))

        if (willWrap && !this.options.wrap) return

        var delta = direction == 'prev' ? -1 : 1

        var panelIndex = (activeIndex + delta) % this.$panels.length

        return this.$panels.eq(panelIndex)
    }

    ProductCarousel.prototype.to = function(pos) {
        var that = this
        var activeIndex = this.getPanelIndex(this.$active = this.$element.find('.product-panel.active'))
        if (pos > (this.$panels.length - 1) || pos < 0) return
        if (this.sliding) return
        this.$element.one('slid.bs.productCarousel', function() { that.to(pos) })
        if (activeIndex == pos) return this.pause().cycle()

        return this.silde(pos > activeIndex ? 'next' : 'prev', this.$panels.eq(pos))
    }


    ProductCarousel.prototype.pause = function(e) {

        e || (this.paused = true)

        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
                //alert("aftertrigger")
            this.cycle(true)
        }

        this.interval = clearInterval(this.interval)

        return this
    }

    ProductCarousel.prototype.next = function() {
        if (this.sliding) return
        return this.slide('next')
    }

    ProductCarousel.prototype.prev = function() {

        if (this.sliding) return
        return this.slide('prev')
    }

    ProductCarousel.prototype.slide = function(type, next) {

        var $active = this.$element.find('.product-panel.active')

        var $next = next || this.getPanelForDirection(type, $active)
            // becareful if slide from right to left
        var $prev 

        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var that = this

        if ($next.hasClass('active')) return (this.sliding = false)

        var relatedTarget = $next[0]
        var slideEvent = $.Event('silde.bs.productCarousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)

        if (slideEvent.isDefaultPrevented()) return

        this.sliding = true

        isCycling && this.pause()

        var slidEvent = $.Event('slid.bs.productCarousel', {
                relatedTarget: relatedTarget,
                direction: direction
            }) //slid event

        if ($.support.transition && this.$element.hasClass('slide')) {
           
           if( type == 'next' ){
            $prev = $active.prev()

           	this.$panels.first().insertAfter(this.$panels.last()) 
           	this.$panels = this.$element.find('.product-panel')

            $next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $prev.addClass(direction)
            $active
                .one('bsTransitionEnd', function() {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' ')).addClass('prev')
                    $prev.removeClass(['prev', direction].join(' '))
                    $next.next().addClass("next")

                    that.sliding = false
                    setTimeout(function() {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(ProductCarousel.TRANSITION_DURATION)
          } 
          if(type == 'prev' ){
        	$prev = $active.next()
        	this.$panels.last().insertBefore(this.$panels.first())
        	this.$panels = this.$element.find('.product-panel')
        	//$next.addClass(type)
            $next[0].offsetWidth // force reflow
            $active.addClass(direction)
            $next.addClass(direction)
            $prev.addClass(direction)
            $active
                .one('bsTransitionEnd', function() {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' ')).addClass('next')
                    $prev.removeClass(['prev', direction].join(' '))
                    $next.prev().addClass("prev")
                    $active.next().removeClass('next')

                    that.sliding = false
                    setTimeout(function() {
                        that.$element.trigger(slidEvent)
                    }, 0)
                })
                .emulateTransitionEnd(ProductCarousel.TRANSITION_DURATION)
        }      	
        } else {
            $prev = type=='next' ?$active.prev():$active.next()

            $active.removeClass('active')
            $next.addClass('active')
            $prev.removeClass('prev')
            $next.next().addClass("next")
            this.sliding = false
            this.$element.trigger(slidEvent)
        }
       
      /*  $prev.removeClass(['prev', direction].join(' '))
        $next.removeClass(['next', direction].join(' ')).addClass('active')
        $active.removeClass(['active', direction].join(' '))
        $active.addClass('prev')
        $next.next().addClass("next")
        $(that.$panels.first()).insertAfter($(that.$panels.last()))
        this.$panels = that.$element.find('.product-panel')
        this.sliding = false
        this.$element.trigger(slidEvent)
*/
        isCycling && this.cycle()

        return this
    }

    // PORDUCT CAROUSEL PLUGIN DEFINITION
    //=====================================
    function Plugin(option) {

        return this.each(function() {

            var $this = $(this)
            var data = $this.data('bs.productCarousel')

            var options = $.extend({}, ProductCarousel.DEFAULTS, $this.data(), typeof option == 'object' && option)

            var action = typeof option == 'string' ? option : options.slide
           
            if (!data) $this.data('bs.productCarousel', (data = new ProductCarousel(this, options)))

            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    var old = $.fn.productCarousel
    $.fn.productCarousel = Plugin
    $.fn.productCarousel.Constructor = ProductCarousel

    // PRODUCT CARUOSEL ON CONFLICT
    //============
    $.fn.productCarousel.onConflict = function() {
        $.fn.productCarousel = old
        return this
    }

    // PRODUCT CAROUSEL DATA-API
    //=============
    var clickHandler = function(e) {
        var href
        var $this = $(this)

        var $target = $((href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
            
        if (!$target.hasClass("product-carousel")) return

        var options = $.extend({}, $target.data(), $this.data())

        Plugin.call($target, options)

        e.preventDefault()
    }

    $(document).on('click.bs.productCarousel.data-api', '[data-slide]', clickHandler)

    $(window).on('load', function() {

        $('[data-ride="product-carousel"]').each(function() {

            var $productCarousel = $(this)

            Plugin.call($productCarousel, $productCarousel.data())
        })

    })

}(jQuery);
