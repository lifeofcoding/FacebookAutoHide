var theKeywordToSearchFor = 'pokemon', init = false,
	gotToHideThemAll, delayedScan;

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

gotToHideThemAll = function() {
	console.log('Hiding posts with', theKeywordToSearchFor);
    
    let content, keyword = new RegExp(theKeywordToSearchFor, 'i'), foundCount = 0;
    document.querySelectorAll('[role="article"]').forEach((el, idx) => {
        content = el.querySelector('.userContent');

        if (content) {
          content = content.innerHTML;
          content = content.replace(/<[^>]*>/g, "").toLowerCase();
        }

        if (content && keyword.test(content)) {
        	++foundCount;
            el.style.display = 'none';
        }
    });
    
    var resultMessage;
    
    if (foundCount) {
    	resultMessage = `Success! Hidden a total of ${foundCount} with keyword(s): ${theKeywordToSearchFor}`;
    } else {
    	resultMessage = `Nice.. no posts found for ${theKeywordToSearchFor}`;
    }
    
    console.log(resultMessage);
    
    if (!init) {
    	alert(resultMessage);
        init = true;
        
        document.addEventListener('scroll', delayedScan);
    }
};

delayedScan = debounce(gotToHideThemAll, 250);

(function() {
    var keywordToHide = prompt("Please enter a word or phrase you'd like to hide posts from:", "Pokemon");
    
    if (keywordToHide) {
    	theKeywordToSearchFor = keywordToHide;
        gotToHideThemAll();
    }
})();
