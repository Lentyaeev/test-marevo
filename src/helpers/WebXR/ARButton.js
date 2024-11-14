/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 */

var ARButton = {

	createButton: function ( renderer, sessionInit = {} ) {

		function showStartAR( /*device*/ ) {

			var currentSession = null;

			function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				/*
				session.updateWorldTrackingState( {
					'planeDetectionState': { 'enabled': true }
				} );
				*/

				renderer.xr.setReferenceSpaceType( 'local' );
				renderer.xr.setSession( session );

				currentSession = session;

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				currentSession = null;

			}

			//

			button.style.cursor = 'pointer';

			
			button.onclick = function () {

				if ( currentSession === null ) {

					navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton(element) {
			element.style.display = 'none';
		}

		function showARNotSupported(button) {
			disableButton(button);
		}

		function stylizeElement( element ) {
			
			element.id = 'ARbutton';
			element.style.position = 'fixed';
			element.style.bottom = '30px';
			element.style.right = '30px';
			element.style.height = '50px'
			element.style.width = '50px';
			element.style.borderRadius = '50%';
			element.style.border = 'none';
			element.style.background = '#fff';
			element.style.color = '#000';
			element.style.outline = 'none';
			element.style.zIndex = '999999999';
			element.style.display = 'flex';
			element.style.justifyContent = 'center';
			element.style.alignItems = 'center';
			element.style.boxShadow = 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px';
			element.innerHTML = `
			<svg version="1.1" id="view_x5F_in_x5F_AR_x5F_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
			<rect id="Bounding_Box" x="0" y="0" fill="none" width="24" height="24"></rect>
			<g id="Art_layer">
				<path d="M3,4c0-0.55,0.45-1,1-1h2V1H4C2.35,1,1,2.35,1,4v2h2V4z"></path>
				<path d="M20,3c0.55,0,1,0.45,1,1v2h2V4c0-1.65-1.35-3-3-3h-2v2H20z"></path>
				<path d="M4,21c-0.55,0-1-0.45-1-1v-2H1v2c0,1.65,1.35,3,3,3h2v-2H4z"></path>
				<path d="M20,21c0.55,0,1-0.45,1-1v-2h2v2c0,1.65-1.35,3-3,3h-2v-2H20z"></path>
				<g>
					<path d="M18.25,7.6l-5.5-3.18c-0.46-0.27-1.04-0.27-1.5,0L5.75,7.6C5.29,7.87,5,8.36,5,8.9v6.35c0,0.54,0.29,1.03,0.75,1.3
						l5.5,3.18c0.46,0.27,1.04,0.27,1.5,0l5.5-3.18c0.46-0.27,0.75-0.76,0.75-1.3V8.9C19,8.36,18.71,7.87,18.25,7.6z M7,14.96v-4.62
						l4,2.32v4.61L7,14.96z M12,10.93L8,8.61l4-2.31l4,2.31L12,10.93z M13,17.27v-4.61l4-2.32v4.62L13,17.27z"></path>
				</g>
			</g>
			</svg>`;

		}

		if ( 'xr' in navigator ) {

			var button = document.createElement( 'button' );
			button.style.display = 'none';

			stylizeElement( button );

			navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

				supported ? showStartAR() : showARNotSupported(button);

			} ).catch( showARNotSupported );

			return button;

		} else {

			var message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.textDecoration = 'none';

			stylizeElement( message );

			return message;

		}

	},

};

export { ARButton };
