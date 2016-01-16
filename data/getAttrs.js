self.port.on('getAttrs', function(config){
		var temp = '';
		var g = 'g';
		console.log('getAttr.js is running!');
		temp += ('1:' + Trim( $(document.querySelector('h1')).text(), g) + '\n');
		temp += ('2:' + Trim( $(document.querySelector('#store-prompt')).text(), g) + '\n');
		temp += ('3:' + Trim( $(document.querySelector('#summary-service')).text(), g) + '\n');
		temp += ('4:' + Trim( $(document.querySelector('.tips-list')).text(), g) + '\n');
		temp += ('5:' + Trim( $(document.querySelector('.name')).text(), g) + '\n');
		temp += ('6:' + Trim( $(document.querySelector('.jd-service')).text(), g) + '\n');
		temp += ('7:' + Trim( $(document.querySelector('.p-parameter-list')).text(), g) + '\n');
		temp += ('8:' + Trim( $(document.querySelector('.formwork_bt_rb')).text(), g) + '\n');
		temp += ('9:' + Trim( $(document.querySelector('.formwork_text')).text(), g) + '\n');
		temp += ('10:' + Trim( $(document.querySelector('.item-detail')).text(), g) + '\n');
		var dl_list = new Array();
		dl_list = document.querySelectorAll('dl');
		for(var i = 0; i < dl_list.length; i ++){
			temp += Trim($(dl_list[i]).text(), g);
		}
	
	//	temp += Trim( $(document.querySelectorAll('dl')[8]).text(), g);
		temp += ( '\n' + '11:' + Trim( $(document.querySelector('#state')).text(), g) + '\n');
		temp += '***********************************';
			
		self.port.emit('getAttr', temp);
		window.open('','_parent','');
		window.opener = window;
		window.close();
});

function Trim(str,is_global){
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g,"");
	if(is_global.toLowerCase()=="g")
	result = result.replace(/\s/g,"");
	return result;
} 
