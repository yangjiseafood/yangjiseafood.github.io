 function setScrollBar(target, oParent) {
    //
    var viewH = oParent.height() - 60;
    var realH = target.outerHeight() - oParent.height();
    $('<div class="ScrollBg"><div class="ScrollBar"></div></div>').appendTo(oParent);
    if ($(".ScrollBar")) {
        var bar = $(".ScrollBar", oParent);
        var draggable = false,
            disX = 0,
            disY = 0,
            vel = 0,
            oParentL = oParent.offset().left,
            oParentT = oParent.offset().top,
            elW = bar.width(),
            elH = bar.height(),
            maxL = parseInt(bar.css("left")),
            maxT = oParent.height() - bar.height();
        bar.bind("mousedown", function (e) {
            var e = $.event.fix(e);
            draggable = true;
            disX = e.pageX - $(this).offset().left;
            disY = e.pageY - $(this).offset().top;
            hookL = disX + oParentL;
            hookT = disY + oParentT;
            return false;
        });
        oParent.bind("mousemove", function (e) {
            var e = $.event.fix(e);
            if (!draggable) return;
            var l = e.pageX - hookL,
                t = e.pageY - hookT;
            l = 0;
            t = t < 0 ? 0 : t;
            t = t > maxT ? maxT : t;
            var contS = parseInt((t / viewH) * realH);
            bar.css({
                "left": "0",
                "top": t + "px",
                "margin": 0
            });
            target.css({
                "margin-top": "-" + contS + "px"
            })
            return false;
        });
        oParent.bind("mouseup", function () {
            draggable = false;
        });
        if ($(document).mousewheel) {
            oParent.bind("mousewheel", function (event, delta) {
                event.preventDefault();
                if (delta == 1) {
                    vel = vel - 30;
                } else if (delta == -1) {
                    vel = vel + 30;
                }
                vel = vel < 0 ? 0 : vel;
                vel = vel > maxT ? maxT : vel;
                var contS = parseInt((vel / viewH) * realH);
                bar.css({
                    "left": "0",
                    "top": vel + "px",
                    "margin": 0
                });
                target.css({
                    "margin-top": "-" + contS + "px"
                })
            });
        };
    };
};