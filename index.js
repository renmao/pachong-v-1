var self = require('sdk/self');
var buttons = require('sdk/ui/button/action'); 
var tabs = require("sdk/tabs");
var tabs1 = require("sdk/tabs");
var fileIO = require("sdk/io/file");

、、hello
var path = '';
console.log('Hello Firefox -_-');
var system = require("sdk/system");
// operating system
var platform = system.platform;
console.log("platform = " , platform);
if(platform == 'linux'){
	console.log('this is debian!');
	path = '/home/renmao/pachong/data/';
}else{
	console.log('this is windows!');
	var path = 'D:\\data\\';
}
//var path = '/home/renmao/my-addon/data/data.txt';
//var path = '/home/renmao/pachong/data/';
//tabs.open('about.config');
var config = {
	good_list:false,
	good_info:false,
	total_page:0,
	current_page:1
}

var button = buttons.ActionButton({
	id: "mozilla-link",label: "jingdong",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	 },
	onClick: handleClick   //点击事件
});

function handleClick(state) {
	console.log(state); 
	getGoodList();
}



var tag = "p";
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "http://www.jd.com*",
//  include: "http://tieba.baidu.com/p/*",
  contentScriptFile: [self.data.url('jquery.js'), self.data.url("start.js")],
  onAttach: function(worker) {
  //  worker.port.emit("start", tag);
    console.log('hello');
    worker.port.on("start_flag", function(elementContent) {
      console.log('start serching ...');
      getGoodList();
    });
  }
});

var search_url = "http://list.jd.com/list.html?cat=1319,1523,7052&page=";


function getGoodList(){
	var page = 1;
	var total_page = 0;
	tabs.open(search_url + page);
	tabs.on('ready',function(tab){
		var url_list = '';
		worker = tabs.activeTab.attach({
		contentScriptFile:[self.data.url('getGoodList.js'),self.data.url('jquery.js')]
		});
		worker.port.emit("getLists", 1, page, total_page);
		worker.port.on("getList", function(list,  total_page_, title) {
			total_page = total_page_;///total_page;
			//console.log('list page:', config.current_page);
			for(var i= 0 ; i < list.length; i ++){
				//console.log('list',list[i]);
				url_list += list[i] + ' ';
			}
			var name = path + title + '商品列表' + page + '.txt';
		   	 var TextWriter = fileIO.open(name, "w");
        	   	 if (!TextWriter.closed) {
        	   	     TextWriter.write(url_list);
        	   	     TextWriter.close();
        	   	 }
			 console.log('write', name);
			console.log('list.length', list.length);
			console.log('page', page);
			console.log('tatal', total_page);
			page ++;
		if(list.length> 0 && page <= total_page){
			console.log('open a new tab!ipage:', page);
			tabs.open(search_url + page);

		}
		if(page > total_page ){
			page ++;
			console.log('pagepagepagepage', page);
			readFile(2,title);
		}
		});
	});
}


function readFile(page_, title){
	var good_list = new Array();
	for(var i = 1; i <= page_; i ++){
		var text = '';
		var name = path + title + '商品列表' + i + '.txt';
		var TextWriter = fileIO.open(name, "r");
	        if (!TextWriter.closed) {
			text = TextWriter.read();
	         	TextWriter.close();
	        }
		var temp_list = text.split(' ');
		good_list = good_list.concat(temp_list);
	}
//	for(var i = 0; i < good_list.length; i ++){
//		console.log(i, ':', good_list[i]);
//	}
//	console.log('aaaaaaaaaaaaaaaaaaaaa');
	getProductAttrs(good_list, title);
}
function getProductAttrs(good_list, title){
        var temp_attr = ''; 
        var opened_page = 0;
	var length = 60;//the page number of every txt to write
	var list_len = good_list.length;//the total number to open
        tabs1.open(good_list[opened_page++]);
        tabs1.on('ready',function(tab){
                worker = tabs1.activeTab.attach({
                contentScriptFile:[self.data.url('getAttr.js'),self.data.url('jquery.js')]
                }); 
                worker.port.emit("getAttrs", 1); 
                worker.port.on("getAttr", function(attr) {
					//if(!attr){
                        temp_attr += attr + '\n\n';
                        console.log('attr',attr);
                        if(opened_page < list_len){ 
                        //if(opened_page < good_list.length){
                                tabs1.open(good_list[opened_page++]);
                        }   
						//if(opened_page == good_list.length){
						if(((opened_page -1) % length) == 0 ){           
							var name = path + title + '商品信息' + ((opened_page -1) / length) + '.txt';
							var TextWriter = fileIO.open(name, "w");
							if (!TextWriter.closed) {
								TextWriter.write(temp_attr);
								TextWriter.close();
							}
							temp_attr = ''; 

						}
						if(((opened_page -1) % length) != 0 && opened_page == list_len){
							var name = path + 'page' + (parseInt((opened_page -1) / length) + 1) + '.txt';
							var TextWriter = fileIO.open(name, "w");
							if (!TextWriter.closed) {
								TextWriter.write(temp_attr);
								TextWriter.close();
							}

						}   
					//} 
				}); 
        }); 
}      			
