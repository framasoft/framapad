#!/bin/bash
cp app/locales/*.yml zanata/yml/
yaml2po -P --progress=none -i zanata/yml/en.yml -o zanata/po/${PWD##*/}.pot
for i in app/locales/*.yml
do
  j=$(echo $i | cut -d '.' -f 1   | cut -d '/' -f 3)
  yaml2po --progress=none -t zanata/yml/$j.yml -i zanata/yml/$j.yml -o zanata/po/$j.po

  # Rename empty (almost) .po
  tail -n +2 zanata/po/$j.po > zanata/po/tmp.1
  tail -n +2 zanata/po/${PWD##*/}.pot > zanata/po/tmp.2
  if((`stat -c%s "zanata/po/tmp.1"` <= `stat -c%s "zanata/po/tmp.2"`));then
    mv zanata/po/$j.po zanata/po/$j.err
  fi
  rm zanata/po/tmp.1 zanata/po/tmp.2
done
