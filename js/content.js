////////////////////////////////////////////////////////////////////////////////
// This script inherently only loads after a website has finished loading, much like $(document).ready(){} from jQuery.
// This script can affect the DOM however variables etc are in their own cloud, we cannot call them directly from a page's console.
// This we need to setup a loop that will check the values once we've "messaged" them from "background.js" (in turn, after getting them from our API).

console.log( "content.js running..." );
// on page load it'll set all the prank 'features' off.
let slaveCSSObject = {};

// setup a message listener, which will recognise and accept a message from "background.js" script.
chrome.runtime.onMessage.addListener( function( objectFromBackground ) {
	slaveCSSObject = objectFromBackground;
	// console.log( objectFromBackground );
	console.log( slaveCSSObject );
} );

// set off a recursive self call function chain on page load, after 1000ms.
let recursionKickoff = setTimeout( checkVariablesAndPrank, 5000 );

// if the updated values received from "background.js" affect the slaveCSSObject and "turn on" the prank.
// Then this function will affect the users' DOM.
function checkVariablesAndPrank() {
	console.log( "prnkstr applying now..." );

	if ( slaveCSSObject.custom_header ) {
		$( 'h1' ).html( `${ slaveCSSObject.custom_header_text }` );
	}

	if ( slaveCSSObject.place_cage ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0; i < images.length; i += 1 ) {
			let image = images[ i ];
			if ( image.height !== 0 && image.width !== 0 && image.src.substring( 8, 21 ) !== "placecage.com" ) {
				// console.log( 'already placed cage' );
				image.src = 'https://placecage.com/c/' + image.width + '/' + image.height;
			}
		};
	};

	if ( slaveCSSObject.fill_murray ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0; i < images.length; i += 1 ) {
			let image = images[ i ];
			if ( image.height !== 0 && image.width !== 0 && image.src.substring( 8, 22 ) !== "fillmurray.com" ) {
				// console.log( "already filled Murray..." );
				image.src = 'https://fillmurray.com/' + image.width + '/' + image.height;
			}
		}
	}

	if ( slaveCSSObject.snap ) {
		$( 'body' ).removeAttr( 'style' ).html( '<img src="https://image.ibb.co/byWcEv/rtaImage.jpg">' ).css( 'text-align', 'center' ).css( 'margin', '125px' ).css( 'background-color', 'rgb(250, 250, 250)' );
	}

	if ( slaveCSSObject.paragraph_background !== "" ) {
		let para = document.getElementsByTagName( 'p' );
		for ( let i = 0, l = para.length; i < l; i += 1 ) {
			para[ i ].style.backgroundColor = slaveCSSObject.paragraph_background;
		}
	}

	if ( slaveCSSObject.paragraph_color !== "") {
		let para = document.getElementsByTagName( 'p' );
		for ( let i = 0, l = para.length; i < l; i += 1 ) {
			para[ i ].style.color = slaveCSSObject.paragraph_background;
		}
	}

	setTimeout( checkVariablesAndPrank, 5000 );

	// cancel initial timeout, allowing the recursive call to be forever calling itself.
	clearTimeout( recursionKickoff );
};
