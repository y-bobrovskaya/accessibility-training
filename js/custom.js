(function() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

const navEls = document.querySelectorAll("#nav .tab");

navEls.forEach(function(navEl, index) {
  navEl.onclick = () => {
    toggleTab(navEl.id, navEl.dataset.target);
  };

  navEl.addEventListener("keydown", (e) => {
    const firstTab = navEls[0];
    const lastTab = navEls[navEls.length - 1];

    switch(e.code) {
      case 'ArrowRight': {
        const nextTab = navEls[index+1];

        if (nextTab) {
          nextTab.focus();
        } else {
          firstTab.focus();
        }

        break;
      }
      case 'ArrowLeft': {
        const prevTab = navEls[index-1];

        if (prevTab) {
          prevTab.focus();
        } else {
          lastTab.focus();
        }

        break;
      }
      case 'Home': {
        e.preventDefault();
        firstTab.focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        lastTab.focus();
        break;
      }
      case 'Enter':
      case 'Space': {
        navEl.click();

        break;
      }
    }
  });
});

function toggleTab(selectedNav, targetId) {
  navEls.forEach(function(navEl) {
    if (navEl.id === selectedNav) {
      navEl.classList.add("is-active");
      navEl.removeAttribute('tabindex');
      navEl.setAttribute('aria-selected', true);
    } else {
      navEl.setAttribute('tabindex', -1);

      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute('aria-selected', false);
      }
    }
  });

  switchTabPanel(targetId);
}

function switchTabPanel(targetId) {
  const tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id === targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}


/* Menu */

const menuBtn = document.querySelector('#menuButton');
const popupMenu = document.querySelector('.popup-menu');

const toggleMenu = (isAriaExpanded) => {
  menuBtn.setAttribute('aria-expanded', !isAriaExpanded);
  popupMenu.classList.toggle('popup-menu--is-open');
};

document.addEventListener('click', () => {
  const isAriaExpanded = menuBtn.getAttribute('aria-expanded') === 'true';

  if (isAriaExpanded) {
    toggleMenu(isAriaExpanded);
  }
});

menuBtn.addEventListener('click', (e) => {
  const isAriaExpanded = menuBtn.getAttribute('aria-expanded') === 'true';

  e.stopPropagation();
  toggleMenu(isAriaExpanded);
});


const menuEls = document.querySelectorAll(".popup-menu .popup-menu-item");

menuEls.forEach((menuItem, index) => {
  menuItem.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      menuBtn.click();
      menuBtn.focus();
    }

    if (e.code === 'Tab' && index === menuEls.length - 1) {
      menuBtn.click();
    }
  })
});