
class URLKit {

    /** 获取参数 */
    getUrlParam(sUrl,sKey){
        var result = {};
        sUrl.replace(/\??(\w+)=(\w+)&?/g,function(a,k,v){
            if(result[k] !== void 0){
                var t = result[k];
                result[k] = [].concat(t,v);
            }else{
                result[k] = v;
            }
        });
    
        if(sKey === void 0){
            return result;
        }else{
            return result[sKey] || '';
        }
    }
    
    /** 解析 URL */
    parse(url){
        const reg = /^(?:([A-Za-z]+):)?(?:\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        // 协议             //         域名              端口         路径             参数          hash

        return url.match(reg)
    }

    /* 删除 URL 参数 */
    delUrl(name){
        var queryStr=window.location.href;
        if(queryStr.indexOf(name)>-1){
          var regExp=new RegExp('&*'+name+'=\\w+&*','g');
          return queryStr.replace(regExp,'')
        }
    }

    /* 删除 URL 参数 方法二 */

    delUrl2(name){
        loca = window.location;
        var baseUrl=loca.origin + loca.pathname + "?";
        var query = loca.search.substring(1);
        if (query.indexOf(name)>-1) {
            var obj = {}
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                var temp = [];
                temp = arr[i].split("=");
                obj[temp[0]] = temp[1];
            };
            delete obj[name];
            console.log(JSON.stringify(obj));
            var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
            return url;
        };
    }

}
