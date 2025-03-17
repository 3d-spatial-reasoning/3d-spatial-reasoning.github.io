// Select all d-article elements
var dArticles = document.querySelectorAll('d-article');

// Assuming the second d-article is the target
if (dArticles.length > 1) {
    var dContents = dArticles[0].querySelector('d-contents');

    // Continue with your existing logic
    var computedStyle = window.getComputedStyle(dContents);
    var marginTop = parseInt(computedStyle.marginTop, 10);
    var originalOffsetTop = dContents.offsetTop;
    var originalOffsetLeft = dContents.offsetLeft;
    var originalWidth = dContents.offsetWidth;

    function onResize() {
        originalOffsetLeft = dContents.offsetLeft;
        originalWidth = dContents.offsetWidth;
    }

    window.addEventListener('resize', onResize);

    window.addEventListener('scroll', function() {
        if (window.innerWidth > 600) {
            var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            var dArticleBottom = dArticles[0].offsetTop + dArticles[0].offsetHeight;
            var dContentsHeight = dContents.offsetHeight;

            if (scrollPosition + marginTop + dContentsHeight <= dArticleBottom) {
                dContents.style.position = 'fixed';
                dContents.style.top = Math.max(marginTop, scrollPosition + marginTop - originalOffsetTop) + 'px';
            } else {
                dContents.style.position = 'absolute';
                dContents.style.top = (dArticleBottom - dContentsHeight - originalOffsetTop) + 'px';
            }

            dContents.style.left = originalOffsetLeft + 'px';
            dContents.style.width = originalWidth + 'px';
        } else {
            dContents.style.position = 'static';
            dContents.style.width = '';
        }
    });
}



// Function to determine which section is in view
function getActiveSection() {
    var sections = document.querySelectorAll('section'); // Assuming your sections have a 'section' tag
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollPosition && sections[i].offsetTop + sections[i].offsetHeight > scrollPosition) {
            return sections[i].id;
        }
    }
    return null;
}

// Function to update the navigation items
function updateNavigation() {
    var activeSection = getActiveSection();
    var navLinks = document.querySelectorAll('d-contents nav a');

    navLinks.forEach(function(navLink) {
        if (navLink.getAttribute('href') === '#' + activeSection) {
            navLink.classList.add('active-nav-item');
        } else {
            navLink.classList.remove('active-nav-item');
        }
    });
}

// Add the scroll event listener
window.addEventListener('scroll', updateNavigation);

// Initialize width and position
onResize();
// Initial update
updateNavigation();