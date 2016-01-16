self.port.on('getAttrs', function(title){
		var temp = '商品：\n';
		var g = 'g';
		console.log('getAttr.js is running!');
//		var info = document.querySelector('#itemInfo');
//		console.log('info0000000000', info);
//		var name = $(info.querySelector('#name').querySelector('h1')).text();

		var name = $(document.querySelector('h1')).text();
		if(!name){
			closeWindow(temp);
			//return;
		}		
		
//		console.log('name', name);
		temp = temp + name + '********';

//		var describ = $(info.querySelector('#p-ad')).text();

//		var service_ = info.querySelector('#summary-service');
//		var service = $(service_.querySelector('.dt')).text() + $(service_.querySelector('.dd')).text();

		var choose = document.querySelector('#choose');
		if(!choose){
			closeWindow(temp);
			//return;
		}
		var item = '\n';
		dt = choose.querySelector('.dt');
		if(!dt){
			closeWindow(temp);
			//return;
		}
		item = dt.textContent;
		var choose_item = choose.querySelectorAll('.item');
		if(!choose_item){
			closeWindow(temp);
			//return;
		}
		for(var i = 0; i < (choose_item.length - 1); i ++){
			item = item + $(choose_item[i]).text() + '*';
		}

//		console.log('iteem', item);
		temp = temp + item + '********';
//		var tips = info.querySelector('#summary-tips');
//		tip = $(tips.querySelector('.dt')).text() + $(tips.querySelector('.dd')).text();	

//		var extInfo = document.querySelector('#extInfo');
//		var jd_service_ = extInfo.querySelector('.jd-service');
//		var service = $(jd_service_.querySelectorAll('a')[0]).text();
		
//		var service = extInfo.querySelector('.jd-service').textContent;
//		var services = jd_service_.querySelectorAll('a');
//		for(var i = 0; i < services.length; i ++){
//			service = service + $(services[i]).attr('title') + '*';
//		}
		var parameter = document.querySelector('.p-parameter');
		if(!parameter){
			closeWindow(temp);
			//return;
		}
		var introduces = parameter.querySelectorAll('li');
		if(!introduces){
			closeWindow(temp);
			//return;
		}
		var introduce = '\n商品介绍';
		for(var i = 0; i < introduces.length; i ++){
			introduce = introduce + $(introduces[i]).text() + ';';
		}		
		temp = temp + introduce + '***********';		
		
		var table = document.querySelector('.Ptable');
		if(!table){
			closeWindow(temp);
			//return;
		}
		var tds = table.querySelectorAll('td');
		if(!tds){
			closeWindow(temp);
			//return;
		}
		var td = '\n规格参数:	';
		for(var i = 0; i < tds.length; i += 2){
			td = td + tds[i].textContent + ':' + tds[i + 1].textContent + '	';
		}
		temp = temp + td + '******';
		
		var list = document.querySelector('.item-detail');
		if(!list){
			closeWindow();
			//return;
		}		
		var list = '\n清单:' + list.textContent;
		temp = temp + list + '';
		
		//self.port.emit('getAttr', temp);
		closeWindow(temp);
});

function closeWindow(temp){
		;
		self.port.emit('getAttr', Trim(temp, 'g'));
		window.open('','_parent','');
		window.opener = window;
		window.close();
}

function Trim(str,is_global){
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g,"");
	if(is_global.toLowerCase()=="g")
	result = result.replace(/\s/g,"");
	return result;
} 
