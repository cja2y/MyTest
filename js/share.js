	    /**
		 * 更新分享服务
		 */
		function updateSerivces() {
			plus.share.getServices(function(s) {
				shares = {};
				for (var i in s) {
					var t = s[i];
					shares[t.id] = t;
				}
			}, function(e) {});
		}
	    /**
		 * 分享操作
		 */
		function shareAction(id, ex,imgUrl,shareBt,shareContent,shareUrl) {
			var s = null;
			if (!id || !(s = shares[id])) {
				outLine("无效的分享服务！");
				return;
			}
			if (s.authenticated) {
				shareMessage(s, ex, imgUrl,shareBt,shareContent,shareUrl);
			} else {
				s.authorize(function() {
					shareMessage(s, ex ,imgUrl,shareBt,shareContent,shareUrl);
				}, function(e) {
					outLine("认证授权失败");
				});
			}
		}
		/**
		 * 发送分享消息
		 */
		function shareMessage(s, ex, imgUrl,shareBt,shareContent,shareUrl) {  
			var msg = {
				content: '分享-详情',  
				href: shareUrl,
				/*href: 'http://blog.csdn.net/zhuming3834',*/
				title: shareBt,
				content: shareContent,
				/*thumbs: ['http://img3.3lian.com/2013/v10/4/87.jpg'],*/
				thumbs: [imgUrl],
				//pictures: [],
				/*pictures: ['http://img3.3lian.com/2013/v10/4/87.jpg'],*/
				extra: {
					scene: ex  
				}
			};
			s.send(msg, function() {
				outLine("分享成功!");
			}, function(e) {
				outLine("分享失败!");
			});
		}
		// 界面退出提示
		function outLine(msg) {
			mui.toast(msg);
		}