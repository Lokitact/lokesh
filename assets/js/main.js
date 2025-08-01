/**  * header scrolled */
if (document.querySelector("header"), document.querySelector(".hero")) {
  const header = document.querySelector("header");
  const sectionOne = document.querySelector(".hero");
  const sectionOneOptions = { rootMargin: "-200px 0px 0px 8px" };
  const sectionOneObserver = new IntersectionObserver((entries, sectionOneObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          header.classList.add("header-scrolled");
        } else {
          header.classList.remove("header-scrolled");
        }
      });
    },
    sectionOneOptions);
  sectionOneObserver.observe(sectionOne);
}
// header scrolled end

/**  * Tooltips */
document.querySelectorAll('.social-media-icon')
  .forEach(tooltip => {
    new bootstrap.Tooltip(tooltip, {
      selector: '[data-loki-toggle="tooltip"]'
    })
  });
//  tooltip end

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();
//  validation end

(() => {
  "use strict";
  /**  * Easy selector helper function  */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**  * Easy event listener function   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /** * Easy on scroll event listener   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /** * Navbar links active state on scroll  */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /** * Scrolls to an element with header offset */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /*  * Back to top button  */
  let backtotop = select('.bottom-container')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /*  * Mobile nav toggle  */
  on('click', '.mobile-nav-toggle', (e) => {
    select('body').classList.toggle('mobile-nav-active')
  })

  /** * Scrool with ofset on links with a class name .scrollto  */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
      }
      scrollto(this.hash)
    }
  }, true)

  /**  * Scroll with ofset on page load with hash links in the url  */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /*  * Hero type effect  */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /*  * Skills animation  */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: (direction) => {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /*  * Animation on scroll  */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})();