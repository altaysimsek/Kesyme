const animateCSS = (element, animation, prefix = "animate__") =>
// We create a Promise and return it
	new Promise((resolve, reject) => {
		const animationName = `${prefix}${animation}`;
		const node = document.querySelector(element);

		node.classList.add(`${prefix}animated`, animationName);

		// When the animation ends, we clean the classes and resolve the Promise
		function handleAnimationEnd() {
			node.classList.remove(`${prefix}animated`, animationName);
			node.removeEventListener("animationend", handleAnimationEnd);

			resolve("Animation ended");
		}

		node.addEventListener("animationend", handleAnimationEnd);
	});

$("#linked").hide();

async function postData(url = "", data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}
new ClipboardJS(".clipboard");
$("#linked").hide();

$("#conbiBtn").click(async function () {
  
	if($("#conbiLink").val().trim() == "" || validate({website:`${$("#conbiLink").val()}` }, {website: {url: true}}) != undefined){
		$("#alerWarn").show();
		animateCSS("#alerWarn","fadeIn").then((message) => {
			animateCSS("#alerWarn","fadeOut").then((message) => {
				setTimeout;
				$("#alerWarn").hide();
			});
        
		});
    
	}else{
		const { short } = await postData("/short", {
			url: $("#conbiLink").val(),
		});
		animateCSS("#shorterBox","fadeOut").then((message) => {
			$("#shorterBox").hide();
			$("#owdLink").attr("href",window.location.href + short);
			$("#ownLink").text(window.location.href + short);
			$("#linked").show();
  
			animateCSS("#linked","fadeIn").then((message) => {
        
        
			});
		});
	}
  
  
});

$("#getBack").click(async function () {
	animateCSS("#linked","fadeOut").then((message) => {
		$("#linked").hide();
		$("#conbiLink").val("");
		$("#shorterBox").show();

		animateCSS("#shorterBox","fadeIn").then((message) => {
      
      
		});
	});
});
