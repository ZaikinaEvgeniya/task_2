/**
 * Created by evga on 15.08.16.
 */
(function ($) {

    var methods = {
        $form: null,
        $butt: null,
        $this: null,

        init: function(options) {
            this.$this = $(this);
            methods.createForm();

            var settings = $.extend( {}, $.fn.myPlugin.defaults, options );
            this.$form = $("#modal_form");
            //noinspection JSUnresolvedFunction
            this.$butt = this.$form.find(".button");

            if(settings.p1_check == true) {
                this.$form.find("input:eq(0)").addClass("ness_chek");
            }
            if(settings.p2_check == true) {
                this.$form.find("input:eq(1)").addClass("ness_chek");
            }
            if(settings.p3_check == true) {
                this.$form.find("input:eq(2)").addClass("ness_chek");
            }
            if(settings.p4_check == true) {
                this.$form.find("input:eq(3)").addClass("ness_chek");
            }
            $("h3").text(settings.h.toUpperCase());
            this.$form.find("lable:eq(0)").text(settings.p1);
            this.$form.find("lable:eq(1)").text(settings.p2);
            this.$form.find("lable:eq(2)").text(settings.p3);
            this.$form.find("lable:eq(3)").text(settings.p4);
            this.$butt.val( settings.b.toUpperCase() );

            this.$form.find(".ness_chek").addClass("empty");

            this.$butt.click(methods.clickButton);
            this.$form.find('#modal_close, #overlay').click(methods.closeForm);
            this.$this.click(methods.showForm);

            return this;
        },

        showForm: function() {
            var form = $("#modal_form");
            form.find('#overlay').fadeIn(200);//показать подложку
            form
                .css('display', 'block')
                .animate({opacity: 1, top: '50%'}, 200);
        },

        createForm: function() {
            $("body").append("<div id='overlay'></div>")
                .append("<div id='modal_form'></div>");
            var form = $("#modal_form");

            form.append("<form action='' method='post' class='form'></form>")
                .append("<span id='modal_close'>X</span>");
            form.find(".form").append("<h3>");

            for (var i = 0;i < 4; i++){
                form.find(".form").append("<lable></lable>")
                    .append("<input type='text'/>");
            }

            form.find(".form").append("</br><input class='button disabled' id='butt' type='submit' />");
        },

        closeForm: function() {
            $("#modal_form")
                .css('display', 'none')
                .find('#overlay')
                .fadeOut(400); // скрываем подложку
        },

        logic: function() { //логика проверки
            methods.chekInput();
            var form = $("#modal_form");
            var count = form.find( ".empty" ).length; //подсчет пустых

            if(count > 0) {
                if(form.find("#butt").hasClass('disabled')) {
                    return false
                } else {
                    form.find("#butt").addClass('disabled')
                }
            } else {
                form.find("#butt").removeClass('disabled')
            }
        },

        chekInput: function(){ //проверка полей
            $("#modal_form").find( ".ness_chek" ).each(function() {
                if($(this).val() != '') {
                    //поле не пустое
                    $(this).removeClass( "empty" );
                } else {
                    //поле пустое
                    $(this).addClass( "empty" );                }
            });
        },

        attention: function() {
            $("#modal_form").find(".empty").css('border-color', 'red');

            setTimeout(function() {
                $("#modal_form").find('.empty').removeAttr('style');
            },500);
        },

        clickButton: function() {
            methods.logic();

            if($(this).hasClass('disabled')) {
                methods.attention();
                return false
            } else {
                //отправка
                $("#modal_form").submit();
            }
        }

    };

    $.fn.myPlugin = function(options) {
        if ( methods[options] ) {
            return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof options === 'object' || ! options ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод ' +  options + ' в jQuery.tooltip не существует' );
        }
    };

    $.fn.myPlugin.defaults = {
        h: "Обратная связь",
        p1: "Ваше имя",
        p2: "Телефон",
        p3: "Email",
        p4: "Сообщение",
        b: "отправить",
        p1_check: true,
        p2_check: false,
        p3_check: false,
        p4_check: false
    }

}( jQuery ));
