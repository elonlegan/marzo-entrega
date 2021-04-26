jQuery.fn.timelinr = function (options) {
  // default plugin settings
  settings = jQuery.extend(
    {
      orientation: "horizontal", // value: horizontal | vertical, default to horizontal
      containerDiv: "#timeline", // value: any HTML tag or #id, default to #timeline
      datesDiv: "#dates", // value: any HTML tag or #id, default to #dates
      datesSelectedClass: "selected", // value: any class, default to selected
      datesSpeed: "normal", // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
      issuesDiv: "#issues", // value: any HTML tag or #id, default to #issues
      issuesSelectedClass: "selected", // value: any class, default to selected
      issuesSpeed: "fast", // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
      issuesTransparency: 0.3, // value: integer between 0 and 1 (recommended), default to 0.2
      issuesTransparencySpeed: 500, // value: integer between 100 and 1000 (recommended), default to 500 (normal)
      prevButton: "#prev", // value: any HTML tag or #id, default to #prev
      nextButton: "#next", // value: any HTML tag or #id, default to #next
      arrowKeys: "false", // value: true | false, default to false
      startAt: 0, // value: integer, default to 1 (first)
      autoPlay: "false", // value: true | false, default to false
      autoPlayDirection: "forward", // value: forward | backward, default to forward
      autoPlayPause: 2000, // value: integer (1000 = 1 seg), default to 2000 (2segs)
    },
    options
  );

  $(function () {
    // Checks if required elements exist on page before initializing timelinr | improvement since 0.9.55
    if ($(settings.datesDiv).length > 0 && $(settings.issuesDiv).length > 0) {
      // setting variables... many of them
      var howManyDates = $(settings.datesDiv + " li").length;
      var howManyIssues = $(settings.issuesDiv + " li").length;
      var currentDate = $(settings.datesDiv).find(
        "a." + settings.datesSelectedClass
      );
      var currentIssue = $(settings.issuesDiv).find(
        "li." + settings.issuesSelectedClass
      );
      var widthContainer = $(settings.containerDiv).width();
      var heightContainer = $(settings.containerDiv).height();
      var widthIssues = $(settings.issuesDiv).width();
      var heightIssues = $(settings.issuesDiv).height();
      var widthIssue = $(settings.issuesDiv + " li").width();
      var heightIssue = $(settings.issuesDiv + " li").height();
      var widthDates = $(settings.datesDiv).width();
      var heightDates = $(settings.datesDiv).height();
      var widthDate = $(settings.datesDiv + " li").width();
      var heightDate = $(settings.datesDiv + " li").height();
      // set positions!

      if (settings.orientation == "horizontal") {
        $(settings.issuesDiv).width(widthIssue * howManyIssues);
        $(settings.datesDiv)
          .width(widthDate * howManyDates)
          .css("marginLeft", widthContainer / 2 - widthDate / 2);
        var defaultPositionDates = parseInt(
          $(settings.datesDiv)
            .css("marginLeft")
            .substring(0, $(settings.datesDiv).css("marginLeft").indexOf("px"))
        );
      }

      $(settings.datesDiv + " a").click(function (event) {
        event.preventDefault();

        const currentIndex = $(this).parent().prevAll().length;
        if (settings.orientation == "horizontal") {
          $(settings.issuesDiv).animate(
            {marginLeft: -widthIssue * currentIndex},
            {queue: false, duration: settings.issuesSpeed}
          );
        }

        const cards = $(settings.issuesDiv).children("li");

        cards
          .animate(
            {opacity: settings.issuesTransparency},
            {queue: false, duration: settings.issuesSpeed}
          )
          .removeClass(settings.issuesSelectedClass);

        cards
          .eq(currentIndex)
          .addClass(settings.issuesSelectedClass)
          .fadeTo(settings.issuesTransparencySpeed, 1);

        if (currentIndex - 1 < 0) {
          $(settings.nextButton).fadeIn("fast");
          $(settings.prevButton).fadeOut("fast");
        } else if (currentIndex === howManyDates - 1) {
          $(settings.prevButton).fadeIn("fast");
          $(settings.nextButton).fadeOut("fast");
        } else {
          $(settings.nextButton + "," + settings.prevButton).fadeIn("slow");
        }

        // now moving the dates
        $(settings.datesDiv + " a").removeClass(settings.datesSelectedClass);

        $(this).addClass(settings.datesSelectedClass);
        if (settings.orientation == "horizontal") {
          $(settings.datesDiv).animate(
            {marginLeft: defaultPositionDates - widthDate * currentIndex},
            {queue: false, duration: "settings.datesSpeed"}
          );
        }
      });

      $(settings.nextButton).click(function (event) {
        event.preventDefault();

        const currentSelectedDate =
          $("#dates a").index($("#dates a.selected")) || 0;

        $(settings.datesDiv + " li")
          .eq(currentSelectedDate + 1)
          .find("a")
          .trigger("click");
      });

      $(settings.prevButton).click(function (event) {
        event.preventDefault();
        // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
        const currentSelectedDate =
          $("#dates a").index($("#dates a.selected")) || 0;

        $(settings.datesDiv + " li")
          .eq(currentSelectedDate - 1)
          .find("a")
          .trigger("click");
      });

      // keyboard navigation, added since 0.9.1
      if (settings.arrowKeys == "true") {
        if (settings.orientation == "horizontal") {
          $(document).keydown(function (event) {
            if (event.keyCode == 39) {
              $(settings.nextButton).click();
            }
            if (event.keyCode == 37) {
              $(settings.prevButton).click();
            }
          });
        } else if (settings.orientation == "vertical") {
          $(document).keydown(function (event) {
            if (event.keyCode == 40) {
              $(settings.nextButton).click();
            }
            if (event.keyCode == 38) {
              $(settings.prevButton).click();
            }
          });
        }
      }

      // default position startAt, added since 0.9.3
      $(settings.datesDiv + " li")
        .eq(settings.startAt)
        .find("a")
        .trigger("click");

      // autoPlay, added since 0.9.4
      if (settings.autoPlay == "true") {
        // set default timer
        var timer = setInterval(autoPlay, settings.autoPlayPause);
        // pause autoplay on hover
        $(settings.containerDiv).hover(
          function (ev) {
            clearInterval(timer);
          },
          function (ev) {
            // start again timer on mouse out
            timer = setInterval(autoPlay, settings.autoPlayPause);
          }
        );
      }
    }
  });
};

// autoPlay, added since 0.9.4
function autoPlay() {
  var currentDate = $(settings.datesDiv).find(
    "a." + settings.datesSelectedClass
  );
  if (settings.autoPlayDirection == "forward") {
    if (currentDate.parent().is("li:last-child")) {
      $(settings.datesDiv + " li:first-child")
        .find("a")
        .trigger("click");
    } else {
      currentDate.parent().next().find("a").trigger("click");
    }
  } else if (settings.autoPlayDirection == "backward") {
    if (currentDate.parent().is("li:first-child")) {
      $(settings.datesDiv + " li:last-child")
        .find("a")
        .trigger("click");
    } else {
      currentDate.parent().prev().find("a").trigger("click");
    }
  }
}
