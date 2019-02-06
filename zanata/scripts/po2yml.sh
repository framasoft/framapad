#!/bin/bash
for i in zanata/po/*.po
do
  j=$(echo $i | cut -d '.' -f 1 | cut -d '/' -f 3)
  po2yaml -i $i --progress none -t zanata/backup/en.yml -o zanata/yml/$j.yml
done
cp zanata/yml/*.yml app/locales/
