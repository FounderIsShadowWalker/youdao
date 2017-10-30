# youdao
本来是想写一个有道词典的，结果突然写成了qq空间。


##选择技术栈

Antd mongodb koa2 dva sass

后期通讯 (websocket or  socket.io)


##目录结构
+ public

	这里放静态文件 是node 的静态文件
	
+ src
	+ assets
		
		打包文件
	
	+ components
		
		项目中的组建(包括高阶组件 所有的高阶组件都放在HOCComponent 下)
			
	+ models				 
	  
	  模型层(属于redux中的action 和 reducer 的合集)
	
	+ routes
	
		路由层，相当于放置了各个路由的首页
		
	+ services 
		
		服务层，放置对后台所有的请求
		
	+ utils
	
		工具层，放置一些通用方法
	
	+ server
	  
	  + controller
	  		
	  		后台路由层
	  	
	  + img
	  
	  		放置上传的图片
	  		
	  + model
	  		
	  		mongo的Model 所有对数据库的操作挂载在Model的静态方法下
	  + utils
	  		node 层复用方法，比如解析上传buffer 获取数据库实例
	  	

## 项目启动

   git clone git@github.com:FounderIsShadowWalker/youdao.git
    
   npm start
    
   cd src/server
    
   node index.js							

##说点啥吧

目前项目还没写完，距离一个成熟的成品更是相去甚远，做这个初衷的是提升自己的react的工程实践能力，希望大家能一起加入😊😊，我是喜欢编程的顺顺。


