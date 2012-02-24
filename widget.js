(function() {
    // append global div and set as widget
	document.write( '<div class="x-widget"></div>' );
	var widgets = document.getElementsByTagName( 'div' );
	var widget = widgets[ widgets.length - 1 ];
	
    // check if eraser.css is already set
	var links = document.getElementsByTagName( 'link' );
	var is_eraser_css = false;
	var eraser_css_href = 'eraser.css';
	for ( i=0; i<links.length; i++ ) {
		if ( links[ i ].href == eraser_css_href ) {
			is_eraser_css = true;
			break;
		}
	}
	if ( ! is_eraser_css ) {
		var link = document.createElement( 'link' );
		link.setAttribute( 'type', 'text/css' );
		link.setAttribute( 'rel', 'stylesheet' );
		link.setAttribute( 'href', eraser_css_href );
		document.head.appendChild( link );
	}
	
    // <a> element with the Diaspora*'s img button
	var target = document.createElement( 'a' );
	target.setAttribute( 'style', 'display:block' );
	target.setAttribute( 'title', 'Share this at Diaspora*' );

	var img = document.createElement( 'img' );
	img.setAttribute( 'src', 'https://github.com/Simounet/Diaspora-Share-Button/raw/jqueryless/images/diaspora-share-button.png' );
	img.setAttribute( 'alt', 'Share this at Diaspora*' );
    img.onmouseover=function(){
        this.setAttribute( 'style', 'cursor: pointer !important' );
    }

    img.onmouseout=function(){
        this.setAttribute( 'style', 'cursor: default !important' );
    }
	target.appendChild( img );
	widget.appendChild( target );

    // widget container
    var container = document.createElement( 'div' );
    container.setAttribute( 'style', 'display:none !important;' );
    widget.appendChild( container )

    // form
	var form = document.createElement( 'form' );
	form.setAttribute( 'method', 'get' );
    form.setAttribute( 'style', 'background-color: #FFFFFF !important;color: #000000 !important;display: block;height: 500px !important;left: 50% !important;margin: -250px auto 0 -250px !important;position: absolute !important;top: 50% !important;width: 500px !important;' );
	form.setAttribute( 'name', 'widgetform' );
	container.appendChild( form );

    // handle onclick on the img to show input text
	target.onclick = function() {
        container.setAttribute('style', 'z-index:999 !important;width:100% !important;height:100% !important;display:block !important;position:absolute !important;top:0 !important;left:0 !important;background: rgb(0, 0, 0) !important;background: rgba(0, 0, 0, 0.6) !important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";');

        // label with input and submit button
		var labels = form.getElementsByTagName('label');
		if ( labels.length == 0 ) {
			var label = document.createElement( 'label' );
			label.setAttribute( 'for', 'podname' );
			label.setAttribute( 'class', 'popin' );
			label.innerHTML = 'Pod Name: http://';
			form.appendChild( label );
			var podname = document.createElement( 'input' );
			podname.setAttribute( 'type', 'text' );
			podname.setAttribute( 'name', 'podname' );
			label.appendChild( podname );
			podname.select();
			podname.onkeyup = function() {
				var buttons = form.getElementsByTagName('button');
				if ( podname.textLength !=0 && buttons.length == 0 ) {
					var button = document.createElement( 'button' );
					button.setAttribute( 'type', 'submit' );
					button.setAttribute( 'name', 'submit' );
					button.innerHTML = 'Submit';
					label.appendChild( button );
				} else if ( podname.textLength == 0 ) {
					buttons[0].parentNode.removeChild( buttons[0] );
				}
			}
		} else {
			labels[0].parentNode.removeChild( labels[0] );
		}
	}

    // handle form validation and iframe
	form.onsubmit = function() {
		var iframes = form.getElementsByTagName('iframe');
		if ( iframes.length != 0 ) {
			iframes[0].parentNode.removeChild( iframes[0] );
		}
		var label = form.getElementsByTagName('label');
		var podurl = "https://" + label[0].childNodes[1].value + "/bookmarklet?url=" + encodeURIComponent(window.location.href) + "&amp;title=" + encodeURIComponent(document.title) + "&amp;notes=" + encodeURIComponent('' + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text)) + "&amp;v=1&amp;";
		// TODO: check if url/bookmarklet and url/.well-known/host-meta exist
		var iframe = document.createElement( 'iframe' );
		iframe.setAttribute( 'name', 'iframe' );
		iframe.setAttribute( 'src', podurl );
        iframe.setAttribute('style', 'width: 700px !important;height: 490px !important;border: 0;');
		form.appendChild( iframe );
		return false;
	}
	
}) ();
