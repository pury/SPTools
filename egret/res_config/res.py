#!/usr/bin/env python
import os
import json

os.chdir("resource")

def main():
    res = json.load(open('default.res.json', 'r'))
    resources = {}
    resourcesList = []
    getRes("assets",resourcesList)
    getRes("config", resourcesList)
    resources["resources"] = resourcesList
    res.update(resources)
    json.dump(res, open("default.res.json","w"), False, True, True, True, None, 4)

def getRes(dir,resourcesList):
    for dirpath,dirnames,filenames in os.walk(dir):
        for file in filenames:

            if (0 == file.find(".")):
                continue

            resource = {}
            fileType = getType(file)
            resource["url"] = dirpath.replace("\\","/") +"/"+ file
            resource["type"] = fileType
            resource["name"] = file.replace(".","_")
           
            if (fileType == "sheet"):
                resource["subkeys"] = getSubkeys(dirpath + "/" + file)

            resourcesList.append(resource)

def getType(file):
    if (-1 != file.find("sheet") and -1 != file.find("json")):
        return "sheet"
    if( -1 != file.find("json")):
        return "json"
    if (-1 != file.find("png") or -1 != file.find("jpg")):
        return "image"
    if (-1 != file.find("xml")):
        return "xml"
    if (-1 != file.find("mp3")):
        return "sound"

def getSubkeys(file):
    sheet = json.load(open(file,"r"))
    subkeys = "";

    for key in sheet["frames"]:
       subkeys += key + "," 
    
    subkeys = subkeys.rstrip(",")
    return subkeys 

if __name__ == '__main__':
    main()
