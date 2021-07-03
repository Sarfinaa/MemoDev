import $ from 'jquery';
const tip4 = new TextTip({
					scope: '.code-edit-container',
					iconFormat: 'url',
					buttons: [
						{title: 'Favourite', icon: 'icon.svg', callback: (a)=>{console.log(a);
							var selection = window.getSelection();
var text = selection.toString();
var parent = $(selection.focusNode.parentElement);
var oldHtml = parent.html();
var newHtml = oldHtml.replace(text, "<span style='background:red'>"+text+"</span>");
parent.html( newHtml );
						}}
					],
					on: {
						show: () => console.log('show'),
						hide: () => console.log('hide'),
						
					}
				});
			