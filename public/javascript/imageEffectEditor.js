if ( typeof (imageApp) == typeof (undefined)) {
    imageApp = {};
}

//  참고..
//            grayscale : 100 + '%', // 0~ 100
//            _blur: 0 + 'px', // 10
//            brightness: 100 + '%', // 200
//            contrast: 100 + '%', // 200
//            hue_rotate: 0 + 'deg', // 360
//            opacity: 100 + '%', // 0 ~ 100
//            invert: 0 + '%', // 0 ~ 100
//            saturate: 100 + '%', // 0 ~ 500
//            sepia: 0 + '%' // 0 ~ 100

imageApp = {
    targetImage : $('#main-target'),

    imageFilterConfig : {
        type: 'default',
        grayscale : 0, // 100
        _blur: 0, // 10
        brightness: 100, // 200
        contrast: 100, // 200
        hue_rotate: 0, // 360
        opacity: 100, // 0 ~ 100
        invert: 0, // 0 ~ 100
        saturate: 100, // 0 ~ 500
        sepia: 0 // 0 ~ 100
    },

    imageFilterType: {
        default: {
            grayscale : 0, // 100
            _blur: 0, // 10
            brightness: 0, // 200
            contrast: 0, // 200
            hue_rotate: 0, // 360
            opacity: 0, // 0 ~ 100
            invert: 0, // 0 ~ 100
            saturate: 0, // 0 ~ 500
            sepia: 0 // 0 ~ 100
        },

        vintage: {
            grayscale : 0, // 100
            _blur: 0, // 10
            brightness: 0, // 200
            contrast: 0, // 200
            hue_rotate: 0, // 360
            opacity: 0, // 0 ~ 100
            invert: 0, // 0 ~ 100
            saturate: 0, // 0 ~ 500
            sepia: 100 // 0 ~ 100
        },

        clarity: {
            grayscale : 100, // 100
            _blur: 0, // 10
            brightness: 0, // 200
            contrast: 0, // 200
            hue_rotate: 0, // 360
            opacity: 0, // 0 ~ 100
            invert: 0, // 0 ~ 100
            saturate: 0, // 0 ~ 500
            sepia: 0 // 0 ~ 100
        }
    },

    slideOption : {
        brightnessOpt : 'value: 100, min: 0, max: 200, step: 1',
        contrastOpt : 'value: 100, min: 0, max: 200, step: 1',
        blurOpt: 'value: 0, min: 0, max: 10, step: 1'
    },

    init : function() {
        this.addEventListener();
        this.setImageSliderEventListener();
    },

    addEventListener : function() {
        this.setImageFilterType();
    },

    setImageFilterType : function() {
        $('[data-preset]').on('click', function () {
            var selectedFilterType = $(this).attr('data-preset');
            imageApp.imageFilterConfig.type = selectedFilterType;

            if(selectedFilterType == 'default') {
                imageApp.initSliderSetting();
                imageApp.initImageFilterConfig();
            }

            imageApp.setImageFilter();
        });
    },

    setImageFilter : function() {
        var selectedFilterType = imageApp.imageFilterConfig.type;

        imageApp.targetImage.css("filter",
            'grayscale(' + (imageApp.imageFilterConfig.grayscale + imageApp.imageFilterType[selectedFilterType].grayscale) + '%)' +
            'blur(' + (imageApp.imageFilterConfig._blur + imageApp.imageFilterType[selectedFilterType]._blur) + 'px)' +
            'brightness(' + (imageApp.imageFilterConfig.brightness + imageApp.imageFilterType[selectedFilterType].brightness) + '%)' +
            'contrast(' + (imageApp.imageFilterConfig.contrast + imageApp.imageFilterType[selectedFilterType].contrast) + '%)' +
            'hue-rotate(' + (imageApp.imageFilterConfig.hue_rotate + imageApp.imageFilterType[selectedFilterType].hue_rotate) + 'deg)' +
            'opacity(' + (imageApp.imageFilterConfig.opacity + imageApp.imageFilterType[selectedFilterType].opacity) + '%)' +
            'invert(' + (imageApp.imageFilterConfig.invert + imageApp.imageFilterType[selectedFilterType].invert) + '%)' +
            'saturate(' + (imageApp.imageFilterConfig.saturate + imageApp.imageFilterType[selectedFilterType].saturate) + '%)' +
            'sepia(' + (imageApp.imageFilterConfig.sepia + imageApp.imageFilterType[selectedFilterType].sepia) + '%)'
        );

        imageApp.targetImage.css("-webkit-filter",
            'grayscale(' + (imageApp.imageFilterConfig.grayscale + imageApp.imageFilterType[selectedFilterType].grayscale) + '%)' +
            'blur(' + (imageApp.imageFilterConfig._blur + imageApp.imageFilterType[selectedFilterType]._blur) + 'px)' +
            'brightness(' + (imageApp.imageFilterConfig.brightness + imageApp.imageFilterType[selectedFilterType].brightness) + '%)' +
            'contrast(' + (imageApp.imageFilterConfig.contrast + imageApp.imageFilterType[selectedFilterType].contrast) + '%)' +
            'hue-rotate(' + (imageApp.imageFilterConfig.hue_rotate + imageApp.imageFilterType[selectedFilterType].hue_rotate) + 'deg)' +
            'opacity(' + (imageApp.imageFilterConfig.opacity + imageApp.imageFilterType[selectedFilterType].opacity) + '%)' +
            'invert(' + (imageApp.imageFilterConfig.invert + imageApp.imageFilterType[selectedFilterType].invert) + '%)' +
            'saturate(' + (imageApp.imageFilterConfig.saturate + imageApp.imageFilterType[selectedFilterType].saturate) + '%)' +
            'sepia(' + (imageApp.imageFilterConfig.sepia + imageApp.imageFilterType[selectedFilterType].sepia) + '%)'
        );
    },

    setImageSliderEventListener : function() {
        this.initSliderSetting();
    },

    initSliderSetting : function() {
        $("#brightness-slider").slider({
            value: 100,
            min: 0,
            max: 200,
            step: 1,
            slide: function(event, ui) {
                imageApp.imageFilterConfig.brightness = ui.value;
                imageApp.setImageFilter();
            }
        });

        $("#contrast-slider").slider({
            value: 100,
            min: 0,
            max: 200,
            step: 1,
            slide: function(event, ui) {
                imageApp.imageFilterConfig.contrast = ui.value;
                imageApp.setImageFilter();
            }
        });


        $("#blur-slider").slider({
            value: 0,
            min: 0,
            max: 10,
            step: 1,
            slide: function(event, ui) {
                imageApp.imageFilterConfig._blur = ui.value;
                imageApp.setImageFilter();
            }
        });
    },

    initImageFilterConfig : function() {
        imageApp.imageFilterConfig =  {
            type: 'default',
            grayscale: 0, // 100
            _blur: 0, // 10
            brightness: 100, // 200
            contrast: 100, // 200
            hue_rotate: 0, // 360
            opacity: 100, // 0 ~ 100
            invert: 0, // 0 ~ 100
            saturate: 100, // 0 ~ 500
            sepia: 0 // 0 ~ 100
        }
    }
}

$(document).ready(function() {
    imageApp.init();
})