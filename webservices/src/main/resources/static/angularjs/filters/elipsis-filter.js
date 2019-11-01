/*
 * Elipsis after given length of string
 */

app.filter("elipsis", function() {
	return function(text, length) {
		if (text!=null && text.length>0 && length!=null && !isNaN(length)){
			if (text.length>=length){
				var modifiedText= text.substring(0, length);
				modifiedText= modifiedText.trim();
				modifiedText+= "...";
				return modifiedText;
			}else{
				return text;
			}
		}else{
			return text;
		}
		
	}
});
