#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# @File: config.py
# @Brief：excel导出json
# @Date: 2016-12-23
#
# @pyexcel_xls: http://pythonhosted.org/pyexcel-xls/#read-from-an-xls-file
#

import os
import json
import sys  
from pyexcel_xls import get_data
reload(sys)  
sys.setdefaultencoding('utf8') 

# 配置本地excel表路径
origin_path = "../table"

# 输出json配置表
file_config = "./config.json"

config = {}

count = 0

def get_config(path):
    global count
    for dir_path, dir_names, file_names in os.walk(path):
        for file in file_names:

            if (0 == file.find(".")):
                continue

            count = count + 1
            print ">> " + file
            data = get_data(dir_path + "/" + file)

            for k in data:
                if len(data[k]):
                    tab = data[k][1]
                    n = -1
                    cell = {}

                    for index in data[k]:
                        n = n + 1
                        if n < 2:
                            continue
                        cell[index[0]] = {}
                        m = 0
                        for i in index:
                            cell[index[0]][tab[m]] = i
                            m = m + 1
                    config[file.rstrip(".xlsx")] = cell

def main():
    get_config(origin_path)
    content = json.dumps(config, ensure_ascii = False, indent = 4)
    file = open(file_config,"w")  
    file.write(content)  
    file.close()  
    print "count: " + str(count) + "\nDone!"

if __name__ == "__main__":
    main()
