#!/bin/bash
#------------------------------
# @File: res.sh
# @Brief: res
# 
# @Author: Pury
# @Version: 0.0.1
# @Date: 2016-12-02
#
# Copyright (c) pury.org.
# All rights reserved.
#------------------------------

spaces="    "
resources=""
content=""
cd resource
groups=$(cat default.res.groups.json)

function read_dir(){
	for file in `ls $1`
		do
		if [ -d $1"/"$file ]
		then
				read_dir $1"/"$file
		else
			file_name="${file%.*}"
			full_name=$1"/"$file
			extension="${file##*.}"

			case $extension in
				"json") 
					file_type="json"
				;;
				"png" | "jpg")
					file_type="image"
				;;
				"xml")
					file_type="xml"
				;;
				"mp3")
					file_type="sound"
			esac

resources="$resources{\n"\
"$spaces\"url\": \"$full_name\",\n"\
"$spaces\"type\": \"$file_type\",\n"\
"$spaces\"name\": \"$file_name"_"$extension\"\n"\
"},"
		fi
	done
}

read_dir assets
read_dir res
resources=${resources%?}
content="{\n$groups,\n\"resources\":[\n$resources]\n}"
echo -e "$content" > "default.res.json"
echo Done!

