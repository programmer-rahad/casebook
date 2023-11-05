
// jQuery
$(document).ready(function () {
  $(".menu-icon").click(function () {
    $(this).toggleClass("active");
    $("body").toggleClass("overflow-hidden");
    $(".left-sidebar").toggleClass("active");
  });

  if ($(".modal").length) {
    $(".modal").modal({
      backdrop: "static",
      keyboard: false,
    });
  }

  //$(window).on("load", function () {
  var token = getUrlParametreValeur("token");
  if (token != "678af060-f4cd-11ec-86ec-23adb79e5d93") {
    if ($(".modal").length) {
      var is_modal_show = sessionStorage.getItem("alreadyShow");
      if (is_modal_show != "alredy shown") {
        $(".modal").modal("show"); 
      }
    }
  } else {
    sessionStorage.setItem("alreadyShow", "alredy shown");
  }
  //});
  $("body").removeClass("hide");

  // Password
  $("#PasswordModal form").on("submit", function (event) {
    event.preventDefault();

    if ($("#password").val() == "1234") {
      sessionStorage.setItem("alreadyShow", "alredy shown");
      $(".modal").modal("hide");
    } else {
      $("#bad-password").removeClass("d-none");
    }

  });

  // Show Answer

  $(".submit-button-wrapper a.pink-button").click(function () {
    // var parent = $(this).parent().siblings(".radio-options");
    // console.log(parent);
    $(this).parent().siblings("ul.radio-options").addClass("active");
    $(this)
      .parent()
      .siblings("ul.radio-options")
      .find('.right input[type="radio"]')
      .prop("checked", true);
    $(this)
      .parent()
      .siblings("ul.radio-options")
      .find('input[type="radio"]')
      .attr("disabled", true);
  });

  //switch lang

  var other_lang = window.location.href;

  other_lang = other_lang.replace("/en/", "/fr/");

  $(".language-switcher").attr("href", other_lang);
  
});

