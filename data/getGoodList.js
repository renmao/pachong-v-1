self.port.on("getLists", function(config, page, total_page, title) {
	var get_list = 1;

//	console.log('getlist config',config );
//	console.log('getlist page',page );
//	console.log('getlist total_page',total_page );
//var total_page = 0;
//if(config.good_list == false && document.querySelector('.fp-text')){
if(config == get_list && document.querySelector('.fp-text')){
	console.log('getGoodLists.js is running!');
	if(total_page == 0){
	//	config.total_page =parseInt($(document.querySelector('.fp-text').querySelector('i')).text());
		total_page = 2;
	}
	if(!title){
		var temp = document.title;
		title = temp.split(' ')[0];
	}
	
	if(page > total_page){
		console.log(page, '>', total_page,'so return');
		return;
	}
	//var title = document.title;

	var div_list = new Array();
	div_list = document.querySelector('#plist').querySelectorAll('div.p-name');
	if(!div_list){
		return;
	}
	//console.log(div_list.length)
	var href_list = new Array();


	for(var i = 0; i < div_list.length; i ++){		
		 href_list.push(div_list[i].querySelector('a').href);
	}

	//console.log('herf0',herf[0]);
	//config.page_info = false;
	self.port.emit('getList',href_list, total_page, title);
	console.log('messgae has sent!');
	window.open('','_parent','');
	window.opener = window;
	window.close();

}
});

