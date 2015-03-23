if ( typeof (imageApp) == typeof (undefined)) {
    imageApp = {};
}


imageApp = {
    data : {
        requestTranslateFontURL : 'http://localhost'
    },

    _cacheElement : {
        mainContentInfo : $('#main-content-info'),
        imageForm: $('.image-app-form-div'),
        imageFormChildDiv: $('.image-app-form-div > div'),
        requestImageItem:
            '<div class="requestImageItem">' +
                '<input type="button" class="btn btn-default" value="-" /> ' +
                '<input type="text" class="image-app-form-input-text" name="textContent" placeholder="이미지에 삽입할 문구를 입력하세요." /> ' +
                '<input type="file" class="image-app-form-input-file" name="uploadImage" />' +
            '</div>'
    },

    init : function() {
        this.addEventListener();
    },

    addEventListener : function() {
        this.actionSubmitFontBtnListener();
        this.actionRequestMoreImageBtnListener();
        this.actionRemoveRequestItemtnListener();
    },

    actionSubmitFontBtnListener : function() {
        var self = this;
        $('[data-event-request-image]').on('click', function () {
            self._cacheElement.mainContentInfo.empty();
            var fontname = $("input[name=uploadfont]")[0].files[0].name;
            fontname = fontname.split(".")[0];

            blockUI.block();
            self.requestTranslateFont(fontname);
        });
    },

    requestTranslateFont : function(fontname) {
        $('[data-form-request-font]').ajaxForm({
            type : 'post',
            beforeSubmit : function() {

            },
            success : function(result) {
                blockUI.unblock();

                if (result.status) {
                    '<div class="alert alert-info font-app-alert" role="alert">변환이 완료되었습니다.</div>' +
                    '<div class="bs-callout bs-callout-info">' +
                    '<h4>How To Use WebFont</h4>' +
                    "<p>@font-face {<br>&nbsp;&nbsp;font-family: '" + filename + "';<br>&nbsp;&nbsp;src:url('FontFilePath'/" + filename + ".woff') format('woff')<br>}<br>." + filename + "{<br>&nbsp;&nbsp;font-family: '" + filename + "';<br>}</p>" +
                    '</div>';
                } else {
                    '<div class="alert alert-danger font-app-alert" role="alert">변환을 실패하였습니다.</div>' +
                    '<div class="bs-callout bs-callout-danger">' +
                    '<h4>변환 할 파일을 확인 후, 다시 시도해주세요.</h4>' +
                    '</div>';
                }
            }
        });
    },

    actionRequestMoreImageBtnListener : function() {
        var imageForm = $('.image-app-form-div');
        var self = this;
        $('[data-event-request-more-image]').on('click', function() {
            var requestImageItemCnt = $('.image-app-form-div > div').size();
            var makedItem = self.generateRequestItem(requestImageItemCnt);
            imageForm.append(makedItem);
        })
    },

    generateRequestItem : function(index) {
        var itemNumber = index + 1;
        var item =
            '<div class="requestImageItem" data-request-image-item-info=' + itemNumber + "" +'>' +
                '<input type="button" class="btn btn-default" value="-" data-event-remove-request-image-item=' + itemNumber + "" + '/> ' +
                '<input type="text" class="image-app-form-input-text" name="textContent" placeholder="이미지에 삽입할 문구를 입력하세요." /> ' +
                '<input type="file" class="image-app-form-input-file" name="uploadImage" />' +
            '</div>'
        return item;
    },

    actionRemoveRequestItemtnListener : function() {
        $('body').on('click', '[data-event-remove-request-image-item]', function() {
            this.parentNode.remove();
        })
    }
}

blockUI = {
    block: function() {
        $.blockUI({
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    },
    unblock: function() {
        $.unblockUI();
    }
}

$(document).ready(function() {
    imageApp.init();
})