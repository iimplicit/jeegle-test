if ( typeof (camanApp) == typeof (undefined)) {
    camanApp = {};
}


camanApp = {
    data : {
        slideOption : {
            brightnessOpt :
                'value: 0, min: -50, max: 50, step: 1'
            ,
            contrastOpt : {
                value: 0,
                min: -50,
                max: 50,
                step: 1
            },

            stackBlurOpt: {
                value: 0,
                min: 0,
                max: 10,
                step: 1
            }
        }
    },

    selectPanelHandler : {
        'init' : function() {
            var imageTag = '<img id="main-target" src="../public/images/2.jpg" >';
            $('.starter-template').empty();
            $('.starter-template').append(imageTag);

            $("#brightness-slider").slider('destroy');
            $("#contrast-slider").slider('destroy');
            $("#stackBlur-slider").slider('destroy');

            camanApp.setImageSliderEventListener();
        },

        'glowing-sun' : function() {
            Caman("#main-target", function () {
                this.brightness(10);
                this.newLayer(function() {
                    this.setBlendingMode("multiply");
                    this.opacity(80);
                    this.copyParent();
                    this.filter.gamma(0.8);
                    this.filter.contrast(50);
                    this.filter.exposure(10);
                });

                this.newLayer(function() {
                    this.setBlendingMode("softLight");
                    this.opacity(80);
                    this.fillColor("#f49600");
                });

                this.exposure(20);
                this.gamma(0.8);
                this.vignette("45%", 20);

                this.render();
            });
        },

        'vintage' : function() {
            Caman("#main-target", function () {
                this.greyscale();
                this.contrast(5);
                this.noise(3);
                this.sepia(100);
                this.channels({
                    red: 8,
                    blue: 2,
                    green: 4
                });
                this.gamma(0.87);
                this.vignette("40%", 30);

                this.render();
            });
        },

        'jarques' : function() {
            Caman("#main-target", function () {
                this.saturation(-35);
                this.curves('b', [20, 0], [90, 120], [186, 144], [255, 230]);
                this.curves('r', [0, 0], [144, 90], [138, 120], [255, 255]);
                this.curves('g', [10, 0], [115, 105], [148, 100], [255, 248]);
                this.curves('rgb', [0, 0], [120, 100], [128, 140], [255, 255]);
                this.sharpen(20);

                this.render();
            });
        },

        'clarity' : function() {
            Caman("#main-target", function () {
                this.vibrance(20);
                this.curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255]);
                this.sharpen(15);
                this.vignette("45%", 20);
                this.greyscale();
                this.contrast(4);

                this.render();
            });
        }
    },

    init : function() {
        this.addEventListener();
        this.camanLibraryInit();
        this.setImageSliderEventListener();
    },

    addEventListener : function() {
        this.setImageFilter();
    },

    setImageFilter : function() {
        $('[data-preset]').on('click', function () {
            var selectedValue = $(this).attr('data-preset');
            camanApp.selectPanelHandler[selectedValue]();
        });
    },

    camanLibraryInit: function() {
        Caman('#main-target', function () {
            this.render();
        });
    },

    setImageSliderEventListener : function() {
        this.initSliderSetting();
    },

    initSliderSetting : function() {
        $("#brightness-slider").slider({
            value: 0,
            min: -50,
            max: 50,
            step: 1,

            change: function(event, ui) {
                Caman("#main-target", function () {
                    this.brightness(ui.value).render();
                });
            }
        });

        $("#contrast-slider").slider({
            value: 0,
            min: -50,
            max: 50,
            step: 1,

            change: function(event, ui) {
                Caman("#main-target", function () {
                    this.contrast(ui.value).render();
                });
            }
        });


        $("#stackBlur-slider").slider({
            value: 0,
            min: 0,
            max: 20,
            step: 1,

            change: function(event, ui) {
                $('#main-target').foggy({
                    blurRadius: ui.value,    // In pixels.
                    opacity: 0.8,           // Falls back to a filter for IE.
                    cssFilterSupport: true  // Use "-webkit-filter" where available.
                });
            }

        });
    }
}

$(document).ready(function() {
    camanApp.init();
})