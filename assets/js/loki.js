(() => {
  "use strict";
  const [date, month, year] = new Date().toLocaleDateString("en-In").split("/");
  const hours = new Date().getHours();

  /**  * author  */
  let wish = (hours >= 0 && hours < 12) ? 'Morning' : (hours >= 12 && hours < 16) ? 'Afternoon' : 'Evening';
  console.log('Hi Good ' + wish + '\u000AWelcome to our website by \u000AAuthor \u0026 Designer\u003A Lokesh');

  /**  * Custom theme */
  class MyTheme extends HTMLElement {
    connectedCallback() {
      let themeUl = `<ul class="dropdown-menu dropdown-menu-end shadow bg-body-tertiary" aria-labelledby="bd-theme-text">
          <li>
            <h6 class="dropdown-header">Background Theme</h6>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" data-loki-theme-value="light" aria-pressed="false">
              <i class="bi bi-sun-fill me-2"></i>Light</button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" data-loki-theme-value="dark" aria-pressed="false">
              <i class="bi bi-moon-stars-fill me-2"></i>Dark</button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center active" data-loki-theme-value="auto" aria-pressed="true">
              <i class="bi bi-circle-half me-2"></i>Auto </button>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <h6 class="dropdown-header"> Theme Color</h6>
          </li>
          <li class="theme-color d-flex flex-wrap gap-3 justify-content-center align-items-center p-2 pt-0">
            <div class="success active" data-loki-theme-color-value="success" aria-pressed="true"></div>
            <div class="primary" data-loki-theme-color-value="primary" aria-pressed="false"></div>
            <div class="info" data-loki-theme-color-value="info" aria-pressed="false"></div>
            <div class="danger" data-loki-theme-color-value="danger" aria-pressed="false"></div>
            <div class="warning" data-loki-theme-color-value="warning" aria-pressed="false"></div>
          </li>
        </ul>`;
      if (document.getElementsByTagName('loki-theme')[0].getAttribute('data-theme-li')) {
        this.innerHTML = `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="bd-theme" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
              <i class="bi bi-palette-fill"></i><span id="theme-hint"></span>
            </a>
            ${themeUl}
          </li>`;
      }
      else {
        this.innerHTML = `<div class="dropdown">
            <button class="btn btn-loki py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
            <i class="bi bi-palette-fill" id="theme-icon-active"></i><span id="theme-hint"></span>
            </button>
            ${themeUl}
          </div>`;
      }
    }
  }

  customElements.define('loki-theme', MyTheme);
  // custom theme end

  if (document.getElementsByTagName('loki-theme')[0]) {
    if (document.getElementsByTagName('loki-theme')[0].getAttribute('data-theme-hint'))
      document.getElementById("theme-hint").innerHTML = document.getElementsByTagName('loki-theme')[0].getAttribute('data-theme-hint');

    document.documentElement.setAttribute("data-loki-theme-color", localStorage.getItem("data-loki-theme-color"));
    document.documentElement.setAttribute("data-loki-theme", localStorage.getItem("theme"));
    document.documentElement.setAttribute("data-bs-theme", localStorage.getItem("theme"));
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
      if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-loki-theme', 'dark')
        document.documentElement.setAttribute('data-bs-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-loki-theme', theme)
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = (theme, focus = false) => {

      const activeThemeIcon = document.querySelector('#bd-theme i')

      const btnToActive = document.querySelector(`[data-loki-theme-value="${theme}"]`)
      const iconOfActiveBtn = btnToActive.querySelector('i').getAttribute('class')

      document.querySelectorAll('[data-loki-theme-value]').forEach(element => {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
      })

      btnToActive.classList.add('active')
      btnToActive.setAttribute('aria-pressed', 'true')
      if (!document.getElementsByTagName('loki-theme')[0].getAttribute('data-theme-li'))
        activeThemeIcon.setAttribute('class', iconOfActiveBtn)
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme()
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })

    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme())

      document.querySelectorAll('[data-loki-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-loki-theme-value')
            setStoredTheme(theme)
            setTheme(theme)
            showActiveTheme(theme, true)
          })
        })
    })

    /**  * theme color  */
    window.addEventListener('DOMContentLoaded', () => {
      const currentThemecolor = localStorage.getItem("data-loki-theme-color");
      const setActiveThemeColor = (currentThemecolor, focus = false) => {
        document.querySelectorAll('[data-loki-theme-color-value]').forEach(element => {
          element.classList.remove('active')
          element.setAttribute('aria-pressed', 'false')
        })

        const themeColorActive = document.querySelector(`[data-loki-theme-color-value="${currentThemecolor}"]`)
        themeColorActive.classList.add('active')
        themeColorActive.setAttribute('aria-pressed', 'true')
      }
      let themesName = [];
      for (var value of document.querySelectorAll('[data-loki-theme-color-value]')) {
        themesName.push(value.getAttribute('data-loki-theme-color-value'))
      }
      let themeClassName = ['alert', 'btn', 'btn-outline'];
      const themeLoki = (setThemeColor, focus = false) => {
        for (var tclassName of themeClassName) {
          document.querySelectorAll(`.${tclassName}-loki`).forEach(alertLoki => {
            themesName.forEach((themesName) => {
              if (alertLoki.classList.contains(`${tclassName}-${themesName}`))
                alertLoki.classList.remove(`${tclassName}-${themesName}`);
            });
            alertLoki.classList.add(`${tclassName}-${setThemeColor}`);
          })
        }
      }
      document.querySelectorAll('[data-loki-theme-color-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const currentThemecolor = toggle.getAttribute('data-loki-theme-color-value');
            document.documentElement.setAttribute("data-loki-theme-color", currentThemecolor);
            localStorage.setItem("data-loki-theme-color", currentThemecolor);
            setActiveThemeColor(currentThemecolor, true);
            themeLoki(currentThemecolor, true);

          })
        })
      if (localStorage.getItem("data-loki-theme-color") !== null) {
        setActiveThemeColor(currentThemecolor, true);
        themeLoki(currentThemecolor, true);
      } else {
        themeLoki('success', true);
      }
    })
  }

  //  theme end

  /**  * age counted  */
  class MyAge extends HTMLElement {
    connectedCallback() {
      this.innerHTML = ((month <= 5 || (month == 6 & date < 27)) ? year - '1998' : year - '1997') + ' years';
    }
  }
  customElements.define('loki-age', MyAge);
  //  age end

  /**  * Custom waves */
  let wavesCode = `<svg class="w-100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
       <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" />
          <use xlink:href="#gentle-wave" x="48" y="3" />
          <use xlink:href="#gentle-wave" x="48" y="5" />
          <use xlink:href="#gentle-wave" x="48" y="7" />
        </g>
    </svg>`;
  class MyWaves extends HTMLElement {
    connectedCallback() {
      this.innerHTML = wavesCode;
      this.style.fill = 'var(--loki-theme-color)';
    }
  }
  customElements.define('loki-waves', MyWaves);

  // custom waves end

  /**  * Custom footer */
  class MyFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<footer class="mt-5 text-center">${wavesCode}
      <div class="bg-body-secondary pb-3">
      <div class="copyright">\u00A9 Copyright <strong>lokesh</strong>\u002C All Rights Reserved</div>
      <div class="credits">Designed by <a href="#"><strong>Lokesh</strong></a></div>
      </div>
      </footer>`;
      this.style.fontFamily = "cursive";
      this.style.fill = 'var(--bs-secondary-bg)';
    }
  }
  customElements.define('loki-footer', MyFooter);
  // custom footer end
})();

let contentPlace = 0;
/**  * count text for visible  */
function counts() {
  if (document.getElementsByClassName("inside-content")[contentPlace].value === "") {
    document.getElementsByClassName("inside-btn")[contentPlace].style.display = 'none';
  } else {
    document.getElementsByClassName("inside-btn")[contentPlace].style.display = 'flex';
  }
}

/**  * copy to clipboard  */
function copyDataURI() {
  let copyContent = document.getElementsByClassName("copy-content")[contentPlace];
  if (copyContent.value) {
    navigator.clipboard.writeText(copyContent.value);
    //copyContent.select();
    //document.execCommand('copy');
    if (document.getElementsByClassName("copy-hint")[contentPlace])
      notifyBox(copyContent, "COPIED");
  }
}

function elementPosition(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
}

function notifyBox(el, msg) {
  var CONTENT = document.getElementsByClassName("copy-hint")[contentPlace];
  var nBOX = document.createElement('div');
  CONTENT.insertBefore(nBOX, CONTENT.firstChild);
  nBOX.classList.add("notifyBox");
  var msgToShow = document.createTextNode(msg);
  nBOX.appendChild(msgToShow);
  var elPosition = elementPosition(el);

  setTimeout(() => nBOX.classList.add("fadeOut"), 2500);
  setTimeout(() => CONTENT.removeChild(nBOX), 9500);
}