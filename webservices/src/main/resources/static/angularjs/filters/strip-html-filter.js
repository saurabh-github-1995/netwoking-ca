/*
 * Extract text from HTML String stripping html tags
 */

app.filter("stripeHtml", function() {
	return function(htmlString) {
		var span = document.createElement('span');
		span.innerHTML = htmlString;
		return span.textContent || span.innerText;
	}
});