// Custom JS
document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var menuIcon = document.querySelector(".menu-icon");
  var leftSidebar = document.querySelector(".left-sidebar");
  var rightSidebar = document.querySelector(".right-sidebar");

  var middleContent = document.querySelector(".middle-content");

  videoPlay();
  function videoPlay() {
    var buttons = document.querySelectorAll("a.play-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        var video = this.parentElement.firstElementChild;
        var img = this.previousElementSibling;
        img.classList.add("d-none");
        video.classList.add("d-block");
        this.classList.add("d-none");
        video.play();
        e.preventDefault();
      });
    }
  }

  accordion();
  function accordion() {
    var accordionItems = document.querySelectorAll(".accordion--item");
    var titles = document.querySelectorAll(".accordion__title");

    if (accordionItems.length) {
      function slideUp(el) {
        el.classList.remove("active");
        el.children[1].style.height = 0;
      }
      function slideDown(el) {
        el.classList.add("active");
        el.children[1].style.height =
          el.children[1].children[0].offsetHeight + "px";
      }
      for (let i = 0; i < titles.length; i++) {
        titles[i].addEventListener("click", function () {
          const item = this.parentElement;
          if (item.classList.contains("active")) {
            slideUp(item);
          } else {
            slideDown(item);
          }
        });
      }
    }
  }

  showAnswer();
  function showAnswer() {
    var submitButtons = document.querySelectorAll(
      ".submit-button-wrapper a.pink-button"
    );

    for (let i = 0; i < submitButtons.length; i++) {
      submitButtons[i].addEventListener("click", function (e) {
        var submitButtonWrapper = this.parentElement;
        submitButtonWrapper.classList.add("d-none");
        submitButtonWrapper.nextElementSibling.classList.remove("d-none");

        e.preventDefault();
      });
    }
  }

  DisableRadio();
  function DisableRadio() {
    jQuery('.show input[type="radio"]').attr("disabled", true);
  }

  knowledgeTestOne();
  function knowledgeTestOne() {
    var button = document.querySelector("a.knowledge-test");
    var boxItems = Array.from(
      document.querySelectorAll(
        ".middle-content > div:first-child, .middle-content .box-item"
      )
    );
    var knowledgeBoxOne = document.querySelector(".knowledge-test-box.one");

    if (knowledgeBoxOne) {
      if (button) {
        button.addEventListener("click", function (e) {
          leftSidebar.classList.remove("active");
          menuIcon.classList.remove("active");
          body.classList.remove("overflow-hidden");
          if (window.innerWidth < 1200) {
            rightSidebar.style.display = "none";
          }
          for (let i = 0; i < boxItems.length; i++) {
            boxItems[i].style.display = "none";
          }
          Object.assign(knowledgeBoxOne.style, {
            display: "block",
          });
          window.scrollTo(0, 0);
          e.preventDefault();
        });
      }

      // Go to Next
      var nextButtonOne = document.querySelector(".one .next-and-submit a");
      var questionItemsOne = document.querySelectorAll(
        ".one .knowledge-test-question"
      );
      var currentNumberOne = document.querySelector(".one .current-number");
      var totalNumberOne = document.querySelector(".one .total-number");

      totalNumberOne.innerText = questionItemsOne.length;

      nextButtonOne.addEventListener("click", function (e) {
        var activeItem = document.querySelector(
          ".one .knowledge-test-questions .active-item"
        );

        if (activeItem === questionItemsOne[questionItemsOne.length - 2]) {
          this.innerText = "Submit";
          this.classList.add("submit");
          $(".submit").on("click", function () {
            window.location = "allison-knowledge-check.html";
          });
        }

        if (activeItem.nextElementSibling) {
          currentNumberOne.innerText++;
          for (var i = 0; i < questionItemsOne.length; i++) {
            questionItemsOne[i].classList.add("d-none");
            questionItemsOne[i].classList.remove("active-item");
          }
          activeItem.nextElementSibling.classList.remove("d-none");
          activeItem.nextElementSibling.classList.add("active-item");
        }

        e.preventDefault();
      });
    }
  }

  knowledgeTestTwo();
  function knowledgeTestTwo() {
    var button = document.querySelector("a.knowledge-test");
    var boxItems = Array.from(
      document.querySelectorAll(
        ".middle-content > div:first-child, .middle-content .box-item"
      )
    );
    var knowledgeBoxTwo = document.querySelector(".knowledge-test-box.two");

    if (knowledgeBoxTwo) {
      if (button) {
        button.addEventListener("click", function (e) {
          leftSidebar.classList.remove("active");
          menuIcon.classList.remove("active");
          body.classList.remove("overflow-hidden");
          if (window.innerWidth < 1200) {
            rightSidebar.style.display = "none";
          }
          for (let i = 0; i < boxItems.length; i++) {
            boxItems[i].style.display = "none";
          }
          Object.assign(knowledgeBoxTwo.style, {
            display: "block",
          });
          window.scrollTo(0, 0);
          e.preventDefault();
        });
      }

      // Go to Next
      var nextButtonTwo = document.querySelector(".two .next-and-submit a");
      var questionItemsTwo = document.querySelectorAll(
        ".two .knowledge-test-question"
      );
      var currentNumberTwo = document.querySelector(".two .current-number");
      var totalNumberTwo = document.querySelector(".two .total-number");

      totalNumberTwo.innerText = questionItemsTwo.length;

      nextButtonTwo.addEventListener("click", function (e) {
        var activeItem = document.querySelector(
          ".two .knowledge-test-questions .active-item"
        );

        if (activeItem === questionItemsTwo[questionItemsTwo.length - 2]) {
          this.innerText = "Submit";
          this.classList.add("submit");
          $(".submit").on("click", function () {
            window.location = "luciana-knowledge-check.html";
          });
        }

        if (activeItem.nextElementSibling) {
          currentNumberTwo.innerText++;
          for (var i = 0; i < questionItemsTwo.length; i++) {
            questionItemsTwo[i].classList.add("d-none");
            questionItemsTwo[i].classList.remove("active-item");
          }
          activeItem.nextElementSibling.classList.remove("d-none");
          activeItem.nextElementSibling.classList.add("active-item");
        }

        e.preventDefault();
      });
    }
  }

  knowledgeTestThree();
  function knowledgeTestThree() {
    var button = document.querySelector("a.knowledge-test");
    var boxItems = Array.from(
      document.querySelectorAll(
        ".middle-content > div:first-child, .middle-content .box-item"
      )
    );
    var knowledgeBoxThree = document.querySelector(".knowledge-test-box.three");

    if (knowledgeBoxThree) {
      if (button) {
        button.addEventListener("click", function (e) {
          leftSidebar.classList.remove("active");
          menuIcon.classList.remove("active");
          body.classList.remove("overflow-hidden");
          if (window.innerWidth < 1200) {
            rightSidebar.style.display = "none";
          }
          for (let i = 0; i < boxItems.length; i++) {
            boxItems[i].style.display = "none";
          }
          Object.assign(knowledgeBoxThree.style, {
            display: "block",
          });
          window.scrollTo(0, 0);
          e.preventDefault();
        });
      }

      // Go to Next
      var nextButtonThree = document.querySelector(".three .next-and-submit a");
      var questionItemsThree = document.querySelectorAll(
        ".three .knowledge-test-question"
      );
      var currentNumberThree = document.querySelector(".three .current-number");
      var totalNumberThree = document.querySelector(".three .total-number");

      totalNumberThree.innerText = questionItemsThree.length;

      nextButtonThree.addEventListener("click", function (e) {
        var activeItem = document.querySelector(
          ".three .knowledge-test-questions .active-item"
        );

        if (activeItem === questionItemsThree[questionItemsThree.length - 2]) {
          this.innerText = "Submit";
          this.classList.add("submit");
          $(".submit").on("click", function () {
            window.location = "robert-knowledge-check.html";
          });
        }

        if (activeItem.nextElementSibling) {
          currentNumberThree.innerText++;
          for (var i = 0; i < questionItemsThree.length; i++) {
            questionItemsThree[i].classList.add("d-none");
            questionItemsThree[i].classList.remove("active-item");
          }
          activeItem.nextElementSibling.classList.remove("d-none");
          activeItem.nextElementSibling.classList.add("active-item");
        }

        e.preventDefault();
      });
    }
  }

  knowledgeTestFour();
  function knowledgeTestFour() {
    var button = document.querySelector("a.knowledge-test");
    var boxItems = Array.from(
      document.querySelectorAll(
        ".middle-content > div:first-child, .middle-content .box-item"
      )
    );
    var knowledgeBoxFour = document.querySelector(".knowledge-test-box.four");

    if (knowledgeBoxFour) {
      if (button) {
        button.addEventListener("click", function (e) {
          leftSidebar.classList.remove("active");
          menuIcon.classList.remove("active");
          body.classList.remove("overflow-hidden");
          if (window.innerWidth < 1200) {
            rightSidebar.style.display = "none";
          }
          for (let i = 0; i < boxItems.length; i++) {
            boxItems[i].style.display = "none";
          }
          Object.assign(knowledgeBoxFour.style, {
            display: "block",
          });
          window.scrollTo(0, 0);
          e.preventDefault();
        });
      }

      // Go to Next
      var nextButtonFour = document.querySelector(".four .next-and-submit a");
      var questionItemsFour = document.querySelectorAll(
        ".four .knowledge-test-question"
      );
      var currentNumberFour = document.querySelector(".four .current-number");
      var totalNumberFour = document.querySelector(".four .total-number");

      totalNumberFour.innerText = questionItemsFour.length;

      nextButtonFour.addEventListener("click", function (e) {
        var activeItem = document.querySelector(
          ".four .knowledge-test-questions .active-item"
        );

        if (activeItem === questionItemsFour[questionItemsFour.length - 2]) {
          this.innerText = "Submit";
          this.classList.add("submit");
          $(".submit").on("click", function () {
            window.location = "caroline-knowledge-check.html";
          });
        }

        if (activeItem.nextElementSibling) {
          currentNumberFour.innerText++;
          for (var i = 0; i < questionItemsFour.length; i++) {
            questionItemsFour[i].classList.add("d-none");
            questionItemsFour[i].classList.remove("active-item");
          }
          activeItem.nextElementSibling.classList.remove("d-none");
          activeItem.nextElementSibling.classList.add("active-item");
        }

        e.preventDefault();
      });
    }
  }

  showReference();
  function showReference() {
    var referenceButton = document.querySelector(".reference-button");
    if (referenceButton) {
      referenceButton.addEventListener("click", function (e) {
        var boxItems = Array.from(
          document.querySelectorAll(
            ".middle-content > div:first-child, .middle-content .box-item"
          )
        );
        var referenceBox = document.querySelector("#references");
        for (let i = 0; i < boxItems.length; i++) {
          boxItems[i].style.display = "none";
        }
        referenceBox.style.display = "block";
        referenceBox.style.marginTop = "0";
        menuIcon.classList.remove("active");
        body.classList.remove("overflow-hidden");
        leftSidebar.classList.remove("active");

        window.scrollTo(0, 0);
        e.preventDefault();
        if (window.innerWidth < 1200) {
          rightSidebar.style.display = "none";
        }
      });
    }
  }

  window.addEventListener("scroll", function () {
    var leftSidebar = document.querySelector(".left-sidebar");
    var offsetTop = middleContent.getClientRects()[0].y;

    if (leftSidebar && window.innerWidth > 767) {
      if (offsetTop < 140) {
        leftSidebar.classList.add("position-fixed");
        middleContent.classList.add("new-style");
      } else {
        leftSidebar.classList.remove("position-fixed");
        middleContent.classList.remove("new-style");
      }
    }
  });
});

function getUrlParametreValeur(cle) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const valeur = urlParams.get(cle);
  console.log(valeur);
  return valeur;
}


