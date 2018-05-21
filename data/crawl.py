#-*- coding:utf-8 -*-
import requests
import re
import os, sys
import json
reload(sys)
sys.setdefaultencoding("utf-8")

f = open("res.js", "w")
f.write("var localData = ")
lists = []
for i in range(1000,2000):
    try:
        url = "http://bbs.goupu.com.cn/thread-"+ str(i) +"-1-1.html"
        c = requests.get(url)
        content = c.text
        txt = re.findall("<title>(.*?)</title>",content)[0].split("_")[0]
        print(txt)
        image = re.findall("src=\"(.*?)\" border=",content)[1]
        print(image)
	dict = {}
	dict["title"] = txt
	dict["thumbnail_pic_s"] =  image
	dict["url"] = url
       	lists.append(dict)
	#os.system("curl -o "+ str(i) + ".jpg " + image)
    except:
    	print "no"
res =  json.dumps(lists, ensure_ascii=False, indent=4)	
f.write(res)
f.write("\n")
f.write("module.exports = {postList:localData}")
f.close()
