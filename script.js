// Hamburger toggle
document.getElementById('btnToggleMobileNav').addEventListener('click', function () {
	document.getElementById('primary').classList.toggle('isVisible');	
});

// Content Navigation
(function(navContainerId, targetArea, tagName){
  'use strict';
  
	var topPadding = parseInt(window.getComputedStyle(document.getElementById(targetArea), null).getPropertyValue('padding-top')),
      headings = Array.prototype.slice.call(document.getElementById(targetArea).getElementsByTagName(tagName)),
		  navItems = [],
			nav = document.createElement('div'),
      navContainer = document.getElementById(navContainerId);
  
  function documentHeight(){
    return Math.max(
      document.body.offsetHeight, 
      document.body.scrollHeight, 
      document.documentElement.offsetHeight, 
      document.documentElement.scrollHeight
    );
  }
  
  function getScrollTop(){
    return document.documentElement.scrollTop || document.body.scrollTop;
  }
  
  function setNav() {
    var currentSection = 0,
        scrollTop = getScrollTop();			
    
    function removeActive(el){
      el.classList.remove('active');
    }
    
    function setCurrentSection(el,i){
      if (scrollTop > (el.offsetTop - (window.innerHeight / 1.5))) {
        currentSection = i;
      }
    }
    
    navItems.forEach(removeActive);
    headings.forEach(setCurrentSection);
    navItems[currentSection].classList.add('active');
  }
  
  function animateScroll(el, lastFrame) {			
    var scrollTop = getScrollTop(),
        targetLocation = el.offsetTop - topPadding,				
        doAnimate = false,
        newLocation = scrollTop,					
        speed = (+new Date() - lastFrame) * 18;

    if(scrollTop >= targetLocation){			
      //we are going up									
      newLocation = Math.max(scrollTop - speed, targetLocation);						
      doAnimate = (scrollTop > targetLocation) && (scrollTop > 0);
    }else{			
      //we are going down			
      newLocation = Math.min(scrollTop + speed, targetLocation);		
      doAnimate = (scrollTop < targetLocation - speed) && (scrollTop < documentHeight() - window.innerHeight);			
    }

    window.scrollTo(0, newLocation);

    if(doAnimate){				
      lastFrame = +new Date();
      window.requestAnimationFrame(function(){animateScroll(el, lastFrame);});
    }
  }
  
  function scrollToSection(e) {   
    var target = e.target.href.split('#').pop();
    e.preventDefault();				
    animateScroll(document.getElementById(target), +new Date());		
  }
  
  function buildLinks(el){
    var a = document.createElement('a');
    a.innerHTML = el.id;
    a.href = "#" + el.id;
    navItems.push(a);
    nav.appendChild(a);
  }			
			
  headings.forEach(buildLinks);  
  nav.id = 'page-nav';  
  nav.addEventListener('click', scrollToSection);
  navContainer.appendChild(nav);	  
  window.addEventListener('scroll', setNav);

}('heading', 'content', 'h2'));