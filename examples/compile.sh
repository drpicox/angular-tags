#!/bin/bash

function compileMd {
	local state="" # "html"|"javascript"|"skip"
	IFS=''

	rm -f .tmp.ntag >& /dev/null
	while read line; do
		case $state in
			html)
				echo "$line"
				echo "$line" >> .tmp.ntag
				;;
			javascript)
				angular-tags .tmp.ntag -m "ntagExample"
				echo "\`\`\`"
				state="skip"
				;;
			skip)
				;;
			*)
				echo "$line"
				;;
		esac

		if [[ $line == \`\`\`* ]]; then
			state="${line:3}"
			if [[ $state == html ]]; then
				rm -f .tmp.ntag >& /dev/null
			fi
		fi
	done
	rm -f .tmp.ntag >& /dev/null
}

echo "Example index"  > index.md
echo "=============" >> index.md
echo ""              >> index.md

for file in *.md; do
	if [[ $file != index.md ]]; then
		echo "- [$file]($file)" >> index.md
		echo "$(compileMd < $file)" > $file
	fi
done

echo ""              >> index.md
echo ""              >> index.md
echo "Note: examples can be generated with examples/compile.sh" >> index.md



